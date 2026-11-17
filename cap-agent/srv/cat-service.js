import cds from '@sap/cds'

const EMBED_URL = 'http://localhost:11434/api/embed'
const EMBED_MODEL = 'nomic-embed-text'

// Turn text into a vector (a list of numbers that captures its meaning)
async function embed(text) {
  const res = await fetch(EMBED_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: EMBED_MODEL, input: text })
  })
  const data = await res.json()
  return data.embeddings[0]
}

// Compare two vectors: close to 1 = similar meaning, close to 0 = unrelated
function similarity(a, b) {
  let dot = 0, lenA = 0, lenB = 0
  for (let i = 0; i < a.length; i++) {
    dot  += a[i] * b[i]
    lenA += a[i] * a[i]
    lenB += b[i] * b[i]
  }
  return dot / (Math.sqrt(lenA) * Math.sqrt(lenB))
}

export default class CatalogService extends cds.ApplicationService {
  init() {
    const { Books, BookSummaries } = this.entities
    const index = []   // our tiny "vector database" in memory

    // 1. INDEXING: embed every summary once
    async function buildIndex() {
      const summaries = await SELECT.from(BookSummaries)
      for (const s of summaries) {
        const book = await SELECT.one.from(Books).where({ ID: s.ID })
        const vector = await embed('search_document: ' + s.summary)
        index.push({ ID: s.ID, title: book.title, summary: s.summary, vector })
      }
      console.log(`[rag] indexed ${index.length} summaries`)
    }

    // 2. SEARCHING: embed the question, return the 3 most similar books
    this.on('searchBooks', async (req) => {
      if (index.length === 0) await buildIndex()

      const question = await embed('search_query: ' + req.data.text)

      const results = index.map(b => ({
        ID: b.ID,
        title: b.title,
        summary: b.summary,
        score: similarity(question, b.vector)
      }))

      results.sort((x, y) => y.score - x.score)
      return results.slice(0, 3)
    })

    return super.init()
  }
}

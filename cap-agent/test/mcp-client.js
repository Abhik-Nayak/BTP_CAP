// Run: node test/mcp-client.js
const MCP_URL = 'http://localhost:4004/mcp/catalog'


// Send one MCP request (JSON-RPC, like A2A)
async function mcp(method, params) {
  const res = await fetch(MCP_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json, text/event-stream'
    },
    body: JSON.stringify({ jsonrpc: '2.0', id: 1, method, params })
  })
  const text = await res.text()                     // "event: message\ndata: {...}"
  const json = JSON.parse(text.split('data: ')[1])  // take the JSON after "data: "
  return json.result
}

// 1. Which tools does this server offer?
const list = await mcp('tools/list')
console.log('Tools:', list.tools.map(t => t.name))

// 2. Call the RAG tool directly (no LLM!)
const search = await mcp('tools/call', {
  name: 'searchBooks',
  arguments: { text: 'a book about a whale' }
})
console.log('\nsearchBooks:\n' + search.content[0].text)

// 3. Call the query tool with CQL
const query = await mcp('tools/call', {
  name: 'query',
  arguments: { cql: "SELECT title, stock FROM Books WHERE author = 'George Orwell'" }
})
console.log('\nquery:\n' + query.content[0].text)
import cds from '@sap/cds'

export default class CatalogService extends cds.ApplicationService {
  init() {
    const { Books } = this.entities

    this.on('orderBook', async (req) => {
      const { bookId, quantity } = req.data

      // 1. Read the book
      const b = await SELECT.one.from(Books).where({ ID: bookId })
      if (!b) return req.error(404, `Book ${bookId} not found`)

      // 2. Check stock
      if (quantity > b.stock) return req.error(409, `Only ${b.stock} left of ${b.title}`)

      // 3. Reduce stock
      const newStock = b.stock - quantity
      await UPDATE(Books).set({ stock: newStock }).where({ ID: bookId })

      return `Ordered ${quantity} x ${b.title}. Stock left: ${newStock}`
    })

    return super.init()
  }
}

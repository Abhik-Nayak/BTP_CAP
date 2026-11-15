/**
 * Bookshop assistant.
 * When the user asks for data, ALWAYS call the query tool and show the actual rows.
 * Never answer with only the field names.
 * To order a book: first query Books to find its ID, then call orderBook with bookId and quantity.
 */
@agent
@odata
service CatalogService {
  entity Books {
    key ID     : Integer;
        title  : String;
        author : String;
        stock  : Integer;
  }

   /** Order a book. Reduces the stock. */
  @agent.hitl
  action orderBook(
    /** ID of the book */
    bookId   : Integer,
    /** Number of copies */
    quantity : Integer
  ) returns String;
}

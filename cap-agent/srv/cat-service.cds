/**
 * Bookshop assistant for questions about books.
 * When the user asks for data, ALWAYS call the query tool and show the actual rows.
 * Never answer with only the field names.
 */
@agent
@odata
service CatalogService {
  @readonly
  entity Books {
    key ID     : Integer;
        title  : String;
        author : String;
        stock  : Integer;
  }
}

/**
 * Bookshop assistant for questions about books.
 * When the user asks for data, ALWAYS call the query tool and show the actual rows.
 * Never answer with only the field names.
 * When the user describes a story, topic or theme, call the searchBooks tool.
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

  @readonly
  entity BookSummaries {
    key ID      : Integer;
        summary : String;
  }

  type SearchResult {
    ID      : Integer;
    title   : String;
    summary : String;
    score   : Double;
  }
/** Find books by meaning, e.g. "a book about a vampire". */
  function searchBooks(
    /** What the user is looking for */
    text : String
  ) returns array of SearchResult;
}

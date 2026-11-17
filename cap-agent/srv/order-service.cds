using { CatalogService } from './cat-service';

/**
 * Order assistant.
 * To order a book: first query Books to find its ID, then call orderBook with bookId and quantity.
 */
@agent
@agent.llm: 'llm-smart'
@odata
service OrderService {
  @readonly
  entity Books as projection on CatalogService.Books;

  /** Order a book. Reduces the stock. */
  @agent.hitl
  action orderBook(
    /** ID of the book */
    bookId   : Integer,
    /** Number of copies */
    quantity : Integer
  ) returns String;
}
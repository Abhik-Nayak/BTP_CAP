using { CatalogService } from './cat-service';

/**
 * Order assistant.
 * To order a book: first query Books to find its ID, then call orderBook with bookId and quantity.
  * If the user describes the book by topic or story instead of title, ask the CatalogService agent which book it is.
 */
@agent
@agent.llm: 'llm-smart'
@agent.connect: ['CatalogService']
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
import type { Book } from "./book";

export interface LendingRecord {
  id: string;
  book_id?: string;
  borrower: string;
  borrow_date: string;
  return_date: string | null;
  book: Book;
}

"use client";

import { useEffect, useState } from "react";
import { Book } from "@/types/book";

interface BasicTableOneProps {
  onEdit: (book: Book) => void;
  onLend: (bookId: string) => void;
  onDelete: (bookId: string) => void;
  refresh?: boolean;
}

export default function BasicTableOne({
  onEdit,
  onLend,
  onDelete,
  refresh,
}: BasicTableOneProps) {
  const [books, setBooks] = useState<Book[]>([]);

  const fetchBooks = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/v1/book");
      const result = await res.json();
      if (result.status && result.data) {
        setBooks(result.data);
      } else {
        console.error("Failed to load books", result.error);
      }
    } catch (error) {
      console.error("Fetch error", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [refresh]);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
              Book
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
              Quantity
            </th>
            <th className="px-6 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 text-right">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {books.map((book) => (
            <tr key={book.id} className="bg-white dark:bg-gray-900">
              {/* Book details in one cell */}
              <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                <div className="font-semibold">{book.title}</div>
                <div className="text-gray-600 dark:text-gray-400 text-sm">
                  {book.author}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-500">
                  ISBN: {book.isbn}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-500">
                  Category: {book.category}
                </div>
              </td>

              {/* Quantity */}
              <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                {book.quantity}
              </td>

              {/* Actions */}
              <td className="px-6 py-4 text-right space-x-2">
                <button
                  onClick={() => onEdit(book)}
                  className="px-3 py-1 text-sm bg-yellow-500 text-white rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => onLend(book.id)}
                  className="px-3 py-1 text-sm bg-blue-600 text-white rounded"
                >
                  Lend
                </button>
                <button
                  onClick={() => onDelete(book.id)}
                  className="px-3 py-1 text-sm bg-red-600 text-white rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import { Book } from "@/types/book";

interface BasicTableOneProps {
  onEdit: (book: Book) => void;
  onLend: (bookId: string) => void;
  onDelete: (bookId: string) => void;
  refresh: boolean;
}

const BasicTableOne: React.FC<BasicTableOneProps> = ({
  onEdit,
  onLend,
  onDelete,
  refresh,
}) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:8080/api/v1/book");
      const result = await response.json();
      if (result.status && Array.isArray(result.data)) {
        setBooks(result.data);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [refresh]);

  return (
    <div className="overflow-x-auto">
      {loading ? (
        <p className="text-center">Loading books...</p>
      ) : (
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Author</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">ISBN</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Quantity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            {books.map((book) => (
              <tr key={book.id}>
                <td className="px-6 py-4 whitespace-nowrap">{book.title}</td>
                <td className="px-6 py-4 whitespace-nowrap">{book.author}</td>
                <td className="px-6 py-4 whitespace-nowrap">{book.isbn}</td>
                <td className="px-6 py-4 whitespace-nowrap">{book.category}</td>
                <td className="px-6 py-4 whitespace-nowrap">{book.quantity}</td>
                <td className="px-6 py-4 whitespace-nowrap space-x-2">
                  <button
                    onClick={() => onEdit(book)}
                    className="px-3 py-1 text-sm text-white bg-yellow-500 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onLend(book.id)}
                    className="px-3 py-1 text-sm text-white bg-indigo-600 rounded hover:bg-indigo-700"
                  >
                    Lend
                  </button>
                  <button
                    onClick={() => onDelete(book.id)}
                    className="px-3 py-1 text-sm text-white bg-red-600 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {books.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-4 text-gray-500">
                  No books found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BasicTableOne;

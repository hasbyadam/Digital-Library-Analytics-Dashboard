"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  quantity: string;
  category: string;
}

interface Props {
  onEdit: (book: Book) => void;
}

export default function BasicTableOne({ onEdit }: Props) {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/v1/book");
      const json = await res.json();
      const booksArray = Array.isArray(json) ? json : json.data;
      if (!Array.isArray(booksArray)) throw new Error("Invalid response");

      setBooks(booksArray);
    } catch (err) {
      setError("Failed to fetch books err: " + err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm("Are you sure you want to delete this book?");
    if (!confirmed) return;

    try {
      setDeletingId(id);
      const res = await fetch(`http://localhost:8080/api/v1/book/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Delete failed");

      setBooks((prev) => prev.filter((book) => book.id !== id));
    } catch (err) {
      alert("Error deleting book");
      console.error(err);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[500px]">
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell isHeader className="px-5 py-3 text-start text-theme-xs text-gray-500 font-medium dark:text-gray-400">
                  Details
                </TableCell>
                <TableCell isHeader className="px-5 py-3 text-start text-theme-xs text-gray-500 font-medium dark:text-gray-400">
                  Quantity
                </TableCell>
                <TableCell isHeader className="px-5 py-3 text-start text-theme-xs text-gray-500 font-medium dark:text-gray-400">
                  Options
                </TableCell>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {loading ? (
                <TableRow>
                  <td colSpan={3} className="px-5 py-4 text-center">Loading...</td>
                </TableRow>
              ) : error ? (
                <TableRow>
                  <td colSpan={3} className="px-5 py-4 text-center text-red-500">{error}</td>
                </TableRow>
              ) : books.length === 0 ? (
                <TableRow>
                  <td colSpan={3} className="px-5 py-4 text-center text-gray-500">No books found.</td>
                </TableRow>
              ) : (
                books.map((book) => (
                  <TableRow key={book.id}>
                    <TableCell className="px-5 py-4 text-start">
                      <div>
                        <span className="block font-medium text-gray-800 dark:text-white/90">{book.title}</span>
                        <span className="block text-gray-500 text-xs dark:text-gray-400">{book.author}</span>
                        <span className="block text-gray-500 text-xs dark:text-gray-400">{book.category}</span>
                        <span className="block text-gray-500 text-xs dark:text-gray-400">{book.isbn}</span>
                      </div>
                    </TableCell>
                    <TableCell className="px-5 py-4 text-start text-gray-600 dark:text-gray-300">
                      {book.quantity}
                    </TableCell>
                    <TableCell className="px-5 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => onEdit(book)}
                          className="text-blue-600 hover:underline"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(book.id)}
                          className="text-red-600 hover:underline"
                          disabled={deletingId === book.id}
                        >
                          {deletingId === book.id ? "Deleting..." : "Delete"}
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

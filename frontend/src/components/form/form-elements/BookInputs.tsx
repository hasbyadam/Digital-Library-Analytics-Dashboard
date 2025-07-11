"use client";

import React, { useEffect, useState } from "react";
import Label from "../Label";
import Input from "../input/BookInputField";
import Select from "../Select";
import { ChevronDownIcon } from "../../../icons";
import type { Book } from "@/types/book.ts";

interface BookInputsProps {
  isOpen: boolean;
  onClose: () => void;
  book?: Book | null; // Optional for edit
}

export default function BookInputs({ isOpen, onClose, book }: BookInputsProps) {
  const [form, setForm] = useState({
    title: "",
    author: "",
    isbn: "",
    quantity: "",
    category: "",
  });

  const [status, setStatus] = useState<string | null>(null);

  const options = [
    { value: "programming", label: "Programming" },
    { value: "software engineering", label: "Software Engineering" },
    { value: "career", label: "Career" },
  ];

  useEffect(() => {
    if (book) {
      setForm({
        title: book.title,
        author: book.author,
        isbn: book.isbn,
        quantity: book.quantity,
        category: book.category,
      });
    } else {
      setForm({
        title: "",
        author: "",
        isbn: "",
        quantity: "",
        category: "",
      });
    }
  }, [book, isOpen]);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        ...form,
        quantity: parseInt(form.quantity, 10) || 0,
      };

      const url = book
        ? `http://localhost:8080/api/v1/book/${book.id}`
        : `http://localhost:8080/api/v1/book`;

      const method = book ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Failed to submit");

      setStatus(book ? "✅ Book updated!" : "✅ Book added!");
      onClose(); // Close modal on success
    } catch (err) {
      setStatus("❌ Error submitting book.");
      console.error(err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white dark:bg-dark-800 rounded-lg shadow-xl p-6 w-full max-w-md">
        <h2 className="mb-4 text-xl font-semibold">
          {book ? "Update Book" : "Add Book"}
        </h2>
        <div className="space-y-4">
          <div>
            <Label>Title</Label>
            <Input
              type="text"
              value={form.title}
              onChange={(e) => handleChange("title", e.target.value)}
            />
          </div>
          <div>
            <Label>Author</Label>
            <Input
              type="text"
              value={form.author}
              onChange={(e) => handleChange("author", e.target.value)}
            />
          </div>
          <div>
            <Label>ISBN</Label>
            <Input
              type="text"
              value={form.isbn}
              onChange={(e) => handleChange("isbn", e.target.value)}
            />
          </div>
          <div>
            <Label>Quantity</Label>
            <Input
              type="number"
              value={form.quantity}
              onChange={(e) => handleChange("quantity", e.target.value)}
            />
          </div>
          <div>
            <Label>Category</Label>
            <div className="relative">
              <Select
                options={options}
                placeholder="Select a category"
                value={form.category}
                onChange={(value) => handleChange("category", value)}
                className="dark:bg-dark-900"
              />
              <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                <ChevronDownIcon />
              </span>
            </div>
          </div>

          <div className="flex justify-end space-x-2 mt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
            >
              {book ? "Update Book" : "Add Book"}
            </button>
          </div>

          {status && (
            <div className="text-sm text-green-600 dark:text-green-400">
              {status}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

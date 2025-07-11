"use client";

import { useState } from "react";
import { useHeaderVisibility } from "@/context/HeaderVisibilityContext";
import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import BasicTableOne from "@/components/tables/Book";
import BookInputs from "@/components/form/form-elements/BookInputs";

import type { Book } from "@/types/book.ts";

export default function Books() {
  const [showModal, setShowModal] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);

  const { setShowHeader } = useHeaderVisibility();

  const openModal = () => {
    setEditingBook(null); // ensure it's clean when adding a new book
    setShowModal(true);
    setShowHeader(false);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingBook(null); // reset after closing
    setShowHeader(true);
  };

  const handleEdit = (book: Book) => {
    setEditingBook(book);
    setShowModal(true);
    setShowHeader(false);
  };

  return (
    <div>
      <PageBreadcrumb pageTitle="Books" />

      <div className="space-y-6">
        <ComponentCard title="List">
          <button
            onClick={openModal}
            className="mb-4 px-4 py-2 bg-blue-600 text-white rounded"
          >
            + Add Book
          </button>
          <BasicTableOne onEdit={handleEdit} />
        </ComponentCard>
      </div>

      {/* Controlled Modal for Add/Edit */}
      <BookInputs isOpen={showModal} onClose={closeModal} book={editingBook} />
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { useHeaderVisibility } from "@/context/HeaderVisibilityContext";
import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import BasicTableOne from "@/components/tables/Book";
import BookInputs from "@/components/form/form-elements/BookInputs";
import LendBookModal from "@/components/form/form-elements/LendBookModal";

import type { Book } from "@/types/book";
import { useAuth } from "@/hooks/useAuth";
import { authFetch } from "@/lib/authfetch";


export default function Books() {
  const { isAuthenticated, loading: authLoading } = useAuth();

  const [showModal, setShowModal] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [lendingBookId, setLendingBookId] = useState<string | null>(null);
  const [showLendModal, setShowLendModal] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const { setShowHeader } = useHeaderVisibility();

  const openModal = () => {
    setEditingBook(null);
    setShowModal(true);
    setShowHeader(false);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingBook(null);
    setShowHeader(true);
    setRefresh(!refresh);
  };

  const handleEdit = (book: Book) => {
    setEditingBook(book);
    setShowModal(true);
    setShowHeader(false);
  };

  const handleLend = (bookId: string) => {
    setLendingBookId(bookId);
    setShowLendModal(true);
    setShowHeader(false);
  };

  const closeLendModal = () => {
    setLendingBookId(null);
    setShowLendModal(false);
    setShowHeader(true);
  };

  const handleDelete = async (bookId: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this book?");
    if (!confirmDelete) return;

    try {
      const response = await authFetch(`http://localhost:8080/api/v1/book/${bookId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Book deleted successfully");
        setRefresh(!refresh);
      } else {
        alert("Failed to delete book");
      }
    } catch (error) {
      console.error("Error deleting book:", error);
      alert("Error occurred while deleting book");
    }
  };

  if (authLoading) return <div>Loading...</div>;
  if (!isAuthenticated) return null;

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

          <BasicTableOne
            onEdit={handleEdit}
            onLend={handleLend}
            onDelete={handleDelete}
            refresh={refresh}
          />
        </ComponentCard>
      </div>

      <BookInputs isOpen={showModal} onClose={closeModal} book={editingBook} />
      <LendBookModal
        isOpen={showLendModal}
        onClose={closeLendModal}
        bookId={lendingBookId}
      />
    </div>
  );
}

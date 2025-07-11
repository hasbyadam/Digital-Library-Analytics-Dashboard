"use client";

import { useEffect, useState } from "react";
import Label from "../Label";
import Input from "../input/BookInputField";
import { authFetch } from "@/lib/authfetch";

interface LendBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookId: string | null;
}

const LendBookModal: React.FC<LendBookModalProps> = ({ isOpen, onClose, bookId }) => {
  const today = new Date().toISOString().split("T")[0];

  const [borrower, setBorrower] = useState("");
  const [borrowDate, setBorrowDate] = useState(today);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setBorrower("");
      setBorrowDate("");
    }
  }, [isOpen]);

  const handleSubmit = async () => {
    if (!bookId || !borrower || !borrowDate) return;

    setLoading(true);
    try {
      await authFetch(`http://localhost:8080/api/v1/lending-record/${bookId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          borrower,
          borrow_date: new Date(borrowDate).toISOString(),
        }),
      });

      // Optionally refetch lending data here
      onClose();
    } catch (error) {
      console.error("Failed to submit lending record:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-dark-800 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          Lend Book
        </h2>

        <div className="space-y-4">
          <div>
            <Label htmlFor="borrower">Borrower</Label>
            <Input
              id="borrower"
              value={borrower}
              onChange={(e) => setBorrower(e.target.value)}
              placeholder="Enter borrower name"
            />
          </div>

          <div>
            <Label htmlFor="borrow_date">Borrow Date</Label>
            <Input
              type="date"
              id="borrow_date"
              value={borrowDate}
              onChange={(e) => setBorrowDate(e.target.value)}
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Lend"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LendBookModal;

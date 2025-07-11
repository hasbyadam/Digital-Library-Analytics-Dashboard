"use client";

import { useState } from "react";
import { Trash2, Undo2 } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

import { LendingRecord } from "@/types/lending";
import { useHeaderVisibility } from "@/context/HeaderVisibilityContext";
import { authFetch } from "@/lib/authfetch";

interface LendingTableProps {
  records: LendingRecord[];
  loading: boolean;
  error: string | null;
  refresh: () => void;
}

export default function LendingTable({
  records,
  loading,
  error,
  refresh,
}: LendingTableProps) {
  const [returningId, setReturningId] = useState<string | null>(null);
  const [returnDate, setReturnDate] = useState<string>("");
  const { setShowHeader } = useHeaderVisibility();

  const openReturnModal = (id: string) => {
    setReturningId(id);
    setReturnDate("");
    setShowHeader(false);
  };

  const closeReturnModal = () => {
    setReturningId(null);
    setShowHeader(true);
  };

  const handleReturn = async () => {
    if (!returningId || !returnDate) return;

    try {
      const res = await authFetch(`http://localhost:8080/api/v1/lending-record/${returningId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ return_date: new Date(returnDate).toISOString() }),
      });

      if (!res.ok) throw new Error("Failed to return book");

      toast.success("Book marked as returned");
      refresh();
      closeReturnModal();
    } catch (err) {
      toast.error("Error returning book " + err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await authFetch(`http://localhost:8080/api/v1/lending-record/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete record");

      toast.success("Lending record deleted");
      refresh();
    } catch (err) {
      toast.error("Error deleting record " + err);
    }
  };

  if (loading) return <p>Loading lending records...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (records.length === 0) return <p>No lending records found.</p>;

  return (
    <div className="relative overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
              Book
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
              Borrower & Dates
            </th>
            <th className="px-6 py-3 text-right text-sm font-medium text-gray-700 dark:text-gray-300">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {records.map((record) => (
            <tr key={record.id}>
              <td className="px-6 py-4 whitespace-pre-line">
                <div className="text-sm font-medium text-gray-900 dark:text-white">
                  {record.book.title}
                </div>
                <div className="text-sm text-gray-500">{record.book.author}</div>
                <div className="text-sm text-gray-500">{record.book.isbn}</div>
                <div className="text-sm text-gray-500 italic">{record.book.category}</div>
              </td>
              <td className="px-6 py-4 whitespace-pre-line text-sm text-gray-700 dark:text-gray-300">
                <p><strong>Borrower:</strong> {record.borrower}</p>
                <p><strong>Borrowed:</strong> {format(new Date(record.borrow_date), "PPP")}</p>
                <p>
                  <strong>Returned:</strong>{" "}
                  {record.return_date
                    ? format(new Date(record.return_date), "PPP")
                    : <span className="text-yellow-500">Not yet returned</span>}
                </p>
              </td>
              <td className="px-6 py-4 text-right space-x-2">
                {!record.return_date && (
                  <button
                    onClick={() => openReturnModal(record.id)}
                    className="inline-flex items-center rounded bg-green-500 px-3 py-1 text-white hover:bg-green-600 text-sm"
                  >
                    <Undo2 className="h-4 w-4 mr-1" />
                    Return
                  </button>
                )}
                <button
                  onClick={() => handleDelete(record.id)}
                  className="inline-flex items-center rounded bg-red-600 px-3 py-1 text-white hover:bg-red-700 text-sm"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Return Modal */}
      {returningId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full space-y-4">
            <h2 className="text-lg font-semibold">Return Book</h2>
            <label className="text-sm text-gray-700 dark:text-gray-300 block">
              Return Date
              <input
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                className="mt-1 w-full rounded border px-3 py-2 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </label>
            <div className="flex justify-end space-x-2">
              <button
                onClick={closeReturnModal}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleReturn}
                className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white text-sm"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

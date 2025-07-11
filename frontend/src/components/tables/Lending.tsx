"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import type { LendingRecord } from "@/types/lending";

interface Props {
  records: LendingRecord[];
  loading: boolean;
  error: string | null;
}

export default function LendingTable({ records, loading, error }: Props) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[700px]">
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell isHeader className="px-5 py-3 text-start text-theme-xs text-gray-500 font-medium dark:text-gray-400">
                  Borrower
                </TableCell>
                <TableCell isHeader className="px-5 py-3 text-start text-theme-xs text-gray-500 font-medium dark:text-gray-400">
                  Book
                </TableCell>
                <TableCell isHeader className="px-5 py-3 text-start text-theme-xs text-gray-500 font-medium dark:text-gray-400">
                  Borrow Date
                </TableCell>
                <TableCell isHeader className="px-5 py-3 text-start text-theme-xs text-gray-500 font-medium dark:text-gray-400">
                  Return Date
                </TableCell>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {loading ? (
                <TableRow>
                  <td colSpan={4} className="px-5 py-4 text-center">Loading...</td>
                </TableRow>
              ) : error ? (
                <TableRow>
                  <td colSpan={4} className="px-5 py-4 text-center text-red-500">{error}</td>
                </TableRow>
              ) : records.length === 0 ? (
                <TableRow>
                  <td colSpan={4} className="px-5 py-4 text-center text-gray-500">No lending records found.</td>
                </TableRow>
              ) : (
                records.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell className="px-5 py-4 text-start text-gray-700 dark:text-white">
                      {record.borrower}
                    </TableCell>
                    <TableCell className="px-5 py-4 text-start text-gray-700 dark:text-white">
                      <div>
                        <div className="font-medium">{record.book?.title}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{record.book?.author}</div>
                      </div>
                    </TableCell>
                    <TableCell className="px-5 py-4 text-start text-gray-700 dark:text-white">
                      {new Date(record.borrow_date).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="px-5 py-4 text-start text-gray-700 dark:text-white">
                      {record.return_date
                        ? new Date(record.return_date).toLocaleDateString()
                        : <span className="text-red-500">Not Returned</span>}
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

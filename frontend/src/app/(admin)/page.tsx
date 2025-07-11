"use client";

import type { Metadata } from "next";
import React from "react";
import LendingTrend from "@/components/visualization/lendingTrend";
import MostBorrowedBook from "@/components/visualization/MostBorrowedBook";
import BooksByCategory from "@/components/visualization/BooksByCategory";
import { useAuth } from "@/hooks/useAuth";

// export const metadata: Metadata = {
//   title: "Digital Library Analytics Dashboard",
//   description: "Admin Dashboard",
// };

export default function Statistics() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!isAuthenticated) return null;

  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12">
        <LendingTrend />
      </div>
      <div className="col-span-12">
        <MostBorrowedBook />
      </div>
      <div className="col-span-12">
        <BooksByCategory />
      </div>
    </div>
  );
}

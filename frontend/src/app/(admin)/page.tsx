import type { Metadata } from "next";
import React from "react";
import LendingTrend from "@/components/visualization/lendingTrend";
import MostBorrowedBook from "@/components/visualization/MostBorrowedBook";
import BooksByCategory from "@/components/visualization/BooksByCategory";

export const metadata: Metadata = {
  title:
    "Digital Library Analytics Dashboard",
  description: "Admin Dashoard",
};

export default function Statistics() {
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

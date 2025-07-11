import type { Metadata } from "next";
import React from "react";
import StatisticsChart from "@/components/visualization/lendingTrend";

export const metadata: Metadata = {
  title:
    "Digital Library Analytics Dashboard",
  description: "Admin Dashoard",
};

export default function Statistics() {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12">
        <StatisticsChart />
      </div>
    </div>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

// Dynamically load ApexChart (disable SSR)
const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function MostBorrowedBooksChart() {
  const [titles, setTitles] = useState<string[]>([]);
  const [counts, setCounts] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMostBorrowedBooks();
  }, []);

  const fetchMostBorrowedBooks = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/v1/statistic/most-borrowed-book");
      const json = await res.json();

      if (json.status && json.data) {
        setTitles(json.data.titles);
        setCounts(json.data.borrow_counts);
      }
    } catch (error) {
      console.error("Failed to fetch most borrowed books:", error);
    } finally {
      setLoading(false);
    }
  };

  const options: ApexOptions = {
    chart: {
      type: "bar",
      height: 350,
      toolbar: { show: false },
      fontFamily: "Outfit, sans-serif",
    },
    plotOptions: {
      bar: {
        horizontal: true,
        borderRadius: 6,
        barHeight: "50%",
      },
    },
    dataLabels: { enabled: false },
    xaxis: {
      categories: titles,
      labels: {
        style: {
          fontSize: "12px",
          colors: "#6B7280",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          fontSize: "12px",
          colors: "#6B7280",
        },
      },
    },
    tooltip: { enabled: true },
    colors: ["#465FFF"],
    grid: {
      xaxis: { lines: { show: false } },
      yaxis: { lines: { show: false } },
    },
  };

  const series = [
    {
      name: "Times Borrowed",
      data: counts,
    },
  ];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white px-5 pb-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Most Borrowed Books
        </h3>
        <p className="mt-1 text-gray-500 text-sm dark:text-gray-400">
          Top 5 books based on borrowing frequency.
        </p>
      </div>

      {loading ? (
        <p className="text-gray-500 dark:text-gray-400">Loading chart...</p>
      ) : (
        <div className="max-w-full overflow-x-auto custom-scrollbar">
          <div className="min-w-[300px]">
            <ReactApexChart options={options} series={series} type="bar" height={350} />
          </div>
        </div>
      )}
    </div>
  );
}

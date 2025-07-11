"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

// Dynamically import ApexChart
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function BooksByCategoryChart() {
  const [categories, setCategories] = useState<string[]>([]);
  const [counts, setCounts] = useState<number[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/statistic/books-by-category")
      .then((res) => res.json())
      .then((json) => {
        if (json.status && json.data) {
          setCategories(json.data.categories);
          setCounts(json.data.counts);
        }
      })
      .catch((err) => {
        console.error("Error fetching category data:", err);
      });
  }, []);

  const options: ApexOptions = {
    labels: categories,
    legend: {
      position: "bottom",
      fontSize: "14px",
      labels: {
        colors: "#6B7280",
      },
    },
    chart: {
      type: "donut",
      fontFamily: "Outfit, sans-serif",
    },
    colors: ["#6366F1", "#10B981", "#F59E0B", "#EF4444", "#3B82F6"],
    tooltip: {
      y: {
        formatter: (val) => `${val} books`,
      },
    },
    responsive: [
      {
        breakpoint: 768,
        options: {
          chart: {
            width: "100%",
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white px-5 pb-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-4">
        Books by Category
      </h3>
      <div className="flex justify-center">
        <ReactApexChart options={options} series={counts} type="donut" width={380} />
      </div>
    </div>
  );
}

"use client";
import React, { useEffect, useState } from "react";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { authFetch } from "@/lib/authfetch";

// Dynamically import the ReactApexChart component
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function StatisticsChart() {
  const [categories, setCategories] = useState<string[]>([]);
  const [borrowedData, setBorrowedData] = useState<number[]>([]);
  const [returnedData, setReturnedData] = useState<number[]>([]);

  useEffect(() => {
    authFetch("http://localhost:8080/api/v1/statistic/monthly-trend")
      .then((res) => res.json())
      .then((json) => {
        if (json.status && json.data) {
          setCategories(json.data.month_year);
          setBorrowedData(json.data.total_borrowed);
          setReturnedData(json.data.total_returned);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch chart data:", err);
      });
  }, []);

  const options: ApexOptions = {
    legend: {
      show: false,
      position: "top",
      horizontalAlign: "left",
    },
    colors: ["#465FFF", "#9CB9FF"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      height: 310,
      type: "line",
      toolbar: {
        show: false,
      },
    },
    stroke: {
      curve: "straight",
      width: [2, 2],
    },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.55,
        opacityTo: 0,
      },
    },
    markers: {
      size: 0,
      strokeColors: "#fff",
      strokeWidth: 2,
      hover: {
        size: 6,
      },
    },
    grid: {
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      enabled: true,
      x: {
        format: "dd MMM yyyy",
      },
    },
    xaxis: {
  type: "category",
  categories,
  axisBorder: {
    show: false,
  },
  axisTicks: {
    show: false,
  },
  labels: {
    show: true,
    style: {
      fontSize: "11px",
      colors: "#9CA3AF", // Tailwind's gray-400
    },
    rotate: -15, // Slight tilt for readability (optional)
    trim: true,
  },
  tooltip: {
    enabled: false,
  },
},
    yaxis: {
      labels: {
        style: {
          fontSize: "12px",
          colors: ["#6B7280"],
        },
      },
      title: {
        text: "",
        style: {
          fontSize: "0px",
        },
      },
    },
  };

  const series = [
    {
      name: "Borrowed",
      data: borrowedData,
    },
    {
      name: "Returned",
      data: returnedData,
    },
  ];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white px-5 pb-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
      <div className="flex flex-col gap-5 mb-6 sm:flex-row sm:justify-between">
        <div className="w-full">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Lending Trend
          </h3>
        </div>
      </div>

      <div className="max-w-full overflow-x-auto custom-scrollbar">
        <div className="min-w-[1000px] xl:min-w-full">
          <ReactApexChart
            options={options}
            series={series}
            type="area"
            height={310}
          />
        </div>
      </div>
    </div>
  );
}

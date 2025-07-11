"use client";

import { useEffect, useState } from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import ComponentCard from "@/components/common/ComponentCard";
import LendingTable from "@/components/tables/Lending";
import type { LendingRecord } from "@/types/lending";
import { useAuth } from "@/hooks/useAuth";
import { authFetch } from "@/lib/authfetch";


export default function LendingsPage() {
  const { isAuthenticated, loading: authLoading } = useAuth();

  const [records, setRecords] = useState<LendingRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      fetchLendingRecords();
    }
  }, [isAuthenticated]);

  const fetchLendingRecords = async () => {
    try {
      const res = await authFetch("http://localhost:8080/api/v1/lending-record");
      const json = await res.json();

      if (!json.status || !Array.isArray(json.data)) {
        throw new Error("Invalid response format");
      }

      setRecords(json.data);
    } catch (err) {
      setError("Failed to fetch lending records: " + err);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) return <div>Loading...</div>;
  if (!isAuthenticated) return null; // Already redirected by useAuth

  return (
    <div>
      <PageBreadcrumb pageTitle="Lending Records" />
      <div className="space-y-6">
        <ComponentCard title="Lending History">
          <LendingTable
            records={records}
            loading={loading}
            error={error}
            refresh={fetchLendingRecords}
          />
        </ComponentCard>
      </div>
    </div>
  );
}

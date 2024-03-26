"use client";
import { DataTable } from "@/components/table/data-table";
import { Test, columns } from "@/components/table/columns";
import { Suspense } from "react";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

function getData(): any {
  const response = useQuery(api.tests.getTests);
  return response;
}

export default function DemoPage() {
  const tests = useQuery(api.tests.getTests);
  const loading = tests === undefined;

  if (loading) {
    return <div>Loading........</div>;
  }

  return (
    <div className="">
      <DataTable columns={columns} data={tests} />
    </div>
  );
}

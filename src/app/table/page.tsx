"use client";
import { useQuery } from "convex/react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { api } from "../../../convex/_generated/api";
import { DonutChart } from "@tremor/react";
import { Card } from "@/components/ui/card";
import { Suspense, useState } from "react";

function getData(): any {
  const response = useQuery(api.tests.getTests);
  return response;
}

// function transformTestDataToChartData(tests: any[]) {
//   const statusCounts = tests.reduce((acc, test) => {
//     const { status } = test;
//     acc[status] = (acc[status] || 0) + 1;
//     return acc;
//   }, {});

//   const colorMap: { [key: string]: string } = {
//     pass: "green",
//     fail: "red",
//     pending: "yellow",
//   };

//   // Create an array from statusCounts, mapping each status to its corresponding color
//   const chartData = Object.entries(statusCounts).map(([name, sales]) => ({
//     name,
//     sales,
//     color: colorMap[name],
//   }));

//   const statusOrder = ["pass", "fail", "pending"];
//   chartData.sort(
//     (a, b) => statusOrder.indexOf(a.name) - statusOrder.indexOf(b.name)
//   );

//   return chartData;
// }

// const valueFormatter = (number: number) => `${number} Tests`;

export default function DemoPage() {
  const data = getData();

  return (
    <div className="">
      {/* <Card className="max-w-xs my-4 py-4">
        <DonutChart
          data={transformTestDataToChartData(data)}
          category="sales"
          index="name"
          colors={["green", "red", "yellow"]}
          valueFormatter={valueFormatter}
        />
      </Card> */}
      <DataTable columns={columns} data={data} />
    </div>
  );
}

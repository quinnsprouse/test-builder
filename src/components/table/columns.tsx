"use client";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { Id } from "../../../convex/_generated/dataModel";
import { statuses, priorities } from "@/data/data";
import { Badge } from "@tremor/react";

export interface Test {
  _id: Id<"tests">;
  _creationTime: number;
  testId: string;
  automated: boolean;
  createdBy: string;
  createdByImg: string;
  desc: string;
  lastTested: string;
  label: string;
  status: "pending" | "pass" | "fail";
  priority: "low" | "medium" | "high";
  notes: string;
}

export const columns: ColumnDef<Test>[] = [
  {
    accessorKey: "testId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Test" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("testId")}</div>,
    enableSorting: false,
  },
  {
    accessorKey: "label",
    header: ({ column }) => <></>,
    cell: ({ row }) => <></>,
  },
  {
    accessorKey: "desc",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <Badge>{row.getValue("label")}</Badge>
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("desc")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("status")
      );

      if (!status) {
        return null;
      }

      return (
        <Badge color={status.color}>
          <div className="flex items-center">
            <span>{status.label}</span>
          </div>
        </Badge>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "priority",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Priority" />
    ),
    cell: ({ row }) => {
      const priority = priorities.find(
        (priority) => priority.value === row.getValue("priority")
      );

      if (!priority) {
        return null;
      }

      return (
        <div className="flex items-center">
          {priority.icon && (
            <priority.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{priority.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];

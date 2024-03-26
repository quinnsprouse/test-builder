"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@tremor/react";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Id } from "../../../convex/_generated/dataModel";
import {
  CheckCircleIcon,
  SparklesIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { WrenchIcon } from "@heroicons/react/20/solid";
export interface Test {
  _id: Id<"tests">;
  _creationTime: number;
  automated: boolean;
  createdBy: string;
  createdByImg: string;
  desc: string;
  lastTested: string;
  status: "pending" | "pass" | "fail";
  steps: Array<{
    stepDesc: string;
    stepType: string;
  }>;
  notes: string;
}

export const columns: ColumnDef<Test>[] = [
  {
    accessorKey: "desc",
    header: "Description",
  },
  {
    accessorKey: "createdBy",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created By
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "lastTested",
    header: "Last Tested",
  },
  {
    accessorKey: "notes",
    header: "Notes",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => {
      // Explicitly assert the type of status
      const status = getValue() as "pending" | "pass" | "fail";

      let color = "gray"; // Default color

      if (status === "pending") color = "yellow";
      else if (status === "pass") color = "green";
      else if (status === "fail") color = "red";

      return <Badge color={color}>{status}</Badge>;
    },
  },
  {
    accessorKey: "automated",
    header: "Automated",
    cell: ({ getValue }) => {
      // Explicitly assert the type of status
      const automated = getValue() as boolean;
      return (
        <div>
          {automated ? (
            <CheckCircleIcon className="h-6 w-6" />
          ) : (
            <XCircleIcon className="h-6 w-6" />
          )}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const test = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(test.createdBy)}
            >
              Copy Created By
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View test details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

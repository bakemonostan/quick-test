/* eslint-disable @next/next/no-img-element */
import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "@/utils/general";
import { DataTableColumnHeader } from "@/components/shared/DataTableColumnHeader";
import { VehicleListingTableData } from "@/types/dashboard";
import { cn } from "@/lib/utils";

export const columns: ColumnDef<VehicleListingTableData>[] = [
  {
    accessorKey: "image",
    id: "image",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Vehicle"
      />
    ),
    cell: ({ row }) => {
      const { title } = row.original;
      return (
        <div className="rounded-lg sm:p-2 flex text-xs sm:text-base sm:flex-col md:flex-row sm:w-max items-center gap-3">
          <img
            className="h-12 w-24 rounded-lg aspect-square object-cover"
            src={row.getValue("image")}
            alt=""
          />
          <p>
            <span>{title}</span>
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Date"
        hidden={true}
      />
    ),
    cell: ({ row }) => {
      const date = formatDate(row.original.date);
      return (
        <p className="text-sm sm:text-base justify-end h-full flex sm:block items-center">
          {date}
        </p>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Status"
        hidden={true}
      />
    ),
    cell: ({ row }) => {
      const { status } = row.original;

      const statusClasses = {
        active: "text-green-600 bg-green-100",
        pending: "text-yellow-600/80 bg-yellow-100",
        paused: "text-black/70 bg-gray-100",
        rejected: "text-red-600 bg-red-100",
      };

      const circleClasses = {
        active: "bg-green-700",
        pending: "bg-yellow-600",
        paused: "bg-gray-400",
        rejected: "bg-red-700",
      };

      const statusClass = statusClasses[status] || "text-gray-600 bg-gray-100";
      const circleClass = circleClasses[status] || "bg-gray-700";

      return (
        <p
          className={`text-base capitalize w-max p-1 px-2.5 rounded-md ${statusClass} gap-1 flex items-center`}>
          <span className={`${circleClass} size-2 rounded-full`}></span>
          <span>{status}</span>
        </p>
      );
    },
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Actions"
        hidden={true}
      />
    ),
    cell: () => (
      <div className="text-primary font-medium flex items-center justify-end pr-4">
        <div className={cn("flex items-center gap-1 rounded-full px-3 py-1")}>
          <span className="text-base font-bold tracking-widest">...</span>
        </div>
      </div>
    ),
  },
];

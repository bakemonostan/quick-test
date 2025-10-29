/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/shared/DataTableColumnHeader";
import { RequestTableData } from "@/types/dashboard";
import { formatDate } from "@/utils/general";

export const columns: ColumnDef<RequestTableData>[] = [
  {
    accessorKey: "image",
    id: "image",
    header: ({ column }) => (
      <DataTableColumnHeader 
        column={column} 
        title="Vehicle" 
      />
    ),
    cell: ({ row }) => (
      <div className="rounded-lg sm:p-2 flex text-xs sm:text-base sm:flex-col md:flex-row sm:w-max items-center gap-3">
        <img 
          className="h-12 w-24 rounded-lg aspect-square object-cover" 
          src={row.getValue("image")} 
          alt={row.original.vehicle.title}
        />
        <p><span>{row.original.vehicle.title}</span></p>
      </div>
    ),
    meta: {
      className: "bg-gray-100 hover:bg-gray-200 transition-colors"
    }
  },
  {
    accessorKey: "booking_id",
    header: ({ column }) => (
      <DataTableColumnHeader 
        column={column} 
        title="Booking ID" 
        hidden={true} 
      />
    ),
    cell: ({ row }) => (
      <p className="text-sm sm:text-base w-20 sm:w-32 truncate h-full flex sm:block items-center ml-auto sm:ml-0">
        {row.original.booking_id}
      </p>
    )
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
        <p className="text-sm w-max h-full flex sm:block items-center text-left">
          {date}
        </p>
      );
    }
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
      const { status } = row.original.vehicle;

      const statusClasses = {
        active: "text-green-600 bg-green-100",
        pending: "text-yellow-600/80 bg-yellow-100",
        paused: "text-black/70 bg-gray-100",
        rejected: "text-black/80 bg-red-100",
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
        <p className={`text-base capitalize w-max p-1 px-2.5 rounded-md ${statusClass} gap-1 flex items-center ml-auto sm:ml-0`}>
          <span className={`${circleClass} size-2 rounded-full`}></span>
          <span>{status}</span>
        </p>
      );
    }
  }
];

export default function RequestsTableColumns() {
  return (
    <div>RequestsTableColumns</div>
  );
}

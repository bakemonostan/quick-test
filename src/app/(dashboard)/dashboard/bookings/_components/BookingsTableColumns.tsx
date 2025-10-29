/* eslint-disable @next/next/no-img-element */
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/shared/DataTableColumnHeader";
import { BookingsTableData } from "@/types/dashboard";
import { formatDate } from "@/utils/general";

export const columns: ColumnDef<BookingsTableData>[] = [
  {
    accessorKey: "image",
    id: "image",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Vehicle" />
    ),
    cell: ({ row }) => (
      <div className="rounded-lg sm:p-2 flex text-xs sm:text-base sm:flex-col md:flex-row sm:w-max items-center gap-3">
        <img
          className="h-12 w-24 rounded-lg aspect-square object-cover"
          src={row.getValue("image")}
          alt={row.original.vehicle.title}
        />
        <p className="truncate w-28">
          <span >{row.original.vehicle.title}</span>
        </p>
      </div>
    ),
    meta: {
      className: "bg-gray-100 hover:bg-gray-200 transition-colors",
    },
  },
  {
    accessorKey: "booking_id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Booking ID" hidden={true} />
    ),
    cell: ({ row }) => (
      <p className="text-sm sm:text-base w-20 sm:w-32 truncate h-full flex sm:block items-center ml-auto sm:ml-0">
        {row.original.booking_id}
      </p>
    ),
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" hidden={true} />
    ),
    cell: ({ row }) => {
      const date = formatDate(row.original.date);
      return (
        <p className="text-sm w-max h-full flex sm:block items-center text-left">
          {date}
        </p>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" hidden={true} />
    ),
    cell: ({ row }) => {
      const { status } = row.original;
      const statusClasses = {
        confirmed: "text-green-600 bg-green-100",
        cancelled: "text-red-500 bg-red-100",
      };
      const circleClasses = {
        confirmed: "bg-green-700",
        cancelled: "bg-red-700",
      };
      const statusClass = statusClasses[status] || "text-gray-600 bg-gray-100";
      const circleClass = circleClasses[status] || "bg-gray-700";
      
      return (
        <p className={`text-base capitalize w-max p-1 px-2.5 rounded-md ${statusClass} gap-1 flex items-center ml-auto sm:ml-0`}>
          <span className={`${circleClass} size-2 rounded-full`} />
          <span>{status}</span>
        </p>
      );
    },
  },
];

export default function BookingsTableColumns() {
  return null;
}

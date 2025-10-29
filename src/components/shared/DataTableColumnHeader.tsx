import { Column } from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react";

interface DataTableColumnHeaderProps<TData, TValue> {
  column: Column<TData, TValue>;
  title: string;
  hidden?: boolean;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  hidden,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort() || hidden) {
    return <div>{title}</div>;
  }

  return (
    <div className={cn("flex items-center space-x-2", hidden && "hidden")}>
      <p
        className="flex w-full pl-3 items-center h-8 data-[state=open]:bg-accent"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        <span>{title}</span>
        {column.getIsSorted() === "desc" ? (
          <ArrowDown className="ml-2 h-4 w-4" />
        ) : column.getIsSorted() === "asc" ? (
          <ArrowUp className="ml-2 h-4 w-4" />
        ) : (
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        )}
      </p>
    </div>
  );
} 

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getPageNumbers } from "@/services/vehicleListing";

interface AllVehiclesPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading: boolean;
  isError: boolean;
  hasItems: boolean;
}

export default function AllVehiclesPagination({
  currentPage,
  totalPages,
  onPageChange,
  isLoading,
  isError,
  hasItems
}: AllVehiclesPaginationProps) {
  if (isLoading || isError || !hasItems) {
    return null;
  }

  return (
    <div className="flex col-span-full justify-center py-8">
      <nav className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}>
          <ChevronLeft className="w-4 h-4" />
        </Button>
        {getPageNumbers(currentPage, totalPages).map((page) => (
          <Button
            key={page}
            className={`font-bold ${
              page === currentPage ? "bg-primary text-primary-foreground" : ""
            } aspect-square`}
            variant={page === currentPage ? "default" : "outline"}
            size="sm"
            disabled={page === currentPage}
            onClick={() => onPageChange(page)}>
            {page}
          </Button>
        ))}
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}>
          <ChevronRight className="w-4 h-4" />
        </Button>
      </nav>
    </div>
  );
}

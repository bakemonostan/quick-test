"use client";

import { useCallback, useState, useEffect } from "react";
import { SlidersHorizontal } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

import VehicleCard from "../../_components/VehicleCard";
import { fetchVehicles, getfilterableListing } from "@/services/vehicleListing";
import AllVehiclesHeader from "../../_components/AllVehiclesHeader";
import AllVehiclesSkeletonLoader from "../../_components/AllVehiclesSkeletonLoader";
import AllVehiclesPagination from "../../_components/AllVehiclesPagination";
import HeroSearchComponent from "@/app/(landing)/_components/shared/HeroSearchComponent";
import FilterComponent, {
  DEFAULT_FILTER_VALUES,
} from "../../_components/FilterComponent";
import { FilterableVehicles, Vehicle } from "@/types/allVehicles";
import { ApiResponse } from "@/types/global";
import { useModal } from "@/providers/ModalContext";

interface FilterValues {
  price_per_day: number;
  rating: number;
  sort_by: "Lowest price" | "Highest price";
  instant_bookings: boolean;
}

type FiltersState = {
  page: number;
  perPage: string;
  category?: string;
  sub_category?: string;
  type?: string;
  rental_date_from?: string;
  rental_date_to?: string;
  price_per_day?: number;
  rating?: number;
  sort_by?: string;
  instant_bookings?: boolean;
};

export default function AllVehiclesContent() {
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);

  // Function to parse URL params into filters state
  const parseUrlParams = useCallback(() => {
    const initialFilters: FiltersState = {
      page: Number(searchParams.get("page")) || 1,
      perPage: searchParams.get("per_page") || "9",
    };

    // Parse URL params with type conversion
    const paramParsers = {
      category: (value: string) => value,
      sub_category: (value: string) => value,
      type: (value: string) => value,
      rental_date_from: (value: string) => value,
      rental_date_to: (value: string) => value,
      price_per_day: (value: string) => Number(value),
      rating: (value: string) => Number(value),
      sort_by: (value: string) => value,
      instant_bookings: (value: string) => value === "1" || value === "true",
    };

    Object.entries(paramParsers).forEach(([key, parser]) => {
      const value = searchParams.get(key);
      if (value) {
        Object.assign(initialFilters, { [key]: parser(value) });
      }
    });

    return initialFilters;
  }, [searchParams]);

  // Initialize state from URL params
  const [filters, setFilters] = useState<FiltersState>(parseUrlParams);

  // Set mounted state on client-side
  useEffect(() => {
    setMounted(true);
  }, []);

  // Watch for URL changes and update filters
  useEffect(() => {
    if (mounted) {
      setFilters(parseUrlParams());
    }
  }, [parseUrlParams, mounted]);

  const hasFilters = Object.keys(filters).some(
    (key) =>
      key !== "page" && key !== "perPage" && filters[key as keyof FiltersState]
  );

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["vehicles", filters],
    queryFn: async () => {
      if (hasFilters) {
        const { page, perPage, instant_bookings, ...otherFilters } = filters;
        // Build API params with correct types
        const apiParams: Record<string, string | number> = {
          ...otherFilters,
          page,
          per_page: perPage,
        };

        if (instant_bookings !== undefined) {
          apiParams.instant_bookings = instant_bookings ? 1 : 0;
        }

        const filteredData = await getfilterableListing(apiParams);
        return {
          data: filteredData,
          status: true,
          message: "Success",
        } as ApiResponse<FilterableVehicles>;
      }
      return fetchVehicles(filters.page, filters.perPage);
    },
    refetchOnMount: false,
    staleTime: 30000,
  });

  const vehicles = data?.data?.data || [];
  const meta = data?.data?.meta || {
    current_page: 1,
    last_page: 1,
    total: 0,
    per_page: Number(filters.perPage),
    from: 1,
    to: Number(filters.perPage),
  };

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  };

  const handlePerPageChange = (value: string) => {
    setFilters((prev) => ({ ...prev, perPage: value, page: 1 }));
  };

  const handleShowAllVehicles = () => {
    setFilters({ page: 1, perPage: "9" });
  };

  const handleFilterChange = useCallback(
    (filterValues: FilterValues) => {
      const newFilters: Partial<FiltersState> = {
        page: 1,
        perPage: filters.perPage,
      };

      if (filterValues.price_per_day) {
        newFilters.price_per_day = filterValues.price_per_day;
      }

      if (filterValues.rating) {
        newFilters.rating = filterValues.rating;
      }

      if (filterValues.sort_by) {
        newFilters.sort_by =
          filterValues.sort_by === "Lowest price" ? "asc" : "desc";
      }

      if (filterValues.instant_bookings) {
        newFilters.instant_bookings = filterValues.instant_bookings;
      }

      const isDefault =
        filterValues.price_per_day === DEFAULT_FILTER_VALUES.price_per_day &&
        filterValues.rating === DEFAULT_FILTER_VALUES.rating &&
        filterValues.sort_by === DEFAULT_FILTER_VALUES.sort_by &&
        filterValues.instant_bookings ===
          DEFAULT_FILTER_VALUES.instant_bookings;

      if (isDefault) {
        // Reset to basic filters
        setFilters({ page: 1, perPage: filters.perPage });
      } else {
        setFilters((prev) => ({ ...prev, ...newFilters }));
      }
    },
    [filters.perPage]
  );

  const { openModal } = useModal();

  return (
    <section
      className="mx-auto p-5 w-full lg:max-w-[79.5rem]"
      id="all-vehicles-page"
      suppressHydrationWarning>
      <div>
        <div className="py-8 sm:block hidden">
          <HeroSearchComponent />
        </div>
        <div
          onClick={() => openModal("vehicles-filter-modal")}
          className="flex gap-4 justify-center px-6 py-3 mx-auto my-8 w-3/4 rounded-3xl border cursor-pointer sm:hidden">
          <SlidersHorizontal className="text-black/50" />
          <p className="text-sm font-bold text-black/50">Select filters</p>
        </div>
      </div>

      <AllVehiclesHeader
        totalVehicles={meta.total}
        perPage={filters.perPage}
        onPerPageChange={handlePerPageChange}
        onShowAllVehicles={handleShowAllVehicles}
      />

      <div className="grid grid-cols-1 gap-5 py-4 lg:grid-cols-12">
        <div className="hidden lg:block lg:col-span-3">
          <FilterComponent onFilterChange={handleFilterChange} />
        </div>
        <div className="grid gap-x-3 gap-y-[3.75rem] sm:grid-cols-12 lg:col-span-9">
          {isLoading ? (
            <div className="col-span-12 grid grid-cols-1 sm:grid-cols-12 gap-5">
              <AllVehiclesSkeletonLoader
                count={parseInt(filters.perPage)}
                showSpinner={false}
              />
            </div>
          ) : isError ? (
            <div className="col-span-full text-center py-10 text-red-500">
              Error loading vehicles: {error.message}
            </div>
          ) : vehicles.length === 0 ? (
            <div className="col-span-full text-center py-10">
              No vehicles found
            </div>
          ) : (
            vehicles.map((vehicle: Vehicle) => (
              <div
                key={vehicle.id}
                className="w-full sm:col-span-6 lg:col-span-4">
                <VehicleCard vehicle={vehicle} />
              </div>
            ))
          )}
        </div>
      </div>

      <AllVehiclesPagination
        currentPage={filters.page}
        totalPages={meta.last_page}
        onPageChange={handlePageChange}
        isLoading={isLoading}
        isError={isError}
        hasItems={vehicles.length > 0}
      />
    </section>
  );
} 

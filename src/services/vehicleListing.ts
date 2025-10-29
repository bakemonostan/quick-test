import api from '@/config/api'
import { type FilterableVehicles } from '@/types/allVehicles'
import type { VehicleDetailsFormData } from '@/types/vehicleListingForm'
import { handleGet } from '@/utils/general'
import { ApiResponse } from '@/types/global'

/**
 * Submit vehicle details to create a new vehicle listing
 * @param vehicleDetails - The vehicle details form data
 * @returns Promise with the API response
 */
export async function submitVehicleDetails(vehicleDetails: VehicleDetailsFormData) {
  return api.post('/vehicle/detail', vehicleDetails)
}

/**
 * Fetch paginated vehicles with specified page and items per page
 * @param page - The current page number
 * @param itemsPerPage - Number of items per page
 * @returns Promise with the API response containing paginated vehicles
 */
export async function fetchVehicles(page: number, itemsPerPage: string) {
  const response = await api.get<ApiResponse<FilterableVehicles>>(
    `/vehicle/listing?page=${page}&per_page=${itemsPerPage}`
  );
  return response.data;
}

/**
 * Generate page numbers array with ellipsis for pagination
 * @param currentPage - The current active page
 * @param totalPages - Total number of pages available
 * @returns Array of page numbers to display in pagination
 */
export function getPageNumbers(currentPage: number, totalPages: number) {
  const pageNumbers = [];
  const maxVisible = 5;

  if (totalPages <= maxVisible) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    if (currentPage <= 3) {
      for (let i = 1; i <= 5; i++) {
        pageNumbers.push(i);
      }
    } else if (currentPage >= totalPages - 2) {
      for (let i = totalPages - 4; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(
        currentPage - 2,
        currentPage - 1,
        currentPage,
        currentPage + 1,
        currentPage + 2
      );
    }
  }

  return pageNumbers;
}

export async function getfilterableListing(filters?: Record<string, string | number>) {
  let url = '/vehicle/listing'
  if (filters && Object.keys(filters).length > 0) {
    const queryParams = new URLSearchParams()
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        queryParams.append(key, value.toString())
      }
    })
    url += `?${queryParams.toString()}`
  }
  return handleGet<FilterableVehicles>(url)
}

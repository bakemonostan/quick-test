import api from "@/config/api";
import {
  BookingDetailsData,
  BookingsTableData,
  RequestDetailsData,
  RequestTableData,
  UserData,
  Vehicle,
  VehicleListingDetailsData,
  VehicleListingTableData,
  ViewDashBoard,
} from "@/types/dashboard";
import { ApiResponse, handleGet } from "@/utils/general";

//lisitng
export async function getDashboardData() {
  return handleGet<ViewDashBoard>("/dashboard");
}

export async function getUserListingTableData() {
  return handleGet<VehicleListingTableData[]>("/vehicle/view/listing");
}

export async function getsingleListing(id: string) {
  return handleGet<VehicleListingDetailsData>(`/vehicle/view/listing/${id}`);
}

export async function getSingleVehicleListing(id: string) {
  return handleGet<Vehicle>(`/vehicle/listing/${id}`);
}

export async function updateListingStatus(id: string) {
  return api.put(`/vehicle/update/listing-status/${id}`);
}

// requests
export async function getAllRequests() {
  return handleGet<RequestTableData[]>("/request");
}

export async function getSingleRequest(id: string) {
  return handleGet<RequestDetailsData>(`/request/${id}`);
}

export async function getAllBookings() {
  return handleGet<BookingsTableData[]>("/booking");
}

export async function getSingleBooking(id: string) {
  return handleGet<BookingDetailsData>(`/booking/${id}`);
}

export async function getUserDetails() {
  return api.get<ApiResponse<UserData>>("/account/profile");
}

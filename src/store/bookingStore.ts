import { create } from "zustand";
import { VehicleData } from "@/app/(list-a-vehicle)/list-a-vehicle/types";
import { persist, createJSONStorage } from "zustand/middleware";

export interface SearchParams {
  categoryId?: string | null;
  subCategoryId?: string | null;
  typeId?: string | null;
  rentalDateFrom?: string | null;
  rentalDateTo?: string | null;
}

interface BookingStore {
  vehicleData: VehicleData | null;
  searchParams: SearchParams;
  finalPage: boolean;
  termsAgreed: boolean;
  bookingId: string | null;
  bookingImage: string | null;
  lastActivityTimestamp: number;
  updateActivityTimestamp: () => void;
  setVehicleData: (data: VehicleData) => void;
  setSearchParams: (params: SearchParams) => void;
  setFinalPage: (value: boolean) => void;
  setTermsAgreed: (value: boolean) => void;
  setBookingId: (id: string) => void;
  setBookingImage: (image: string) => void;
  clearStorage: () => void;
  resetBooking: () => void;
}

export const useBookingStore = create<BookingStore>()(
  persist(
    (set) => ({
      vehicleData: null,
      searchParams: {
        categoryId: null,
        subCategoryId: null,
        typeId: null,
        rentalDateFrom: null,
        rentalDateTo: null,
      },
      finalPage: false,
      termsAgreed: false,
      bookingId: null,
      bookingImage: null,
      lastActivityTimestamp: Date.now(),
      updateActivityTimestamp: () => {
        set({ lastActivityTimestamp: Date.now() });
      },
      setVehicleData: (data: VehicleData) => set({ vehicleData: data }),
      setSearchParams: (params: SearchParams) => set({ searchParams: params }),
      setFinalPage: (value: boolean) => set({ finalPage: value }),
      setTermsAgreed: (value: boolean) => set({ termsAgreed: value }),
      setBookingId: (id: string) => set({ bookingId: id }),
      setBookingImage: (image: string) => set({ bookingImage: image }),

      resetBooking: () =>
        set({
          searchParams: {
            categoryId: null,
            subCategoryId: null,
            typeId: null,
            rentalDateFrom: null,
            rentalDateTo: null,
          },
          finalPage: false,
          termsAgreed: false,
          bookingId: null,
          bookingImage: null,
          vehicleData: null,
        }),
      clearStorage: () => {
        localStorage.removeItem("vehicle-listing-data");
        set({
          vehicleData: null,
          searchParams: {
            categoryId: null,
            subCategoryId: null,
            typeId: null,
            rentalDateFrom: null,
            rentalDateTo: null,
          },
          finalPage: false,
          termsAgreed: false,
          bookingId: null,
          bookingImage: null,
          lastActivityTimestamp: Date.now(), // Reset timestamp on clear
        });
      },
    }),
    {
      name: "vehicle-listing-data",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { useModal } from "@/providers/ModalContext";
import { useRouter } from "next/navigation";
import { useBookingStore } from "@/store/bookingStore";
import { useVehicleListingStore } from "@/app/(list-a-vehicle)/list-a-vehicle/vehicleListingstore";

export default function BookingCompleteModal() {
  const { modalParams, closeModal } = useModal();
  const router = useRouter();
  const { resetBooking, bookingImage } = useBookingStore();
  const { resetStore } = useVehicleListingStore();

  const booking_id = modalParams?.["booking-complete-modal"]?.booking_id;

  const handleManageBookings = () => {
    router.push("/dashboard/bookings");
    resetBooking();
    closeModal();
    localStorage.removeItem("list-a-vehicle");
    resetStore();
  };

  const handleClose = () => {
    handleManageBookings();
  };

  return (
    <Modal
      id="booking-complete-modal"
      title="Booking Complete"
      className="modal-md"
      onClose={handleClose}>
      <div className="space-y-6">
        <div className="w-full border rounded-md">
          <img
            src={bookingImage || "https://picsum.photos/200/300"}
            alt="Vehicle"
            className="w-full object-cover aspect-[2/1] rounded-md"
          />
        </div>

        <div className="text-sm">
          <p className="text-2xl font-bold">We have received your booking!</p>
          <p>
            Booking ID <span className="font-bold">#{booking_id}</span>
          </p>
        </div>

        <div className="space-y-1">
          <p className="font-bold">Payment</p>
          <p>
            Amount will be automatically charged to your payment method. Ensure
            you have enough in your account to ensure your booking is confirmed.
          </p>
        </div>

        <div className="space-y-1">
          <p className="font-bold">Pick up instructions</p>
          <p>
            Pick up will be at my home, which I or my wife will come out to meet
            you to hand over keys. I will check drivers license, and match it up
            to the person who booked. I will also take a picture of your Drivers
            License.
          </p>
        </div>

        <div className="flex justify-start w-full">
          <Button
            onClick={handleManageBookings}
            className="w-max"
            variant="outline">
            Manage Bookings
          </Button>
        </div>
      </div>
    </Modal>
  );
}

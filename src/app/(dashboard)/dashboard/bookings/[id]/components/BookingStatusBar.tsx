import React from "react";
import { Image } from "@mantine/core";
import { BookingDetailsData } from "@/types/dashboard";

export default function BookingStatusBar({
  data,
}: {
  data: BookingDetailsData;
}) {
  // Determine which image and message to show based on status
  const getStatusContent = () => {
    switch(data?.status) {
      case 'confirmed':
        return {
          src: "/images/party-popper-img.jpg",
          alt: "party",
          message: "Your host has confirmed your booking"
        };
      case 'cancelled':
        return {
          src: "/images/warning-img.jpg",
          alt: "warning",
          message: "Your host not approved your booking, but they will soon!"
        };
      case 'pending':
        return {
          src: "/images/warning-img.jpg",
          alt: "warning",
          message: "Your host not approved your booking, but they will soon!"
        };
      case 'review':
        return {
          src: "/images/warning-img.jpg",
          alt: "warning",
          message: "Your booking is under review"
        };
      default:
        return {
          src: "/images/eyes-img.jpg",
          alt: "eyes",
          message: "Your booking request has been received"
        };
    }
  };

  const statusContent = getStatusContent();

  return (
    <div className="p-4 mt-4 rounded-md sm:p-6 bg-black/5">
      <div className="flex items-center gap-3">
        <div className="size-8">
          <Image
            src={statusContent.src}
            alt={statusContent.alt}
            width={24}
            height={24}
            className="mix-blend-multiply"
          />
        </div>
        <p className="text-sm sm:body-2 font-normal">{statusContent.message}</p>
      </div>
    </div>
  );
} 
import React from "react";
import { VehicleListingDetailsData } from "@/types/dashboard";
import { Image } from "@mantine/core";

export default function ListingStatusBar({
  data,
}: {
  data: VehicleListingDetailsData;
}) {
  // Determine which image and message to show based on status
  const getStatusContent = () => {
    switch(data?.status) {
      case 'paused':
        return {
          src: "/images/pause-img.jpg",
          alt: "pause",
          message: "This listing currently not active on Kaparki because you paused it."
        };
      case 'active':
        return {
          src: "/images/eyes-img.jpg",
          alt: "eye",
          message: "Your ad has been approved and now live on Kaparki"
        };
      case 'not approved':
        return {
          src: "/images/warning-img.jpg",
          alt: "warning",
          message: "Your ad failed to meet our quality standard or terms of use. Edit and try again"
        };
      case 'pending':
      case 'review':
        return {
          src: "/images/warning-img.jpg",
          alt: "warning",
          message: "We have received your ad and it will go live as soon as it's approved!"
        };
      default:
        return {
          src: "/images/party-popper-img.jpg",
          alt: "party",
          message: "Congratulations on listing your vehicle!"
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

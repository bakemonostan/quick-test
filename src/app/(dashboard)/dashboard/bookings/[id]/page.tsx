"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getSingleBooking } from "@/services/dashboard";
import { useParams } from "next/navigation";
import {
  formatCurrencyToEuros,
  formatDate,
  getStatusClass,
  getCircleClass,
} from "@/utils/general";
import { BookmarkIcon, MapIcon, Share2Icon } from "lucide-react";
import DashboardShell from "../../_components/DashboardShell";
import HeaderComponent from "../../_components/HeaderComponent";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

// import CancelBooking from "./components/CancelBooking";
// import { useBookingStore } from "@/store/bookingStore";
import BookingsCard from "./components/BookingsCard";
import { BookingDetailsData } from "@/types/dashboard";
import BookingStatusBar from "./components/BookingStatusBar";
import { Divider } from "@mantine/core";
import DetailsPageSkeleton from "../../_components/skeletons/DetailsPageSkeleton";
import DashboardCardSkeleton from "../../_components/skeletons/DashboardCardSkeleton";
import Goback from "@/components/shared/Goback";

export default function BookingDetailsPage() {
  const params = useParams();
  const id = params.id as string;
  // const { setCancelBooking } = useBookingStore();

  const { data, isLoading } = useQuery({
    queryKey: ["booking", id],
    queryFn: () => getSingleBooking(id),
  });

  // const handleCancelClick = () => {
  //   setCancelBooking(id);
  // };

  if (isLoading) {
    return (
      <DashboardShell card={<DashboardCardSkeleton />}>
        <DetailsPageSkeleton />
      </DashboardShell>
    );
  }

  return (
    <DashboardShell card={<BookingsCard data={data as BookingDetailsData} />}>
      <div className="block md:hidden">
        <Goback />
      </div>
        <div className="block md:hidden rounded-md my-5">
          <BookingsCard data={data as BookingDetailsData} />
        </div>
        <div className="overflow-auto overflow-y-auto bg-white sm:rounded-xl">
          <div>
            <div className="flex flex-col justify-between sm:items-center sm:flex-row">
              <HeaderComponent title="Booked Trip" />
              {data?.status === "confirmed" && (
                <Button
                  className="hidden text-xs rounded-full sm:flex sm:gap-3 sm:px-7 text-black sm:text-base bg-[#E6EFEB] hover:bg-[#E6EFEB]/50"
                  variant="ghost">
                  <span>
                    <MapIcon size={16} />
                  </span>
                  <span>Pick up instructions</span>
                </Button>
              )}
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-3 py-4 mt-8 border-t border-b sm:gap-5">
            <p className="flex gap-1 sm:gap-3 text-[#05603A]">
              <span>Status</span>
              <span
                className={`capitalize rounded-md flex items-center gap-1.5 px-2 p-0.5 ${getStatusClass(
                  data?.status
                )}`}>
                <span
                  className={`rounded-full size-2 ${getCircleClass(
                    data?.status
                  )}`}></span>
                <span className="text-[#05603A]">{data?.status}</span>
              </span>
            </p>
            <Divider
              orientation="vertical"
              className=" bg-black/30 w-[2px] hidden md:block"
            />
            <p className="flex gap-1 sm:gap-3 border-l border-black/30 pl-2 md:border-none md:pl-0">
              <span>Rental dates:</span>
              <span>
                {data?.vehicle?.unavailability_period?.[0]?.from
                  ? new Date(
                      data.vehicle.unavailability_period[0].from
                    ).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  : ""}{" "}
                - {formatDate(data?.vehicle?.unavailability_period?.[0]?.to)}
              </span>
            </p>
            <Divider
              orientation="vertical"
              className="bg-black/30 w-[2px]"
            />
            <p className="flex gap-1 sm:gap-3">
              <span>Booking ID</span>
              <span className="w-20 truncate">{data?.booking_id ?? "N/A"}</span>
            </p>
          </div>

          <BookingStatusBar data={data as BookingDetailsData} />

          <div className="grid gap-5 mt-4 font-medium sm:grid-cols-2">
            <div className="order-2 p-2 space-y-5 sm:space-y-8 sm:order-1">
              <p>Documents</p>
              <p className="flex gap-1.5 sm:gap-5 items-center">
                <span>
                  <BookmarkIcon size={16} />
                </span>
                <span className="font-medium">Reciept</span>
              </p>
              <p className="flex gap-1.5 sm:gap-5 items-center">
                <span>
                  <Share2Icon size={16} />
                </span>
                <span className="font-medium">Agreement</span>
              </p>
              <p className="flex gap-1.5 sm:gap-5 items-center">
                <span>
                  <Share2Icon size={16} />
                </span>
                <span className="font-medium">One more document</span>
              </p>
              <Separator
                orientation="horizontal"
                className="border"
              />
              <p className="flex gap-1.5 sm:gap-5 items-center">
                <span>
                  <Share2Icon size={16} />
                </span>
                <span className="font-medium">Vehicle details</span>
              </p>
              {data?.status === "confirmed" && (
                <p className="flex gap-1.5 sm:gap-5 items-center">
                  <span>
                    <Share2Icon size={16} />
                  </span>
                  <span
                    className="font-medium cursor-pointer"
                    // onClick={handleCancelClick}>
                  >
                    Cancel this booking
                  </span>
                </p>
              )}
            </div>
            <div className="order-1 p-2 border rounded-md sm:p-3 sm:order-2 flex flex-col gap-5">
              <p className="pb-5">Fee breakdown</p>
              <div className="flex flex-col gap-5 ">
                <div className="space-y-3 text-xs sm:text-base">
                  <p className="flex justify-between">
                    <span>Rental fee ({data?.num_days} days)</span>
                    <span className="font-bold">
                      {formatCurrencyToEuros(
                        Number(data?.vehicle?.rental_rate?.daily_rate)
                      )}
                    </span>
                  </p>
                  <p className="flex justify-between">
                    <span>Service fee </span>
                    <span className="font-bold">
                      {formatCurrencyToEuros(
                        Number(data?.vehicle?.rental_rate?.security_deposit)
                      )}
                    </span>
                  </p>
                  <p className="flex justify-between">
                    <span>Cleaning fee</span>
                    <span className="font-bold">
                      {formatCurrencyToEuros(
                        Number(data?.vehicle?.rental_rate?.cleaning_fee)
                      ) ?? "-"}
                    </span>
                  </p>
                  <p className="flex justify-between">
                    <span>Discount</span>
                    <span className="font-bold">
                      -{formatCurrencyToEuros(Number(data?.discount))}
                    </span>
                  </p>
                </div>
              </div>
              <Separator
                orientation="horizontal"
                className="mt-6 border"
              />
              <div className="py-4 pt-6 text-right ">
                <p className="font-bold flex items-center gap-1 justify-between">
                  <span>Refunded to you</span>
                  <span>
                    {formatCurrencyToEuros(Number(data?.total_amount))}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      {/* <CancelBooking id={id} /> */}
    </DashboardShell>
  );
}

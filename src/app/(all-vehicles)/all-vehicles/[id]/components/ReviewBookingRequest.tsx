/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect } from "react";
import { MapPinIcon, ThumbsUp } from "lucide-react";
import { useBookingStore } from "@/store/bookingStore";
import { Button } from "@/components/ui/button";
import { Card, CardDescription } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { formatCurrencyToEuros, formatDate } from "@/utils/general";
import { useModal } from "@/providers/ModalContext";
import { useRouter } from "next/navigation";
import { differenceInDays } from "date-fns";
import { toast } from "sonner";
import { getSingleVehicleListing } from "@/services/dashboard";
import useCustomQuery from "@/hooks/mutations/useCustomQuery";
import { GradientArrowIcon } from "@/components/icons";
import { useMutation } from "@tanstack/react-query";
import api from "@/config/api";

interface BookingComplete {
  data: {
    booking_id: string;
    date: string;
    id: string;
    image: string;
    status: string;
    total_amount: number;
  };
}

export default function ReviewBookingRequest({ id }: { id: string }) {
  const router = useRouter();
  const { openModal } = useModal();
  const [terms, setTerms] = useState(false);
  const [mounted, setMounted] = useState(false);

  const {
    searchParams,
    finalPage,
    termsAgreed,
    setFinalPage,
    setTermsAgreed,
    resetBooking,
    setBookingId,
    setBookingImage,
  } = useBookingStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  const { data } = useCustomQuery(
    ["Single vehicle listing for booking", id],
    () => getSingleVehicleListing(id),
    { enabled: !!id }
  );

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const response = await api.post<BookingComplete>("/booking", {
        vehicle_listing_id: id,
        from_date: searchParams.rentalDateFrom,
        to_date: searchParams.rentalDateTo,
        t_and_c: true,
      });
      console.log(response.data.data);
      return response.data;
    },
    onSuccess: (data) => {
      setBookingId(data.data.booking_id);
      setBookingImage(data.data.image);
      openModal("booking-complete-modal", {
        booking_id: data.data.booking_id,
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const [rentalDuration, setRentalDuration] = useState(0);

  useEffect(() => {
    // Update terms checkbox from store
    setTerms(termsAgreed);

    // Calculate rental duration
    if (searchParams.rentalDateFrom && searchParams.rentalDateTo) {
      const fromDate = new Date(searchParams.rentalDateFrom);
      const toDate = new Date(searchParams.rentalDateTo);

      if (!isNaN(fromDate.getTime()) && !isNaN(toDate.getTime())) {
        const days = differenceInDays(toDate, fromDate);
        setRentalDuration(days > 0 ? days : 0);
      }
    }
  }, [searchParams, termsAgreed]);

  const handleOpenDateModal = () => {
    if (!data) return;

    openModal("dates-modal", {
      unavailability: data.unavailability,
      minDays: data.rental_rate.min_trip_duration,
      maxDays: data.rental_rate.max_trip_duration,
      advanceNotice: data.rental_rate.advance_notice,
    });
  };

  const handleCancelBooking = () => {
    resetBooking();
    router.push("/all-vehicles");
  };

  const handleSubmitBooking = () => {
    if (!terms) {
      toast.error("Please agree to the terms and conditions");
      return;
    }

    mutate();
  };

  if (!mounted || !finalPage || !data) return null;

  return (
    <section
      className="py-[5rem] px-4"
      suppressHydrationWarning>
      <h1 className="font-bold text-black/80 heading-5 pb-6">
        Complete booking
      </h1>
      <div className="pb-8">
        <p className="text-black/80 heading-3 pb-2 flex items-center gap-2">
          <span className="font-extrabold">
            {formatDate(searchParams.rentalDateFrom)}
          </span>
          <span>
            <GradientArrowIcon />
          </span>
          <span className="font-extrabold">
            {formatDate(searchParams.rentalDateTo)}
          </span>
        </p>
        <p
          className="font-bold cursor-pointer"
          onClick={handleOpenDateModal}>
          Change dates
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-12">
        <div className="space-y-6 sm:col-span-8">
          <div className="flex gap-4 p-4 rounded-md bg-black/10">
            <ThumbsUp />
            <div>
              <p className="button-text font-semibold pb-2">
                What if my plans change?
              </p>
              <p className="body-2 font-light">Full refund before -</p>
            </div>
          </div>

          <div className="pb-5 border-b">
            {data.images && data.images.length > 0 && (
              <img
                src={data.images[0].image}
                alt=""
                className="w-full object-cover aspect-[2/1] rounded-md"
              />
            )}
            <p className="py-2 font-bold heading-4 pb-6">{data.title}</p>
            <p className="body-2 pb-6">
              You will be able to message your host once the booking is
              confirmed
            </p>
          </div>
        </div>

        <div className="p-[2px] sm:col-span-4 bg-gradient-to-r from-[#FFCB4E] to-[#AD75E2] rounded-lg">
          <Card className="flex flex-col gap-2.5 h-full p-3 hover:shadow-md rounded-lg shadow-lg">
            <CardDescription className="text-lg">
              <div className="space-y-4 pb-6">
                <p className="flex items-center justify-between gap-1 font-bold text-black">
                  <span className="body-2 font-light">
                    Rental fee ({rentalDuration} days)
                  </span>
                  <span className="body-2 font-bold">
                    {formatCurrencyToEuros(
                      Number(data.rental_rate.daily_rate) * rentalDuration
                    )}
                  </span>
                </p>
                <p className="flex items-center justify-between gap-1 font-bold text-black">
                  <span className="body-2 font-light">Daily rate</span>
                  <span className="body-2 font-bold">
                    {formatCurrencyToEuros(Number(data.rental_rate.daily_rate))}
                  </span>
                </p>
                <p className="flex items-center justify-between gap-1 font-bold text-black">
                  <span className="body-2 font-light">Cleaning fee</span>
                  <span className="body-2 font-bold">
                    {formatCurrencyToEuros(
                      Number(data.rental_rate.cleaning_fee || 0)
                    )}
                  </span>
                </p>
              </div>

              <div className="pb-6 space-y-2">
                <p className="body-2 font-bold">Pick up location</p>
                <p className="p-4 text-base border rounded-md text-black/70 flex items-center gap-2">
                  <span>
                    <MapPinIcon />
                  </span>
                  <span className="body-2 font-bold">{data.location}</span>
                </p>
                <p className="body-2 text-black/60 font-medium">
                  Full address will be visible once booking is completed
                </p>
              </div>

              <div className="flex items-center justify-between p-4 font-bold gap-3 text-black rounded-md bg-black/5">
                <span className="body-2 font-extrabold">Total</span>
                <span className="heading-3 font-extrabold">
                  {formatCurrencyToEuros(
                    Number(data.rental_rate.daily_rate) * rentalDuration +
                      Number(data.rental_rate.cleaning_fee || 0)
                  )}
                </span>
              </div>
            </CardDescription>
            <div className="grid w-full grid-cols-2 gap-2 pb-5 flex-1 h-full items-end">
              <Button
                className="duration-300 hover:scale-105"
                onClick={() => setFinalPage(false)}
                variant="outline">
                Go back
              </Button>
              <Button
                className="duration-300 hover:scale-105"
                onClick={handleCancelBooking}>
                Cancel Booking
              </Button>
            </div>
          </Card>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-12 ">
        <div className="space-y-5 sm:col-span-8  pb-8 border-b border-black/10">
          <p className="heading-4 font-bold pt-8">Terms and conditions</p>
          <p className="body-2">
            By clicking &apos;complete booking&apos;, you agree that Kaparki
            charge your account ending 8292 the total amount shown.
          </p>
          <div className="flex items-center gap-2">
            <Checkbox
              id="terms"
              checked={terms}
              onCheckedChange={(checked) => {
                setTerms(!!checked);
                setTermsAgreed(!!checked);
              }}
              className="size-5"
            />
            <label
              htmlFor="terms"
              className="body-3 text-black/70 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              I agree to kapaki terms of use and conditions
            </label>
          </div>
        </div>
        <div className="flex justify-end w-full sm:col-span-8">
          <Button
            type="submit"
            variant={"cta"}
            onClick={handleSubmitBooking}
            disabled={!terms || isPending}
            className="w-max">
            {isPending ? "Processing..." : "Complete Booking"}
          </Button>
        </div>
      </div>
    </section>
  );
}

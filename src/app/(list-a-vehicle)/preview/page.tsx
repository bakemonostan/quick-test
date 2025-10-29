"use client";
import { useBookingStore } from "@/store/bookingStore";
import { Button } from "@/components/ui/button";
import { MapPin, ArrowLeftIcon, Share } from "lucide-react";
import { useRouter } from "next/navigation";
import { useModal } from "@/providers/ModalContext";
import { Divider } from "@mantine/core";
import GradientButton from "@/components/GradientButton";
import BookMarkIcon from "@/components/icons/BookMarkIcon";
import {
  formatSafetySpec,
  formatTravelFeature,
  safetyKeys,
} from "@/app/(all-vehicles)/all-vehicles/[id]/components/content";
import { VehicleSpecification } from "@/types/dashboard";
import PreviewCarousel from "./components/PreviewCarousel";
import MobileCollapsibleSections from "./components/MobileCollapsibleSections";
import StarIcon from "@/components/icons/StarIcon";
import AvailabilitySection from "./components/AvailabilitySection";
import VehicleDetailsSkeleton from "@/app/(all-vehicles)/_components/VehicleDetailsSkeleton";
import { useEffect } from "react";

export default function Preview() {
  const { vehicleData, setBookingId, setBookingImage } = useBookingStore();
  const router = useRouter();
  const { openModal } = useModal();

  useEffect(() => {
    if (!vehicleData?.id) {
      router.push("/dashboard/overview");
    }
  }, [vehicleData, router]);

  if (!vehicleData) {
    return (
      <div className=" mx-auto max-w-[65rem]">
        <VehicleDetailsSkeleton />
      </div>
    );
  }

  const formatCurrencyToEuros = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "EUR",
    }).format(amount);
  };

  return (
    <section className="p-5 sm:space-y-10 mx-auto max-w-[65rem] space-y-6">
      {/* Back button on mobile */}
      <div
        className="flex gap-2 items-center cursor-pointer md:hidden"
        onClick={() => router.push("/form")}>
        <ArrowLeftIcon className="w-4 h-4" />
        <p>Back</p>
      </div>

      {/* Vehicle Image Carousel */}
      <PreviewCarousel images={vehicleData.images} />

      <div className="sm:grid sm:grid-cols-12 gap-10">
        <div className="col-span-12 md:col-span-8 space-y-5">
          <div>
            <div>
              <div className="bg-[#F9F7DE] rounded-md p-2.5 w-max">
                <p className="body-3 text-black/80">
                  This Vehicle is roadworthy
                </p>
              </div>
              <div>
                <p className="heading-3 font-bold py-2">
                  {vehicleData?.make.name} {vehicleData?.model.name}{" "}
                  {vehicleData?.year}
                </p>
              </div>
              <div className="flex items-center gap-2 body-2 text-black/80">
                <span>{vehicleData?.type.name}</span>
                <Divider
                  orientation="vertical"
                  className="h-6 border bg-black/10 border-black/10 w-[2px]"
                />
                <span>{vehicleData?.make.name}</span>
                <Divider
                  orientation="vertical"
                  className="h-6 border bg-black/10 border-black/10 w-[2px]"
                />
                <span>{vehicleData?.year}</span>
              </div>
              <div className="py-5">
                <p className="flex gap-1.5 items-center">
                  <span>
                    <StarIcon className="size-5 text-[#DBA806]" />
                  </span>
                  <span className="body-1 font-bold"> 3.8 </span>
                  <span className="body-3">(Block A billion times)</span>
                </p>
              </div>
              <div className="flex items-center gap-1.5 body-secondary border-b border-black/10 pb-8">
                <MapPin className="size-4" />
                <span>{vehicleData?.location}</span>
              </div>
              <div className="flex items-center gap-4 border-b py-6 border-black/10">
                <p className="flex items-center gap-2">
                  <span>
                    <BookMarkIcon />
                  </span>
                  <span className="body-3 font-semibold text-black/80">
                    Save
                  </span>
                </p>
                <p className="flex items-center gap-2">
                  <span>
                    <Share className="size-4" />
                  </span>
                  <span className="body-3 font-semibold text-black/80">
                    Share
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Desktop Sections - Hidden on Mobile */}
          <div className="hidden md:block">
            {/* Rules */}
            <div className="py-4 border-b border-black/10">
              <p className="font-bold uppercase heading-5 mb-4">Rules</p>
              <div className="space-y-5">
                <div className="grid grid-cols-7">
                  <p className="flex flex-col gap-3 body-2 font-bold text-black/80 capitalize col-span-3">
                    <span>Travel abroad?</span>
                    <span>Who can drive?</span>
                    <span>Vehicle care rules</span>
                  </p>
                  <p className="flex flex-col gap-3 body-2 font-light text-black/80 col-span-4">
                    <span>
                      {vehicleData.travel_feature.travel_abroad_allowed ===
                      "true"
                        ? "Yes"
                        : "No"}
                    </span>
                    <span>{vehicleData.travel_feature.who_can_drive}</span>
                    <span>{vehicleData.travel_feature.rule}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="py-4 border-b border-black/10">
              <p className="font-bold uppercase heading-5 mb-4">Pricing</p>
              <div className="grid grid-cols-3 py-4 rounded-md bg-black/5 min-h-[6.625rem]">
                <div className="flex flex-col items-center justify-between gap-2">
                  <span className="body-secondary font-medium text-center sm:text-sm text-black/75">
                    Rental rate per day
                  </span>
                  <span className="heading-secondary font-bold">
                    {formatCurrencyToEuros(
                      Number(vehicleData.rental_rate.daily_rate)
                    )}
                  </span>
                </div>
                <div className="flex flex-col items-center justify-between gap-2 border-x-2 border-black/5">
                  <span className="body-secondary font-medium text-center sm:body-2 text-black/75">
                    Kilometer per day
                  </span>
                  <span className="heading-secondary font-bold">
                    {vehicleData.rental_rate.max_trip_duration}km
                  </span>
                </div>
                <div className="flex flex-col items-center justify-between gap-2">
                  <span className="body-secondary font-medium text-center sm:body-2 text-black/75">
                    Cost per extra kilometre
                  </span>
                  <span className="heading-secondary font-bold">
                    {formatCurrencyToEuros(
                      Number(vehicleData.rental_rate.cost_per_km)
                    )}
                  </span>
                </div>
              </div>
            </div>

            {/* Safety */}
            <div className="py-4 border-b border-black/10">
              <p className="font-bold uppercase heading-5 mb-4">Safety</p>
              <div className="grid grid-cols-2 gap-y-8">
                {vehicleData?.specification &&
                  safetyKeys.map((key) => {
                    if (key in vehicleData.specification) {
                      const value =
                        vehicleData.specification[
                          key as keyof VehicleSpecification
                        ];
                      if (value === "true") {
                        return (
                          <p
                            key={key}
                            className="flex items-center gap-2">
                            <BookMarkIcon />
                            <span className="body-alt">
                              {formatSafetySpec(key)}
                            </span>
                          </p>
                        );
                      } else if (value === "false") {
                        return (
                          <p
                            key={key}
                            className="flex items-center gap-2">
                            <BookMarkIcon />
                            <span className="body-alt">
                              {formatSafetySpec(`No ${key}`)}
                            </span>
                          </p>
                        );
                      }
                    }
                    return null;
                  })}
              </div>
            </div>

            {/* Specifications */}
            <div className="py-4 border-b border-black/10">
              <p className="font-bold uppercase heading-5 mb-4">
                Specifications
              </p>
              <div className="grid grid-cols-2 gap-y-8">
                <p className="flex items-center gap-2 ">
                  <BookMarkIcon />
                  <span className="body-alt">
                    {vehicleData.specification.interior_color} Interior
                  </span>
                </p>
                <p className="flex items-center gap-2">
                  <BookMarkIcon />
                  <span className="body-alt">
                    {vehicleData.specification.exterior_color} Exterior
                  </span>
                </p>
                <p className="flex items-center gap-2">
                  <BookMarkIcon />
                  <span className="body-alt">
                    {vehicleData.specification.interior_material}
                  </span>
                </p>
              </div>
            </div>

            {/* Features */}
            <div className="py-4 border-b border-black/10">
              <p className="font-bold uppercase heading-5 mb-4">Features</p>
              <div className="grid grid-cols-2 gap-y-8">
                {/* Display feature items from array */}
                {vehicleData?.travel_feature.features.map((item) => (
                  <p
                    key={item.id}
                    className="flex items-center gap-2">
                    <BookMarkIcon />
                    <span className="body-alt">{item.name}</span>
                  </p>
                ))}

                {/* Display true boolean features */}
                {vehicleData?.travel_feature &&
                  Object.entries(vehicleData.travel_feature)
                    .filter(
                      ([key, value]) =>
                        [
                          "travel_abroad_allowed",
                          "smoking_allowed",
                          "pets_allowed",
                          "festival_allowed",
                        ].includes(key) && value === "true"
                    )
                    .map(([key]) => (
                      <p
                        key={key}
                        className="flex items-center gap-2">
                        <BookMarkIcon />
                        <span className="body-alt">
                          {formatTravelFeature(key)}
                        </span>
                      </p>
                    ))}

                {/* Display false boolean features */}
                {vehicleData?.travel_feature &&
                  Object.entries(vehicleData.travel_feature)
                    .filter(
                      ([key, value]) =>
                        [
                          "travel_abroad_allowed",
                          "smoking_allowed",
                          "pets_allowed",
                          "festival_allowed",
                        ].includes(key) && value === "false"
                    )
                    .map(([key]) => (
                      <p
                        key={key}
                        className="flex items-center gap-2">
                        <BookMarkIcon />
                        <span className="body-alt">
                          No {formatTravelFeature(key)}
                        </span>
                      </p>
                    ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Submit Button */}
        <div className="col-span-12 md:col-span-4 h-fit sticky top-24">
          <div className="flex flex-col items-center justify-center p-6 rounded-md bg-black/5">
            <GradientButton
              title="Submit for approval"
              onClick={() => {
                openModal("preview-submission-modal", {
                  title: vehicleData.title,
                });
                setBookingId(vehicleData.id);
                setBookingImage(vehicleData.images[0].image);
              }}>
              Submit for approval
            </GradientButton>
            <Button
              onClick={() => router.push("/form")}
              className="bg-transparent shadow-none border-none text-black/80 body-2 font-semibold mt-3 hover:bg-white/10 hover:scale-105 transition-all duration-300">
              Back
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Collapsible Sections */}
      <MobileCollapsibleSections vehicleData={vehicleData} />

      {/* Availability Section */}
      <AvailabilitySection
        unavailabilityPeriods={vehicleData.unavailability_period}
      />
    </section>
  );
}

"use client";

import useCustomQuery from "@/hooks/mutations/useCustomQuery";
import { getSingleVehicleListing } from "@/services/dashboard";
import { ArrowLeftIcon, MapPin, Share } from "lucide-react";
import { use, useEffect } from "react";
import { useRouter } from "next/navigation";
import VehicleImageCarousel from "../../_components/VehicleImageCarousel";
import { Divider } from "@mantine/core";
import StarIcon from "@/components/icons/StarIcon";
import BookMarkIcon from "@/components/icons/BookMarkIcon";
import CollapsibleSection from "./components/CollapsibleSection";
import HostedByCard from "./components/HostedBy";
import RentalSummaryCard from "@/components/RentalSummaryCard";
import VehicleSpecificationsAndDetails from "./components/VehicleSpecificationsAndDetails";
import { useModal } from "@/providers/ModalContext";
import ReviewBookingRequest from "./components/ReviewBookingRequest";
import { useBookingStore } from "@/store/bookingStore";
import ErrorState from "@/app/(dashboard)/dashboard/_components/ErrorState";
import VehicleDetailsSkeleton from "../../_components/VehicleDetailsSkeleton";

interface VehicleDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function VehicleDetailsPage({
  params,
}: VehicleDetailsPageProps) {
  const router = useRouter();
  const { id } = use(params);
  const { openModal } = useModal();
  const { finalPage, setFinalPage, setBookingId, setBookingImage } = useBookingStore();

  const { data, isError, isLoading } = useCustomQuery(
    ["Single vehicle listing", id],
    () => getSingleVehicleListing(id)
  );

  useEffect(() => {
    if (data) {
      setBookingId(data.id);
      setBookingImage(data.images[0]?.image[0] || '');
    }
  }, [data, setBookingId, setBookingImage]);

  const handleOpenDateModal = () => {
    if (!data) return;

    openModal("dates-modal", {
      unavailability: data.unavailability,
      minDays: data.rental_rate.min_trip_duration,
      maxDays: data.rental_rate.max_trip_duration,
      advanceNotice: data.rental_rate.advance_notice,
    });
  };

  const handleBookingReview = () => {
    setFinalPage(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isError) {
    return <ErrorState message="Error loading vehicle details" />;
  }

  if (isLoading) {
    return <VehicleDetailsSkeleton />;
  }

  if (finalPage) {
    return <ReviewBookingRequest id={id} />;
  }

  return (
    <div className="flex flex-col py-3 px-4 pb-10" id="all-vehicles-page">
      <div
        className="flex gap-2 items-center cursor-pointer md:hidden "
        onClick={() => router.back()}>
        <ArrowLeftIcon className="w-4 h-4" />
        <p>Back</p>
      </div>
      <div className="pt-6 pb-8">
        {data && (
          <VehicleImageCarousel
            height="h-[22.5625rem] lg:h-[28.8125rem]"
            data={data}
          />
        )}
      </div>

      <div className="grid grid-cols-12 w-full gap-10">
        <div className="col-span-12 md:col-span-7">
          <div>
            <div>
              <div className="bg-[#F9F7DE] rounded-md p-2.5 w-max">
                <p className="body-3 text-black/80">
                  This Vehicle is roadworthy
                </p>
              </div>
              <div>
                <p className="heading-3 font-bold py-2">
                  {data?.make.name} {data?.model.name} {data?.year}
                </p>
              </div>
              <div className="flex items-center gap-2 body-2 text-black/80">
                <span>{data?.type.name}</span>
                <Divider
                  orientation="vertical"
                  className="h-6 border bg-black/10 border-black/10 w-[2px]"
                />

                <span>{data?.make.name}</span>
                <Divider
                  orientation="vertical"
                  className="h-6 border bg-black/10 border-black/10 w-[2px]"
                />
                <span>{data?.year}</span>
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
              <div className="flex items-center gap-1.5 body-secondary border-b border-black/10 pb-16">
                <MapPin className="size-4" />
                <span>{data?.location}</span>
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
          {/* description */}
          <div className="py-4 pt-12 space-y-4 pb-16">
            <p className="heading-5 font-bold text-black/80">Description</p>
            <p className="body-2 text-black/80 font-light">{data?.description}</p>
          </div>

          {/* driver requirements */}
          <div className="py-4 border-y pt-8 border-black/10">
            <p className="font-bold  uppercase heading-5 pb-4 text-black/80">
              Driver requirements
            </p>
            <div className="flex items-center gap-4 pb-16">
              <p className="body-2 font-bold text-black/80">License category</p>
              <p className="capitalize body-2 font-light ">
                {data?.travel_feature.driver_license_category}
              </p>
            </div>
          </div>

          {/* HIDE ON MOBILE */}
          <div className="hidden md:block">
            {data && <VehicleSpecificationsAndDetails data={data} />}
          </div>
        </div>

        {/* Right sidebar - sticky on desktop */}
        <div className="hidden md:block md:col-span-5 h-fit sticky top-24">
          {data && <HostedByCard data={data} />}
          {data && (
            <RentalSummaryCard
              data={data}
              onOpenDateModal={handleOpenDateModal}
              onBookingReview={handleBookingReview}
            />
          )}
        </div>
      </div>

      {/* collapsibles, these will be hidden on desktop */}
      {data && <CollapsibleSection data={data} />}
      {data && (
        <div className="block md:hidden">
          <HostedByCard data={data} />
        </div>
      )}
      {data && (
        <div className="block md:hidden">
          <RentalSummaryCard
            data={data}
            onOpenDateModal={handleOpenDateModal}
            onBookingReview={handleBookingReview}
          />
        </div>
      )}
    </div>
  );
}

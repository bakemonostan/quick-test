"use client";
import React, { useState } from "react";
import Shell from "@/components/Shell";
import { Button } from "@/components/ui/button";
import { ReviewsTabs } from "./ReviewsTabs";
import Link from "next/link";
import { CarouselApi } from "@/components/ui/carousel";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

export default function ReviewSection() {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();

  const handleCarouselApiChange = (api: CarouselApi) => {
    setCarouselApi(api);
  };

  const handlePrevious = () => {
    if (carouselApi) {
      carouselApi.scrollPrev();
    }
  };

  const handleNext = () => {
    if (carouselApi) {
      carouselApi.scrollNext();
    }
  };

  return (
    <section
      id="reviews"
      className="flex-1 flex-center bg-gradient-to-r from-[#AD75E2]/10 to-[#FFCB4E]/15  py-16 lg:py-[120px] px-3 sm:px-0">
      <Shell>
        <p className="heading-3 text-center pb-16">
          Real Experiences from Kaparki Users
        </p>
        <div className="mx-5">
          <ReviewsTabs onCarouselApiChange={handleCarouselApiChange} />
          <div className="pt-5 flex justify-between items-center">
            <Button
              variant="cta"
              className="w-max">
              <Link
                href="/all-vehicles"
                className="button-text">
                Browse Vehicles
              </Link>
            </Button>
            <div className="flex gap-2">
              <Button
                onClick={handlePrevious}
                variant="outline"
                size="icon"
                className="rounded-full size-10 flex items-center justify-center border-black/60 bg-transparent">
                <ChevronLeftIcon className="h-5 w-5 text-black/60" />
              </Button>
              <Button
                onClick={handleNext}
                variant="outline"
                size="icon"
                className="rounded-full size-10 flex items-center justify-center border-black/60 bg-transparent">
                <ChevronRightIcon className="h-5 w-5 text-black/60" />
              </Button>
            </div>
          </div>
        </div>
      </Shell>
    </section>
  );
}

"use client";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import classes from "@/components/Form/styles/RangeDatePicker.module.css";
import { DatePicker } from "@mantine/dates";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

interface AvailabilitySectionProps {
  unavailabilityPeriods: Array<{
    from: string;
    to: string;
  }>;
}

export default function AvailabilitySection({
  unavailabilityPeriods,
}: AvailabilitySectionProps) {
  return (
    <div className="w-full">
      <div className="flex justify-between">
        <div className="flex items-center gap-4 w-full justify-between pb-6">
          <div className="text-black/80 w-full">
            <div className="flex items-center justify-between w-full pb-4">
              <p className="font-bold uppercase heading-5">Availability</p>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full text-black">
                  <ChevronLeft className="size-6 text-black" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full text-black">
                  <ChevronRight className="size-6 text-black" />
                </Button>
              </div>
            </div>
            <p className="text-black/80 body-2 font-normal">
              This vehicle is not available for booking on the marked days
            </p>
          </div>
        </div>
      </div>

      <Carousel className="w-full">
        <CarouselContent>
          {unavailabilityPeriods?.map((period, index) => (
            <CarouselItem
              key={index}
              className="w-full basis-1/3">
              <div className="bg-black/5 border-none shadow-none rounded-xl flex justify-center items-center relative">
                <div className="absolute top-0 left-0 w-full h-full bg-none"></div>
                <div className="flex flex-col justify-between py-4 lg:aspect-[1/1]">
                  <DatePicker
                    classNames={classes}
                    type="range"
                    hideOutsideDates
                    value={[
                      new Date(period.from.replace(/\//g, "-")),
                      new Date(period.to.replace(/\//g, "-")),
                    ]}
                    defaultDate={new Date(period.from.replace(/\//g, "-"))}
                  />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}

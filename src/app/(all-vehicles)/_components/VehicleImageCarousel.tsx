/* eslint-disable @next/next/no-img-element */
import { useState, useEffect, useCallback } from "react";
import { Vehicle as VehicleType } from "@/types/dashboard";
import { Vehicle as AllVehicleType } from "@/types/allVehicles";
import { EmblaCarouselType } from "embla-carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface VehicleImageCarouselProps {
  data: VehicleType | AllVehicleType;
  withControls?: boolean;
  withIndicators?: boolean;
  draggable?: boolean;
  height?: string;
}

export default function VehicleImageCarousel({
  data,
  withControls = true,
  withIndicators = true,
  height = "h-[22.5625rem] lg:h-[14.75rem]",
}: VehicleImageCarouselProps) {
  // Determine the images to use based on the vehicle type
  const images =
    "images" in data ? data.images : "image" in data ? data.image : [];

  const [embla, setEmbla] = useState<EmblaCarouselType | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!embla) return;
    setSelectedIndex(embla.selectedScrollSnap());
  }, [embla]);

  const onApiChange = useCallback((api: EmblaCarouselType | undefined) => {
    if (api) setEmbla(api);
  }, []);

  useEffect(() => {
    if (!embla) return;

    embla.on("select", onSelect);
    onSelect();

    return () => {
      embla.off("select", onSelect);
    };
  }, [embla, onSelect]);

  return (
    <div className="relative">
      <Carousel setApi={onApiChange}>
        <CarouselContent>
          {images.map((img) => (
            <CarouselItem key={img.id}>
              <img
                src={img.image}
                alt={`${data.make} ${data.model}`}
                className={`object-cover ${height} w-full rounded-xl`}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        {withControls && (
          <>
            <CarouselPrevious
              iconClassName="text-white"
              className="translate-y-0 left-2.5 z-50 size-6 bg-black/20 border-none hover:bg-black/30"
            />
            <CarouselNext
              iconClassName="text-white"
              className="translate-y-0 right-2.5 z-50 size-6 bg-black/20 border-none hover:bg-black/30"
            />
          </>
        )}
        {withIndicators && images.length > 1 && (
          <div className="flex gap-2 justify-center absolute bottom-4 left-0 right-0 z-10">
            {images.map((_, index) => (
              <button
                key={index}
                type="button"
                className={`h-2 rounded-full bg-white transition-all ${
                  index === selectedIndex ? "w-4 bg-white" : "w-2 bg-white/60"
                }`}
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => embla?.scrollTo(index)}
              />
            ))}
          </div>
        )}
      </Carousel>
    </div>
  );
}

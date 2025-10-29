/* eslint-disable */
"use client";
import { Button } from "@/components/ui/button";
import { useCallback, useEffect, useState } from "react";
import { MoveLeft, MoveRight } from "lucide-react";
import { EmblaCarouselType } from "embla-carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
interface PreviewCarouselProps {
  images: Array<{
    id: string;
    image: string;
  }>;
}

export default function PreviewCarousel({ images }: PreviewCarouselProps) {
  const [vehicleEmbla, setVehicleEmbla] = useState<EmblaCarouselType | null>(
    null
  );
  const [vehiclePrevBtnEnabled, setVehiclePrevBtnEnabled] = useState(false);
  const [vehicleNextBtnEnabled, setVehicleNextBtnEnabled] = useState(false);

  const onApiChange = useCallback((api: EmblaCarouselType | undefined) => {
    if (api) setVehicleEmbla(api);
  }, []);

  const scrollVehiclePrev = useCallback(
    () => vehicleEmbla && vehicleEmbla.scrollPrev(),
    [vehicleEmbla]
  );
  const scrollVehicleNext = useCallback(
    () => vehicleEmbla && vehicleEmbla.scrollNext(),
    [vehicleEmbla]
  );

  useEffect(() => {
    if (vehicleEmbla) {
      const onSelect = () => {
        setVehiclePrevBtnEnabled(vehicleEmbla.canScrollPrev());
        setVehicleNextBtnEnabled(vehicleEmbla.canScrollNext());
      };

      vehicleEmbla.on("select", onSelect);
      onSelect();

      return () => {
        vehicleEmbla.off("select", onSelect);
      };
    }
  }, [vehicleEmbla]);

  return (
    <div className="flex flex-col items-center rounded-2xl pt-6 relative">
      <Carousel
        className="w-full"
        setApi={onApiChange}>
        <CarouselContent>
          {images.map((item) => (
            <CarouselItem key={item.id}>
              <div>
                <img
                  src={item.image}
                  alt=""
                  className="object-cover w-full aspect-[1/1] sm:aspect-[2/1] rounded-2xl"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="absolute bottom-4 right-4 flex gap-4 z-10">
        <Button
          variant="outline"
          size="icon"
          onClick={scrollVehiclePrev}
          disabled={!vehiclePrevBtnEnabled}
          className="rounded-full bg-white/30 hover:bg-white/10 size-10">
          <MoveLeft className="text-white size-fit" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={scrollVehicleNext}
          disabled={!vehicleNextBtnEnabled}
          className="rounded-full bg-white/30 hover:bg-white/10 size-10">
          <MoveRight className="text-white size-fit" />
        </Button>
      </div>
    </div>
  );
}

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Image } from "@mantine/core";
import React, { useState, useCallback, useEffect } from "react";
import cn from "classnames";
import { EmblaCarouselType } from "embla-carousel";

interface ImageCarouselProps {
  images: string[];
  arrowType?: "chevron" | "arrow";
  className?: string;
  withIndicators?: boolean;
}
export default function ImageCarousel({
  images,
  arrowType = "chevron",
  className,
  withIndicators = true,
}: ImageCarouselProps) {
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
          {images.map((image) => (
            <CarouselItem key={image}>
              <Image
                src={image}
                alt="Carousel Image"
                h={400}
                radius="lg"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious
          iconType={arrowType}
          iconClassName="size-5"
          className={cn("absolute left-2 size-10", className)}
        />
        <CarouselNext
          iconType={arrowType}
          iconClassName="size-5"
          className={cn("absolute right-2 size-10", className)}
        />
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

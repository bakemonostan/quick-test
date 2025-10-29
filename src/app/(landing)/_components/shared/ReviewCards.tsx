/* eslint-disable @next/next/no-img-element */
"use client";
import { useMounted } from "@mantine/hooks";
import { Avatar, Card, CardSection, Skeleton } from "@mantine/core";
import StarIcon from "@/components/icons/StarIcon";
import { ChevronDownIcon } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";

export function Reviews({
  onApiChange,
}: {
  onApiChange?: (api: CarouselApi) => void;
}) {
  const mounted = useMounted();
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (api && onApiChange) {
      onApiChange(api);
    }
  }, [api, onApiChange]);

  return !mounted ? (
    <div className="flex gap-4">
      <Skeleton
        h={327.71}
        w={350}
      />
      <Skeleton
        h={327.71}
        w={350}
      />
      <Skeleton
        h={327.71}
        w={350}
      />
    </div>
  ) : (
    <div className="relative">
      <Carousel
        className="relative"
        opts={{
          dragFree: false,
          watchDrag: false,
        }}
        setApi={setApi}>
        <CarouselContent>
          {Array.from({ length: 7 }).map((_, index) => (
            <CarouselItem
              key={index}
              draggable={false}
              className="basis-1/3">
              <Card
                className="bg-white border"
                radius={"lg"}>
                <CardSection className="p-4">
                  <div className="flex flex-col">
                    <div className="pb-6">
                      <div className="flex">
                        <Avatar size={32} />
                        <div className="w-full pl-2">
                          <p className="flex justify-between items-center">
                            <span className="body-3 font-semibold pb-[1.5px]">
                              John Doe
                            </span>
                            <span className="flex items-center">
                              <StarIcon className="w-[13px] h-[12.77px] pl-0.5" />
                              <span className="body-2 font-bold">3.8</span>/
                              <span className="body-2 font-semibold">5</span>
                            </span>
                          </p>
                          <p className="body-4 font-light flex gap-1 items-center">
                            4x guest on Kaparki{" "}
                            <span className="size-1 bg-black/60 block rounded-full"></span>{" "}
                            Joined Sept 2023
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <p className="body-2 font-normal pb-4">
                        Hallo Daar, pasgeleden hebben wij deze fantastische
                        camper gekocht. We zijn van plan er vele mooie reiz...
                      </p>
                    </div>
                    <div className="pb-6">
                      <p className="body-3 font-semibold underline flex gap-1">
                        Read more{" "}
                        <span>
                          <ChevronDownIcon className="size-3.5 mt-0.5" />
                        </span>
                      </p>
                    </div>

                    <div className="pb-6">
                      <Carousel className="w-full">
                        <CarouselContent className="gap-0.5 -ml-1">
                          {Array.from({ length: 10 }).map((_, index) => (
                            <CarouselItem
                              key={index}
                              className="basis-1/3 pl-1 cursor-pointer">
                              <img
                                src="/images/car-image-hero.jpg"
                                alt="Review 1"
                                className="w-full h-[3.482rem] object-cover aspect-square rounded-lg "
                              />
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                      </Carousel>
                    </div>
                    <p className="body-3 text-black/75 pb-3.5">
                      Reviewed by Maurice - Aug 2024
                    </p>
                  </div>
                </CardSection>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}

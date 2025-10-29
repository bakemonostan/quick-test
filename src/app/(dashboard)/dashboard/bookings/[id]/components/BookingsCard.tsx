import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { BookingDetailsData } from "@/types/dashboard";
import { BadgeCheck } from "lucide-react";
import React from "react";

interface BookingsCardProps {
  data: BookingDetailsData;
}

export default function BookingsCard({ data }: BookingsCardProps) {
  return (
      <Card className="sticky top-24">
        <CardHeader className="px-3">
          <p className="font-bold text-center">Hosted by</p>
          <div className="flex items-center gap-2">
            <Avatar className="size-12">
              <AvatarImage
                src={
                  data?.vehicle?.host_by?.profile_picture ||
                  "https://picsum.photos/200/300"
                }
                alt="Host"
              />
              <AvatarFallback>HB</AvatarFallback>
            </Avatar>
            <p className="flex flex-col text-black/70">
              <span className="font-bold">{data?.vehicle?.host_by?.name}</span>
              <span className="text-xs">{data?.vehicle?.host_by?.joined}</span>
            </p>
          </div>
        </CardHeader>
        <CardContent className="px-3">
          <p className="flex items-center gap-1">
            <span>
              <BadgeCheck
                size={20}
                className="text-black"
                fill="currentColor"
                stroke="white"
              />
            </span>
            <span>Verified</span>
          </p>
          <p className="flex items-center gap-1">
            <span>
              <BadgeCheck
                size={20}
                className="text-black"
                fill="currentColor"
                stroke="white"
              />
            </span>
            <span>Hosted 4 times on Kaparki</span>
          </p>
          <p className="flex items-center gap-1">
            <span>
              <BadgeCheck
                size={20}
                className="text-black"
                fill="currentColor"
                stroke="white"
              />
            </span>
            <span>Save</span>
          </p>
          <div className="flex flex-col gap-2 pt-4">
            <Button
              className="w-full border-black rounded-2xl"
              variant="outline">
              <p className="font-bold">View Profile</p>
            </Button>
            <Button
              className="w-full border-black rounded-2xl"
              variant="ghost">
              <p className="font-bold text-black/70">Ask question</p>
            </Button>
          </div>
        </CardContent>
      </Card>
  );
}

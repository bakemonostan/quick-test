import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Vehicle } from "@/types/dashboard";
import { BadgeCheck } from "lucide-react";
import React from "react";

interface HostedByCardProps {
  data: Vehicle;
}

export default function HostedByCard({ data }: HostedByCardProps) {
  return (
    <div className="py-5">
      <Card className="sticky top-24">
        <CardHeader className="px-3">
          <p className="font-bold text-center">Hosted by</p>
          <div className="flex items-center gap-2">
            <Avatar className="size-[4.5rem]">
              <AvatarImage
                src={
                  data?.host?.profile_picture ||
                  "https://picsum.photos/200/300"
                }
                alt="Host"
              />
              <AvatarFallback>HB</AvatarFallback>
            </Avatar>
            <p className="flex flex-col text-black/70">
              <span className="body-2">{data?.host?.name}</span>
              <span className="text-xs">{data?.host?.joined}</span>
            </p>
          </div>
        </CardHeader>
        <CardContent className="px-3">
          <p className="flex items-center gap-1 font-semibold body-secondary">
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
          <p className="flex items-center gap-1 py-4 font-semibold body-secondary">
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
          <p className="flex items-center gap-1 font-semibold body-secondary">
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
              className="w-full border-black/20 shadow-none rounded-2xl"
              variant="outline">
              <p className="font-bold">View Profile</p>
            </Button>
            <Button
              className="w-full border-black rounded-2xl"
              variant="plain">
              <p className="font-bold text-black/70">Ask question</p>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

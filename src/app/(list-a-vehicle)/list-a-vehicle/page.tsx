/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import HeaderComponent from "@/app/(dashboard)/dashboard/_components/HeaderComponent";
import Shell from "@/components/Shell";
import { Divider } from "@mantine/core";
import React, { useEffect } from "react";
import PostalCodeForm from "./components/list-a-vehicle-forms/PostalCodeForm";
import { useVehicleListingStore } from "./vehicleListingstore";
import { usePathname } from "next/navigation";

export default function ListAVehiclePage() {
  const { resetStore } = useVehicleListingStore();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/list-a-vehicle") {
      resetStore();
    }
  },[]);

  return (
    <div className="pt-5">
      <Shell>
        <div className="max-w-[735px] mx-auto rounded-lg bg-white p-4">
          <HeaderComponent
            title="List a vehicle"
            subtitle="This will take about 10 mins. Have your vehicle photos and specifications ready."
            withSubtitle
          />
          <Divider className="my-8" />
          <PostalCodeForm />
    
        </div>
      </Shell>
    </div>
  );
}

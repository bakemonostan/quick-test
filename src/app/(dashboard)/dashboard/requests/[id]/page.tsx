"use client";

import React, { use } from "react";
import DashboardShell from "../../_components/DashboardShell";
import OverviewSideCard from "../../overview/_components/OverviewSideCard";
import HeaderComponent from "../../_components/HeaderComponent";
import { useQuery } from "@tanstack/react-query";
import { getSingleRequest } from "@/services/dashboard";
import { Divider } from "@mantine/core";
import RequestDetailsComponent from "./_components/RequestDetailsComponent";
import { RequestDetailsData } from "@/types/dashboard";
import RequestDetailsHostComponent from "./_components/RequestDetailsHostComponent";
import RequestDetailsDocuments from "./_components/RequestDetailsDocuments";
import RequestDetailsRates from "./_components/RequestDetailsRates";
import DashboardCardSkeleton from "../../_components/skeletons/DashboardCardSkeleton";
import DetailsPageSkeleton from "../../_components/skeletons/DetailsPageSkeleton";
interface RequestPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function RequestPage({ params }: RequestPageProps) {
  const { id } = use(params);
  const { data, isPending } = useQuery({
    queryKey: ["request", id],
    queryFn: () => getSingleRequest(id),
    enabled: !!id,
  });

  if (isPending) {
    return (
      <DashboardShell card={<DashboardCardSkeleton />}>
        <DetailsPageSkeleton withImageSlider={false} />
      </DashboardShell>
    );
  }

  return (
    <DashboardShell card={<OverviewSideCard />}>
      <div className="p-4">
        <HeaderComponent title="Request" />
      </div>
      <div className="flex gap-2">
        <p>{data?.vehicle.type.name}</p>
        <Divider
          orientation="vertical"
          className="bg-black/10 w-[2px]"
        />
        <p>{data?.vehicle.make.name}</p>
        <Divider
          orientation="vertical"
          className="bg-black/10 w-[2px]"
        />
        <p>{data?.vehicle.year}</p>
      </div>
      <RequestDetailsComponent data={data as RequestDetailsData} />
      <RequestDetailsHostComponent data={data as RequestDetailsData} />
      <div className="grid grid-cols-2 gap-2">
        <RequestDetailsDocuments data={data as RequestDetailsData} />
        <RequestDetailsRates data={data as RequestDetailsData} />
      </div>
    </DashboardShell>
  );
}

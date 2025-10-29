"use client";

import React from "react";
import DashboardShell from "../_components/DashboardShell";
import OverviewSideCard from "../overview/_components/OverviewSideCard";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./_components/listingsTableColums";
import { useQuery } from "@tanstack/react-query";
import { getUserListingTableData } from "@/services/dashboard";
import HeaderComponent from "../_components/HeaderComponent";
import TableSkeleton from "../_components/skeletons/TableSkeleton";
import DashboardCardSkeleton from "../_components/skeletons/DashboardCardSkeleton";
export default function ListingsPage() {
  const { data: TableData, isPending } = useQuery({
    queryKey: ["listings"],
    queryFn: getUserListingTableData,
  });

  return (
    <DashboardShell
      card={isPending ? <DashboardCardSkeleton /> : <OverviewSideCard />}>
      {isPending ? (
        <TableSkeleton />
      ) : (
        <div className="p-4">
          <div className="p-4">
            <HeaderComponent
              title="Your listed vehicles"
              subtitle="Manage your listed vehicles"
              withSubtitle
            />
          </div>
          <DataTable
            columns={columns}
            data={TableData || []}
          />
        </div>
      )}
    </DashboardShell>
  );
}

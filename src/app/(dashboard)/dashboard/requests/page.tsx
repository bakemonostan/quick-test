"use client";

import React from "react";
import DashboardShell from "../_components/DashboardShell";
import OverviewSideCard from "../overview/_components/OverviewSideCard";
import { useQuery } from "@tanstack/react-query";
import { getAllRequests } from "@/services/dashboard";
import { columns } from "./_components/RequestsTableColumns";
import { DataTable } from "@/components/ui/data-table";
import HeaderComponent from "../_components/HeaderComponent";
import DashboardCardSkeleton from "../_components/skeletons/DashboardCardSkeleton";
import TableSkeleton from "../_components/skeletons/TableSkeleton";
export default function RequestsPage() {
  const { data: TableData, isPending } = useQuery({
    queryKey: ["requests"],
    queryFn: getAllRequests,
  });

  if (isPending) {
    return (
      <DashboardShell card={<DashboardCardSkeleton />}>
        <TableSkeleton />
      </DashboardShell>
    );
  }
  return (
    <DashboardShell card={<OverviewSideCard />}>
      <div className="p-4">
        <HeaderComponent
          title="Your requests"
          subtitle="Manage your requests"
          withSubtitle
        />
      </div>
      <DataTable
        columns={columns}
        data={TableData || []}
      />
    </DashboardShell>
  );
}

import React from "react";
import DashboardShell from "../_components/DashboardShell";
import OverviewSideCard from "./_components/OverviewSideCard";
import OverviewContent from "./_components/OverviewContent";

export default function OverviewPage() {
  return (
    <DashboardShell card={<OverviewSideCard />}>
      <OverviewContent />
    </DashboardShell>
  );
}

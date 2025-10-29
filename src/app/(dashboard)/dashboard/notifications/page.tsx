import React from "react";
import DashboardShell from "../_components/DashboardShell";
import OverviewSideCard from "../overview/_components/OverviewSideCard";

export default function NotificationsPage() {
  return <DashboardShell card={<OverviewSideCard />}>hello</DashboardShell>;
}

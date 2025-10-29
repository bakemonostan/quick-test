import React from "react";
import DashboardShell from "../_components/DashboardShell";
import OverviewSideCard from "../overview/_components/OverviewSideCard";
import HeaderComponent from "../_components/HeaderComponent";
import MyAccountTabs from "./_components/MyAccountTabs";
export default function MyAccountPage() {
  return (
    <DashboardShell card={<OverviewSideCard />}>
      <HeaderComponent
        title="My Account"
        withSubtitle
        subtitle="Manage your account settings"
      />
      <div className="mt-4">
        <MyAccountTabs />
      </div>
    </DashboardShell>
  );
}

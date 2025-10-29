/* eslint-disable */
"use client";
import { Tabs, TabsList, TabsPanel, TabsTab } from "@mantine/core";
import PersonalDetails from "./PersonalDetails";
import ProfileTab from "./ProfileTab";
import Verification from "./Verification";
import { useEffect, useState } from "react";
import useCustomQuery from "@/hooks/mutations/useCustomQuery";
import { getUserDetails } from "@/services/dashboard";
import { useUserStore } from "@/store/userStore";
import DetailsPageSkeleton from "../../_components/skeletons/DetailsPageSkeleton";
interface Tab {
  value: string;
  label: string;
  component: React.ReactNode;
}

const tabs: Tab[] = [
  {
    value: "personal-details",
    label: "Personal Details",
    component: <PersonalDetails />,
  },
  {
    value: "profile",
    label: "Profile",
    component: <ProfileTab />,
  },
  {
    value: "verification",
    label: "Verification",
    component: <Verification />,
  },
];

export default function MyAccountTabs() {
  const [activeTab, setActiveTab] = useState(tabs[0].value);
  const { data, isSuccess, isLoading } = useCustomQuery(
    ["user-details"],
    getUserDetails
  );
  const { setDetails } = useUserStore();
  useEffect(() => {
    if (isSuccess && data?.data.data) {
      setDetails(data.data.data);
    }
  }, [isSuccess, data]);

  if (isLoading) {
    return <DetailsPageSkeleton />;
  }

  return (
    <Tabs
      color="black"
      value={activeTab}
      onChange={(value) => setActiveTab(value || tabs[0].value)}>
      <TabsList className=" w-3/4">
        {tabs.map((tab) => (
          <TabsTab
            key={tab.value}
            value={tab.value}
            className={`${
              activeTab === tab.value ? "border-b-2 border-black" : ""
            }`}>
            <span
              className={`body-2  ${
                activeTab === tab.value
                  ? "text-black/80 font-bold"
                  : "text-black/50"
              }`}>
              {tab.label}
            </span>
          </TabsTab>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsPanel
          key={tab.value}
          value={tab.value}>
          {tab.component}
        </TabsPanel>
      ))}
    </Tabs>
  );
}

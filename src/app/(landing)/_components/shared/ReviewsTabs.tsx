"use client";
import { REVIEW_TABS_DATA } from "@/app/contents/landing";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import { type CarouselApi } from "@/components/ui/carousel";

export function ReviewsTabs({
  onCarouselApiChange,
}: {
  onCarouselApiChange?: (api: CarouselApi) => void;
}) {
  const [activeTab, setActiveTab] = React.useState(REVIEW_TABS_DATA[0].value);

  const getContent = (tab: {
    content: React.ComponentType<{ onApiChange?: (api: CarouselApi) => void }>;
  }) => {
    const ContentComponent = tab.content;
    const WrappedComponent = () => (
      <ContentComponent onApiChange={onCarouselApiChange} />
    );
    WrappedComponent.displayName = `WrappedReviewContent(${
      ContentComponent.displayName || ContentComponent.name || "Component"
    })`;
    return WrappedComponent;
  };

  return (
    <Tabs
      defaultValue={REVIEW_TABS_DATA[0].value}
      className="w-full"
      onValueChange={setActiveTab}>
      <TabsList className="p-0 h-auto bg-transparent gap-3 mb-6">
        {REVIEW_TABS_DATA.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className="relative gradient-border transition-all duration-200">
            <span
              className={`gradient-border-inner py-4 px-6  bg-transparent rounded-full button-text ${
                activeTab === tab.value ? "bg-yellow-50 shadow-lg" : ""
              }`}>
              {tab.name}
            </span>
          </TabsTrigger>
        ))}
      </TabsList>

      {REVIEW_TABS_DATA.map((tab) => (
        <TabsContent
          key={tab.value}
          value={tab.value}>
          <div className="w-full">{getContent(tab)()}</div>
        </TabsContent>
      ))}
    </Tabs>
  );
}

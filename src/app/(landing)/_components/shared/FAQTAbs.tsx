import { FAQ_TABS } from "@/app/contents/landing";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";


export function FAQTabs() {
    const [activeTab, setActiveTab] = React.useState(FAQ_TABS[0].value);
  
    return (
      <Tabs
        defaultValue={FAQ_TABS[0].value}
        className="w-full"
        onValueChange={setActiveTab}
      >
        <TabsList className="p-0 h-auto bg-background gap-3 mx-auto pb-12">
          {FAQ_TABS.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="relative gradient-border transition-all duration-200"
            >
              <span
                className={`gradient-border-inner py-4 px-6  bg-white rounded-full button-text transition-all duration-200 ${
                  activeTab === tab.value ? "bg-yellow-50 shadow-lg" : ""
                }`}
              >
                {tab.name}
              </span>
            </TabsTrigger>
          ))}
        </TabsList>
  
        {FAQ_TABS.map((tab) => (
          <TabsContent key={tab.value} value={tab.value}>
            <div className=" w-full">{tab.content()}</div>
          </TabsContent>
        ))}
      </Tabs>
    );
  }
  
  
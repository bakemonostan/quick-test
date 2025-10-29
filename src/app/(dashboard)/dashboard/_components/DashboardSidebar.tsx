'use client'
import React from "react";
import { SidebarMenuItems } from "@/contents/sidebar";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChatBubbleIcon } from "@/components/icons";

const DashboardSidebar = () => {
  const pathname = usePathname();

  const isActive = (link: string) => {
    return pathname.includes(link);
  };

  return (
    <aside className="hidden bg-white border shadow-lg sm:block sm:sticky top-24 rounded-xl h-[745px] hide-sidebar">
      <nav>
        <ul className="space-y-2">
          {SidebarMenuItems.map((item, index) => (
            <React.Fragment key={index}>
              <li className="text-[#FFEDB5]">
                <Link
                  href={item.link}
                  className={`flex items-center p-4 text-gray-700 hover:bg-gradient-to-r from-[#FFEDB5]/15 to-[#DCC6F5]/5 transition-all duration-300 relative ${
                    isActive(item.link)
                      ? "bg-gradient-to-r from-[#FFEDB5]/40 to-[#DCC6F5]/10 text-[#FFEDB5]"
                      : ""
                  }`}
                >
                  {isActive(item.link) && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#FFCB4E] to-[#DDC7F2]" />
                  )}
                  <item.icon
                    className={`w-5 h-5 mr-3 ${
                      !isActive(item.link) ? "fill-white" : ""
                    }`}
                  />
                  <span className="text-black/60 body-2">{item.name}</span>
                  {item.notification && (
                    <span className="w-2 h-2 ml-auto bg-red-500 rounded-full" />
                  )}
                </Link>
              </li>
              {item.withDivider && (
                <li className="p-5 py-2 my-2">
                  <hr className="border-gray-200" />
                </li>
              )}
            </React.Fragment>
          ))}
        </ul>
        <div>
          <div className="px-4">
            <ChatBubbleIcon width={56} height={56} />
            <p className="body-1 font-extrabold">Need help?</p>
            <p className="text-black/60 body-3 pt-2 pb-4">
              Does something look wrong or perhaps you have suggestions?
            </p>
            <p className="body-2 font-medium">Contact us now</p>
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default DashboardSidebar;

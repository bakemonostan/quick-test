import React from "react";
import DashboardNavbar from "./dashboard/_components/DashboardNavbar";
import DashboardSidebar from "./dashboard/_components/DashboardSidebar";
import FooterComponent from "@/components/shared/Footer";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-black/10 min-h-screen flex flex-col">
      <DashboardNavbar />
      <div className="grid grid-cols-12 w-full pb-12 sm:p-5 lg:px-0 sm:gap-4 mx-auto lg:max-w-[79.5rem] flex-1">
        <aside className="hidden md:block md:col-span-2">
        <DashboardSidebar/>
        </aside>

        <main className="flex-grow col-span-12 md:col-span-10 md:rounded-xl sm:pb-10">
          <section className="grid grid-cols-12 gap-4 sm:mx-auto">
            {children}
          </section>
        </main>

        <footer className="fixed bottom-0 left-0 right-0 text-white sm:hidden">
          <FooterComponent />
        </footer>
      </div>
    </div>
  );
}

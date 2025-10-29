"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
interface DashboardShellProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  card: React.ReactNode;
}

export default function DashboardShell({
  children,
  className,
  card,
  ...rest
}: DashboardShellProps) {
  const pathname = usePathname();
  const isBookingDetailsPage = pathname.includes("bookings/");
  return (
    <>
      <div
        className={cn(
          `border w-full col-span-12  pb-12 sm:pb-5 ${
            isBookingDetailsPage ? "sm:col-span-9" : "sm:col-span-8"
          } h-screen sm:h-[745px] px-5 pt-5 sm:rounded-xl bg-white overflow-y-auto hide-scrollbar`,
          className
        )}
        {...rest}>
        {children}
      </div>
      <div
        className={cn(
          "w-full hidden sm:block col-span-4 sticky top-24 h-fit max-h-[calc(100vh-6rem)] overflow-y-auto",
          isBookingDetailsPage ? "col-span-3" : "col-span-4"
        )}>
        {card}
      </div>
    </>
  );
}


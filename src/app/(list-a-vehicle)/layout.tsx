import LandingNavbar from "@/app/(landing)/_components/shared/Navbar";
import React from "react";

export default function ListAVehicleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LandingNavbar />
      <main className="bg-black/5 min-h-screen overflow-y-auto">{children}</main>
    </>
  );
}

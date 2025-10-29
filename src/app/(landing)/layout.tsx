import React from "react";
import LandingNavbar from "./_components/shared/Navbar";
import { FAQ, ReviewSection } from "./_components";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen">
      <LandingNavbar />
      <div className="flex flex-col">
        <main className="flex-1 pb-16">
          {children}
          <ReviewSection />
          <FAQ />
        </main>
      </div>
    </div>
  );
}

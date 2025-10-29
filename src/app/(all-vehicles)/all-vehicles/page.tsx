"use client";

import { Suspense } from "react";
import AllVehiclesContent from "./_components/AllVehiclesContent";
import AllVehiclesSkeletonLoader from "../_components/AllVehiclesSkeletonLoader";

export default function AllVehiclesPage() {
  return (
    <Suspense
      fallback={
        <section className="mx-auto p-5 w-full lg:max-w-[79.5rem]">
          <div className="grid grid-cols-1 gap-5 py-4 lg:grid-cols-12">
            <div className="col-span-12 grid grid-cols-1 sm:grid-cols-12 gap-5">
              <AllVehiclesSkeletonLoader
                count={10}
                showSpinner={true}
              />
            </div>
          </div>
        </section>
      }>
      <section
        suppressHydrationWarning
        className="mx-auto p-5 w-full lg:max-w-[79.5rem]">
        <AllVehiclesContent />
      </section>
    </Suspense>
  );
}

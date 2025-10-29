import { Skeleton } from "@mantine/core";
import React from "react";

export default function DashboardCardSkeleton() {
  return (
    <div className="p-6 bg-white rounded-md min-h-[300px]">
      <Skeleton
        height={70}
        width={200}
        className="mx-auto"
      />
      <div className="flex flex-col gap-2 pt-3">
        <Skeleton
          height={90}
          className="mx-auto"
        />
        <Skeleton
          height={80}
          className="mx-auto"
        />
      </div>
    </div>
  );
}

import { Skeleton } from "@mantine/core";
import React from "react";

export default function OverviewSkeleton() {
  return (
    <div className="space-y-8">
      <Skeleton
        height={60}
        width="40%"
      />
      <div className="space-y-4">
        <Skeleton
          height={30}
          width="20%"
        />
        <div className="grid grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton
              key={index}
              height={200}
            />
          ))}
        </div>
      </div>
      <div className="space-y-4">
        <Skeleton
          height={30}
          width="20%"
        />
        <div className="grid grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton
              key={index}
              height={200}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

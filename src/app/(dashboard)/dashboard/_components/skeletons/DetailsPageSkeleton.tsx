import { Skeleton } from "@mantine/core";
import React from "react";

interface DetailsPageSkeletonProps {
  withImageSlider?: boolean;
}

export default function DetailsPageSkeleton({
  withImageSlider = false,
}: DetailsPageSkeletonProps) {
  return (
    <div>
      {withImageSlider && (
        <Skeleton
          height={400}
          className="rounded-md"
        />
      )}
      <div className="flex flex-col gap-4 pt-5">
        <Skeleton height={100} />
        <Skeleton height={100} />
      </div>
      <div className="flex flex-col gap-4 pt-5">
        <Skeleton height={150} />
      </div>
      <div className="grid grid-cols-2 gap-4 pt-5">
        <Skeleton height={250} />
        <Skeleton height={250} />
      </div>
    </div>
  );
}

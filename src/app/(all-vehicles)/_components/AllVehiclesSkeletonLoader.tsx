import { Skeleton } from "@mantine/core";
import { Loader2 } from "lucide-react";

type AllVehiclesSkeletonLoaderProps = {
  count?: number;
  showSpinner?: boolean;
};

export default function AllVehiclesSkeletonLoader({
  count = 6,
  showSpinner = true,
}: AllVehiclesSkeletonLoaderProps) {
  // Create an array with the specified count for rendering multiple skeleton cards
  const skeletons = Array.from({ length: count }, (_, i) => i);

  if (showSpinner) {
    return (
      <div className="col-span-full flex justify-center items-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading vehicles...</span>
      </div>
    );
  }

  return (
    <>
      {skeletons.map((index) => (
        <div
          key={index}
          className="w-full sm:col-span-6 lg:col-span-4 space-y-2">
            <Skeleton width={'100%'} height={200} />
            <Skeleton width={'100%'} height={60} />
            <Skeleton width={'100%'} height={40} />

        </div>
      ))}
    </>
  );
}

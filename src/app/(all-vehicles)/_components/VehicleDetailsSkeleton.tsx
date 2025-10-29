import { Skeleton } from "@mantine/core";

export default function VehicleDetailsSkeleton() {
  return (
    <div className="flex flex-col py-3 px-4 pb-10">
      <Skeleton height={500} width={"100%"} />
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 py-5">
        <div className="col-span-12 md:col-span-8">
          <Skeleton height={225} width={"100%"} />
        </div>
        <div className="col-span-12 md:col-span-4">
          <Skeleton height={225} width={"100%"} />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 py-5">
        <div className="col-span-12 md:col-span-8">
          <Skeleton height={225} width={"100%"} />
        </div>
        <div className="col-span-12 md:col-span-4">
          <Skeleton height={225} width={"100%"} />
        </div>
      </div>
    </div>
  );
}

import { Skeleton } from "@mantine/core";

export default function TableSkeleton() {
  return (
    <div className=" p-6">
      <Skeleton
        height={40}
        width={300}
      />
      <Skeleton
        height={30}
        width={200}
        className="mt-4"
      />
      <div className="py-5 flex flex-col gap-2">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="flex gap-2">
            <Skeleton height={50} />
            <Skeleton height={50} />
            <Skeleton height={50} />
            <Skeleton height={50} />
          </div>
        ))}
      </div>
    </div>
  );
}

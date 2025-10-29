import { RequestDetailsData } from "@/types/dashboard";
import { formatDate, getCircleClass, getStatusClass } from "@/utils/general";
import { Divider } from "@mantine/core";

interface RequestDetailsComponentProps {
  data: RequestDetailsData;
}

export default function RequestDetailsComponent({
  data,
}: RequestDetailsComponentProps) {
  return (
    <div>
      <div className="flex justify-center gap-3 py-4 mt-8 border-t border-b sm:gap-5 flex-wrap">
        <p className="flex gap-1 sm:gap-3 text-[#05603A]">
          <span>Status</span>
          <span
            className={`capitalize rounded-md flex items-center gap-1.5 px-2 p-0.5 ${getStatusClass(
              data?.status
            )}`}>
            <span
              className={`rounded-full size-2 ${getCircleClass(
                data?.status
              )}`}></span>
            <span className="text-[#05603A]">{data?.status}</span>
          </span>
        </p>
        <Divider
          orientation="vertical"
          className=" bg-black/10 w-[2px]"
        />
        <p className="flex gap-1 sm:gap-3">
          <span className="w-20 xl:w-max truncate">Rental dates:</span>
          <span className="w-20 truncate">
            {data?.vehicle?.unavailability_period?.[0]?.from
              ? new Date(
                  data.vehicle.unavailability_period[0].from
                ).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              : ""}{" "}
            - {formatDate(data?.vehicle?.unavailability_period?.[0]?.to)}
          </span>
        </p>
        <Divider
          orientation="vertical"
          className="bg-black/10 w-[2px]"
        />
        <p className="flex gap-1 sm:gap-3">
          <span>Delivery:</span>
          <span className="w-20 truncate">
            {data?.pick_up_instruction ?? "N/A"}
          </span>
        </p>
      </div>
    </div>
  );
}

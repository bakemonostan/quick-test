import { Avatar } from "@mantine/core";
import { ArrowRightIcon, Star } from "lucide-react";
import { RequestDetailsData } from "@/types/dashboard";

interface RequestDetailsHostComponentProps {
  data: RequestDetailsData;
}

export default function RequestDetailsHostComponent({
  data,
}: RequestDetailsHostComponentProps) {
  return (
    <div className="flex flex-col gap-2 bg-black/5 p-4 rounded-lg">
      <div className="flex gap-2 items-center">
        <div className="flex gap-2 items-center p-px border border-[#DBA806] rounded-full">
          <Avatar
            src={
              data?.host_profile.profile_picture ??
              "https://picsum.photos/200/300"
            }
            size="lg"
            radius="xl"
          />
        </div>
        <div>
          <p className="flex gap-1 items-center">
            <Star
              fill="#DBA806"
              size={16}
              stroke="#DBA806"
            />
            <span>{data?.host_profile.rating ?? "N/A"}</span>
          </p>
          <p>{data?.host_profile.name}</p>
        </div>
      </div>
      <div>
        <p className="flex gap-2 items-center">
          <span>View profile</span>
          <span>
            <ArrowRightIcon size={16} />
          </span>
        </p>
      </div>
      <div>
        <p>{data?.host_profile.bio}</p>
      </div>
    </div>
  );
}

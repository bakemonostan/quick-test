import { Settings } from "lucide-react";
import { ModalButton } from "@/components/ui/modal-button";
import { VehicleListingDetailsData } from "@/types/dashboard";
interface ListingsSideCardProps {
  listingId: string;
  data: VehicleListingDetailsData;
}

const ListingsSideCard = ({ listingId, data }: ListingsSideCardProps) => {
  return (
    <div className="bg-white rounded-xl p-5">
      <p className="flex items-center gap-2 border-b pb-2">
        <span>
          <Settings />
        </span>
        <span className="heading-6 uppercase font-bold">QUICK ACTIONS</span>
      </p>
      <p className="body-2 text-black/60 pt-8">
        View your ad as it appears to others. You can also make changes to your
        ad
      </p>
      <div className="flex items-center gap-2 pt-4 ">
        <ModalButton
          disabled={data?.status === "review"}
          variant="outline"
          className="text-black w-full rounded-2xl border-black/40"
          modalId="listings"
          modalParams={{ listingId: listingId }}>
          <span>
            {data?.status === "active"
              ? "Pause Ad"
              : data?.status === "review"
              ? "Under review"
              : "Resume Ad"}
          </span>
        </ModalButton>
        {/* <Button variant="outline">
          <span>Delete Ad</span>
        </Button> */}
      </div>
    </div>
  );
};

export default ListingsSideCard;

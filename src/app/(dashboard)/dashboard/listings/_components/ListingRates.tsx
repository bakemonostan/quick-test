import { formatCurrencyToEuros } from "@/utils/general";
import { BookIcon, Trash2Icon } from "lucide-react";    
import { Separator } from "@/components/ui/separator";
import { VehicleListingDetailsData } from "@/types/dashboard";

const ListingRates = ({ data }: { data: VehicleListingDetailsData }) => {
  return (
    <div>
      <div className="grid gap-5 mt-4 sm:grid-cols-2">
        <div className="order-2 p-2 sm:order-1">
          <p>Activity</p>
          <p className="flex gap-1.5 sm:gap-5 items-center py-6">
            <span>
              <BookIcon />
            </span>
            <span className="font-bold cursor-pointer">Booking History</span>
          </p>
          <Separator
            orientation="horizontal"
            className="border"
          />
          <p className="flex gap-1.5 sm:gap-5items-center text-red-500 py-6">
            <span>
              <Trash2Icon />
            </span>
            <span className="font-bold cursor-pointer">Delete this ad</span>
          </p>
        </div>
        <div className="order-1 p-2 border rounded-md sm:p-3 sm:order-2">
          <p className="pb-5">Rates</p>
          <div className="flex flex-col">
            <div className="space-y-3 text-base">
              <p className="flex justify-between">
                <span>Rental fee per day</span>
                <span className="font-bold">
                  {formatCurrencyToEuros(Number(data?.daily_rate))}
                </span>
              </p>
              <p className="flex justify-between">
                <span>Required deposit</span>
                <span className="font-bold">
                  {formatCurrencyToEuros(Number(data?.security_deposit))}
                </span>
              </p>
              <p className="flex justify-between">
                <span>Cleaning fee</span>
                <span className="font-bold">{data?.cleaning_fee ?? "-"}</span>
              </p>
            </div>
          </div>
          <div className="py-4 pt-6">
            <p className="font-bold">Edit my rates</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingRates;

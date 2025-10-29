import GradientButton from "@/components/GradientButton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type AllVehiclesHeaderProps = {
  totalVehicles: number;
  perPage: string;
  onPerPageChange: (value: string) => void;
  onShowAllVehicles: () => void;
};

export default function AllVehiclesHeader({
  totalVehicles,
  perPage,
  onPerPageChange,
  onShowAllVehicles,
}: AllVehiclesHeaderProps) {
  return (
    <div className="flex col-span-full justify-between items-center py-8 flex-wrap">
      <div className="flex items-center gap-4 w-full justify-center md:justify-between flex-wrap">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Per page:</span>
          <Select
            value={perPage}
            onValueChange={onPerPageChange}>
            <SelectTrigger className="w-[80px]">
              <SelectValue placeholder="10" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1</SelectItem>
              <SelectItem value="2">2</SelectItem>
              <SelectItem value="3">3</SelectItem>
              <SelectItem value="6">6</SelectItem>
              <SelectItem value="9">9</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <h2 className="font-extrabold heading-3">{`${totalVehicles} vehicle(s) found`}</h2>

        <GradientButton
          title="Show All Vehicles"
          onClick={onShowAllVehicles}
        />
      </div>
    </div>
  );
}

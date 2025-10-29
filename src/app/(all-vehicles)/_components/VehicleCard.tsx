import { Vehicle } from "@/types/allVehicles";
import { Camera } from "lucide-react";
import { formatCurrencyToEuros } from "@/utils/general";
import VehicleImageCarousel from "./VehicleImageCarousel";
import Link from "next/link";

export default function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  return (
    <div className="group cursor-pointer rounded-2xl">
          <div className="relative">
        <Link href={`/all-vehicles/${vehicle.id}`} className="absolute inset-0 z-10 block" aria-hidden="true" tabIndex={-1} />
        <VehicleImageCarousel data={vehicle} />
      </div>
      <div>
        <div >
          <p className="pt-2 header-4 font-bold py-1">{`${vehicle.title} `}</p>
          <p className="flex gap-2.5 items-center py-2 body-3 font-light text-black/60">
            <span>{vehicle.location}</span>
            <span className="bg-black/60 rounded-full size-1"></span>
            <span>{vehicle.fuel_type}</span>
            <span className="bg-black/60 rounded-full size-1"></span>
            <span>{vehicle.gear_box}</span>
          </p>
          <p className="flex flex-wrap gap-3 items-center py-2 text-sm">
            <span className="flex gap-2 items-center body-3 font-normal text-black/60">
              <Camera className="size-4 text-black" />
              {vehicle.transmission}
            </span>
            <span className="flex gap-2 items-center body-3 font-normal text-black/60">
              <Camera className="size-4 text-black" />
              {vehicle.vehicle_type}
            </span>
          </p>
          <p>
            <span className="body-1 font-extrabold text-black/80">
              {formatCurrencyToEuros(Number(vehicle.daily_rate))}
            </span>
            <span className="body-3 font-light text-black/60"> per day</span>
          </p>
        </div>
      </div>
    </div>
  )
}

import { useVehicleListingStore } from "../vehicleListingstore";

export default function VehicleDetailsComponent() {
  const store = useVehicleListingStore();
  
  return (
    <div className="pt-8 pb-3">
      <div>
        {store.selectedVehicleType && (
          <p className="grid grid-cols-2 pb-3 border-b">
            <span className="font-bold">Type</span>
            <span className="text-right text-black/50">{store.selectedVehicleType}</span>
          </p>
        )}
        
        <div className="flex justify-between py-3 border-b">
          <p className="text-sm font-bold sm:text-base">
            <span className="font-bold">Year/</span>
            <span className="font-bold">Make/</span>
            <span className="font-bold">Model</span>
          </p>
          <p className="text-black/50">
            {store.formOneValue.year && `${store.formOneValue.year}/`}
            {store.formOneValue.make && `${store.formOneValue.make}/`}
            {store.formOneValue.model && store.formOneValue.model}
          </p>
        </div>
        
        {store.formOneValue.fuel_type && (
          <p className="grid grid-cols-2 py-3 border-b">
            <span className="font-bold">Fuel type</span>
            <span className="text-right text-black/50">
              {store.formOneValue.fuel_type}
            </span>
          </p>
        )}
      </div>
    </div>
  );
}

import { Vehicle, VehicleSpecification } from "@/types/dashboard";
import { formatCurrencyToEuros } from "@/utils/general";
import BookMarkIcon from "@/components/icons/BookMarkIcon";
import { formatSpecLabel, formatSafetySpec, formatTravelFeature, generalSpecKeys, safetyKeys } from "./content";

export default function VehicleSpecificationsAndDetails({data}: {data: Vehicle}) {
  return (
    <div className=" hidden md:block">
      {/* Rules Section */}
      <div className="border-b pt-8 pb-16 border-black/10">
        <p className="font-bold uppercase heading-5 mb-4 text-black/80">Rules</p>
        <div className="space-y-5">
          <div className="flex items-center gap-24">
            <p className="flex flex-col gap-3 body-2 font-bold text-black/80 capitalize">
              <span>Travel abroad?</span>
              <span>Who can drive?</span>
              <span>Vehicle care rules</span>
            </p>
            <p className="flex flex-col gap-3 body-2 font-light text-black/80">
              <span>
                {data?.travel_feature.travel_abroad_allowed ? "Yes" : "No"}
              </span>
              <span>{data?.travel_feature.who_can_drive}</span>
              <span>{data?.travel_feature.rule}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Specifications Section */}
      <div className="border-b border-black/10 pt-8 pb-16">
        <p className="font-bold uppercase heading-5 mb-4 text-black/80">Specifications</p>
        <div className="space-y-5">
          <div className="grid grid-cols-2 gap-y-6">
            {data?.specification &&
              generalSpecKeys.map((key) => {
                if (key in data.specification) {
                  const value = data.specification[key as keyof VehicleSpecification];
                  if (value) {
                    return (
                      <div key={key} className="flex flex-col">
                        <p className="body-2 font-semibold">
                          {formatSpecLabel(key)}
                        </p>
                        <p className="body-2 text-black/80 max-w-4/5">
                          {value.toString()}
                        </p>
                      </div>
                    );
                  }
                }
                return null;
              })}
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="border-b border-black/10 pt-8 pb-16">
        <p className="font-bold uppercase heading-5 mb-4">Pricing</p>
        <div className="space-y-5">
          <div className="grid grid-cols-3 py-4 rounded-md bg-black/5 min-h-[6.625rem]">
            <div className="flex flex-col items-center justify-between gap-2">
              <span className="body-secondary font-medium text-center sm:text-sm text-black/75">
                Rental rate per day
              </span>
              <span className="heading-secondary font-bold">
                {formatCurrencyToEuros(Number(data?.rental_rate.daily_rate))}
              </span>
            </div>
            <div className="flex flex-col items-center justify-between gap-2 border-x-2 border-black/5">
              <span className="body-secondary font-medium text-center sm:body-2 text-black/75">
                Kilometer per day
              </span>
              <span className="heading-secondary font-bold">
                {data?.rental_rate.max_trip_duration}km
              </span>
            </div>
            <div className="flex flex-col items-center justify-between gap-2">
              <span className="body-secondary font-medium text-center sm:body-2 text-black/75">
                Cost per extra kilometre
              </span>
              <span className="heading-secondary font-bold">
                {formatCurrencyToEuros(Number(data?.rental_rate.cost_per_km))}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="border-b border-black/10 pt-8 pb-16">
        <p className="font-bold uppercase heading-5 mb-4">Features</p>
        <div className="grid grid-cols-2 gap-y-8">
          {/* Display feature items from array */}
          {data?.travel_feature.features.map((item) => (
            <p key={item.id} className="flex items-center gap-2">
              <BookMarkIcon />
              <span className="body-alt">{item.name}</span>
            </p>
          ))}

          {/* Display true boolean features */}
          {data?.travel_feature &&
            Object.entries(data.travel_feature)
              .filter(
                ([key, value]) =>
                  [
                    "travel_abroad_allowed",
                    "smoking_allowed",
                    "pets_allowed",
                    "festival_allowed",
                  ].includes(key) && value === "true"
              )
              .map(([key]) => (
                <p key={key} className="flex items-center gap-2">
                  <BookMarkIcon />
                  <span className="body-alt">{formatTravelFeature(key)}</span>
                </p>
              ))}

          {/* Display false boolean features */}
          {data?.travel_feature &&
            Object.entries(data.travel_feature)
              .filter(
                ([key, value]) =>
                  [
                    "travel_abroad_allowed",
                    "smoking_allowed",
                    "pets_allowed",
                    "festival_allowed",
                  ].includes(key) && value === "false"
              )
              .map(([key]) => (
                <p key={key} className="flex items-center gap-2">
                  <BookMarkIcon />
                  <span className="body-alt">No {formatTravelFeature(key)}</span>
                </p>
              ))}
        </div>
      </div>

      {/* Safety Section */}
      <div className="border-b border-black/10 pt-8 pb-16">
        <p className="font-bold uppercase heading-5 mb-4">Safety</p>
        <div className="grid grid-cols-2 gap-y-8">
          {data?.specification &&
            safetyKeys.map((key) => {
              if (
                key in data.specification &&
                data.specification[key as keyof VehicleSpecification] === "true"
              ) {
                return (
                  <p key={key} className="flex items-center gap-2">
                    <BookMarkIcon />
                    <span className="body-alt max-w-4/5">{formatSafetySpec(key)}</span>
                  </p>
                );

              }else if (
                key in data.specification &&
                data.specification[key as keyof VehicleSpecification] === "false"
              ) {
                return (
                  <p key={key} className="flex items-center gap-2">
                    <BookMarkIcon />
                    <span className="body-alt max-w-4/5">{formatSafetySpec(`No ${key}`)}</span>
                  </p>
                );
              }
              return null;
            })}
        </div>
      </div>

      {/* Reviews Section */}
      <div className="pt-8 pb-16">
        <p className="font-bold uppercase heading-5 mb-4">Reviews</p>
        <div className="flex flex-col items-center justify-center py-6">
          <p className="body-2 text-black/60">No reviews yet</p>
        </div>
      </div>
    </div>
  );
}

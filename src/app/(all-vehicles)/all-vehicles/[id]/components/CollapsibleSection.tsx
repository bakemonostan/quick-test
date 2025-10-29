import { useDisclosure } from "@mantine/hooks";
import { MinusSquare, PlusSquare } from "lucide-react";
import { Vehicle, VehicleSpecification } from "@/types/dashboard";
import { formatCurrencyToEuros } from "@/utils/general";
import BookMarkIcon from "@/components/icons/BookMarkIcon";
import { Collapse } from "@mantine/core";
import { formatSpecLabel, formatSafetySpec, formatTravelFeature, generalSpecKeys, safetyKeys } from "./content";
export default function CollapsibleSection({data}: {data: Vehicle}) {
    const [opened, { toggle: toggleRules }] = useDisclosure(false);
    const [opened2, { toggle: toggleTravelOptions }] = useDisclosure(false);
    const [featuresOpened, { toggle: toggleFeatures }] = useDisclosure(false);
    const [safetyOpened, { toggle: toggleSafety }] = useDisclosure(false);
    const [specsOpened, { toggle: toggleSpecs }] = useDisclosure(false);
    const [reviewsOpened, { toggle: toggleReviews }] = useDisclosure(false);
  

  return (
    <div className="py-4 block md:hidden">
    <div className="py-4 border-b border-black/10">
      <div className="flex items-center justify-between gap-2 pb-4">
      <p className="font-bold  uppercase heading-5 text-black/80">Rules</p>
      <p onClick={toggleRules}>
        {opened ? (
          <MinusSquare className="size-4" />
        ) : (
          <PlusSquare className="size-4" />
        )}
      </p>
    </div>
    <Collapse
      in={opened}
      transitionTimingFunction="linear">
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
    </Collapse>
  </div>
    {/* specifications */}
    <div className="py-4 border-b border-black/10">
      <div className="flex items-center justify-between gap-2 pb-4">
        <p className="font-bold uppercase heading-5 text-black/80">Specifications</p>
        <p onClick={toggleSpecs}>
          <PlusSquare className="size-4" />
        </p>
      </div>
      <Collapse
        in={specsOpened}
        transitionTimingFunction="linear">
        <div className="space-y-5">
          <div className="grid grid-cols-2 gap-y-6">
            {data?.specification &&
              generalSpecKeys.map((key) => {
                // Check if the key exists in the specification object and has a value
                if (key in data.specification) {
                  const value =
                    data.specification[key as keyof VehicleSpecification];
                  if (value) {
                    return (
                      <div
                        key={key}
                        className="flex flex-col">
                        <p className="body-2 font-semibold text-black/80">
                          {formatSpecLabel(key)}
                        </p>
                        <p className="body-2 text-black/80">
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
      </Collapse>
    </div>

    {/* pricing */}
    <div className="py-4 border-b border-black/10">
      <div className="flex items-center justify-between gap-2 pb-4">
        <p className="font-bold  uppercase heading-5 text-black/80">Pricing</p>
        <p onClick={toggleTravelOptions}>
          <PlusSquare className="size-4" />
        </p>
      </div>
      <Collapse
        in={opened2}
        transitionTimingFunction="linear">
        <div className="space-y-5">
          <div className="grid grid-cols-3 py-4 rounded-md bg-black/5 min-h-[6.625rem]">
            <div className="flex flex-col items-center justify-between gap-2">
              <span className="body-secondary font-medium text-center sm:text-sm text-black/75">
                Rental rate per day
              </span>
              <span className="heading-secondary font-bold">
                {formatCurrencyToEuros(
                  Number(data?.rental_rate.daily_rate)
                )}
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
                {formatCurrencyToEuros(
                  Number(data?.rental_rate.cost_per_km)
                )}
              </span>
            </div>
          </div>
        </div>
      </Collapse>
    </div>

    {/* features */}
    <div className="py-4 border-b border-black/10">
      <div className="flex items-center justify-between gap-2 pb-6">
        <p className="font-bold uppercase heading-5 text-black/80">Features</p>
        <p onClick={toggleFeatures}>
          <PlusSquare className="size-4" />
        </p>
      </div>
      <Collapse
        in={featuresOpened}
        transitionTimingFunction="linear">
        <div className="grid grid-cols-2 gap-y-8">
          {/* Display feature items from array */}
          {data?.travel_feature.features.map((item) => (
            <p
              key={item.id}
              className="flex items-center gap-2">
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
                <p
                  key={key}
                  className="flex items-center gap-2">
                  <BookMarkIcon />
                  <span className="body-alt">
                    {formatTravelFeature(key)}
                  </span>
                </p>
              ))}
        </div>
      </Collapse>
    </div>

    {/* safety */}
    <div className="py-4 border-b border-black/10">
      <div className="flex items-center justify-between gap-2 pb-6">
        <p className="font-bold uppercase heading-5 text-black/80">Safety</p>
        <p onClick={toggleSafety}>
          <PlusSquare className="size-4" />
        </p>
      </div>
      <Collapse
        in={safetyOpened}
        transitionTimingFunction="linear">
        <div className="grid grid-cols-2 gap-y-8">
          {data?.specification &&
            safetyKeys.map((key) => {
              if (
                key in data.specification &&
                data.specification[key as keyof VehicleSpecification] ===
                  "true"
              ) {
                return (
                  <p
                    key={key}
                    className="flex items-center gap-2">
                    <BookMarkIcon />
                    <span className="body-alt max-w-[10rem]">
                      {formatSafetySpec(key)}
                    </span>
                  </p>
                );
              }
              return null;
            })}
        </div>
      </Collapse>
    </div>

    {/* reviews */}
    <div className="py-4">
      <div className="flex items-center justify-between gap-2 pb-6">
        <p className="font-bold uppercase heading-5 text-black/80">Reviews</p>
        <p onClick={toggleReviews}>
          <PlusSquare className="size-4" />
        </p>
      </div>
      <Collapse
        in={reviewsOpened}
        transitionTimingFunction="linear">
        <div className="flex flex-col items-center justify-center py-6">
          <p className="body-2 text-black/60">No reviews yet</p>
        </div>
      </Collapse>
    </div>
  </div>
  )
}

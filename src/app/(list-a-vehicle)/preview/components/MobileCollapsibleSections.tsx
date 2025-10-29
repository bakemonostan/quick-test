"use client";
import { useDisclosure } from "@mantine/hooks";
import { Collapse } from "@mantine/core";
import { MinusSquare, PlusSquare } from "lucide-react";
import BookMarkIcon from "@/components/icons/BookMarkIcon";
import { VehicleData } from "@/app/(list-a-vehicle)/list-a-vehicle/types";
import {
  formatSafetySpec,
  formatTravelFeature,
  safetyKeys,
} from "@/app/(all-vehicles)/all-vehicles/[id]/components/content";
import { VehicleSpecification } from "@/types/dashboard";

interface MobileCollapsibleSectionsProps {
  vehicleData: VehicleData;
}

export default function MobileCollapsibleSections({
  vehicleData,
}: MobileCollapsibleSectionsProps) {
  const [rulesOpened, { toggle: toggleRules }] = useDisclosure(false);
  const [pricingOpened, { toggle: togglePricing }] = useDisclosure(false);
  const [featuresOpened, { toggle: toggleFeatures }] = useDisclosure(false);
  const [safetyOpened, { toggle: toggleSafety }] = useDisclosure(false);
  const [specsOpened, { toggle: toggleSpecs }] = useDisclosure(false);

  const formatCurrencyToEuros = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "EUR",
    }).format(amount);
  };

  return (
    <div className="py-4 block md:hidden">
      {/* Rules Section */}
      <div className="py-4 border-b border-black/10">
        <div className="flex items-center justify-between gap-2 pb-4">
          <p className="font-bold  uppercase heading-5 text-black/80">Rules</p>
          <p onClick={toggleRules}>
            {rulesOpened ? (
              <MinusSquare className="size-4" />
            ) : (
              <PlusSquare className="size-4" />
            )}
          </p>
        </div>
        <Collapse
          in={rulesOpened}
          transitionTimingFunction="linear">
          <div className="space-y-5">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <p className="body-2 font-bold text-black/80 capitalize">
                  Travel abroad?
                </p>
                <p className="body-2 font-light text-black/80">
                  {vehicleData?.travel_feature.travel_abroad_allowed
                    ? "Yes"
                    : "No"}
                </p>
              </div>

              <div className="flex flex-col gap-1">
                <p className="body-2 font-bold text-black/80 capitalize">
                  Who can drive?
                </p>
                <p className="body-2 font-light text-black/80">
                  {vehicleData?.travel_feature.who_can_drive}
                </p>
              </div>

              <div className="flex flex-col gap-1">
                <p className="body-2 font-bold text-black/80 capitalize">
                  Vehicle care rules
                </p>
                <p className="body-2 font-light text-black/80">
                  {vehicleData?.travel_feature.rule}
                </p>
              </div>
            </div>
          </div>
        </Collapse>
      </div>

      {/* Specifications */}
      <div className="py-4 border-b border-black/10">
      <div className="flex items-center justify-between gap-2 pb-4">
          <p className="font-bold uppercase heading-5 text-black/80">Specifications</p>
          <p onClick={toggleSpecs}>
            {specsOpened ? (
              <MinusSquare className="size-4" />
            ) : (
              <PlusSquare className="size-4" />
            )}
          </p>
        </div>
        <Collapse
          in={specsOpened}
          transitionTimingFunction="linear">
          <div className="grid grid-cols-2 gap-y-8">
            <p className="flex items-center gap-2 ">
              <BookMarkIcon />
              <span className="body-alt">
                {vehicleData.specification.interior_color} Interior
              </span>
            </p>
            <p className="flex items-center gap-2">
              <BookMarkIcon />
              <span className="body-alt">
                {vehicleData.specification.exterior_color} Exterior
              </span>
            </p>
            <p className="flex items-center gap-2">
              <BookMarkIcon />
              <span className="body-alt">
                {vehicleData.specification.interior_material}
              </span>
            </p>
          </div>
        </Collapse>
      </div>

      {/* Pricing */}
      <div className="py-4 border-b border-black/10">
        <div className="flex items-center justify-between gap-2 pb-4">
          <p className="font-bold uppercase heading-5 text-black/80">Pricing</p>
          <p onClick={togglePricing}>
            {pricingOpened ? (
              <MinusSquare className="size-4" />
            ) : (
              <PlusSquare className="size-4" />
            )}
          </p>
        </div>
        <Collapse
          in={pricingOpened}
          transitionTimingFunction="linear">
          <div className="space-y-5">
            <div className="grid grid-cols-3 py-4 rounded-md bg-black/5 min-h-[6.625rem]">
              <div className="flex flex-col items-center justify-between gap-2">
                <span className="body-secondary font-medium text-center sm:text-sm text-black/75">
                  Rental rate per day
                </span>
                <span className="body-1 font-bold">
                  {formatCurrencyToEuros(
                    Number(vehicleData.rental_rate.daily_rate)
                  )}
                </span>
              </div>
              <div className="flex flex-col items-center justify-between gap-2 border-x-2 border-black/5">
                <span className="body-secondary font-medium text-center sm:body-2 text-black/75">
                  Kilometer per day
                </span>
                <span className="body-1 font-bold">
                  {vehicleData.rental_rate.max_trip_duration}km
                </span>
              </div>
              <div className="flex flex-col items-center justify-between gap-2">
                <span className="body-secondary font-medium text-center sm:body-2 text-black/75">
                  Cost per extra kilometre
                </span>
                <span className="body-1 font-bold">
                  {formatCurrencyToEuros(
                    Number(vehicleData.rental_rate.cost_per_km)
                  )}
                </span>
              </div>
            </div>
          </div>
        </Collapse>
      </div>

      {/* Features */}
      <div className="py-4 border-b border-black/10">
      <div className="flex items-center justify-between gap-2 pb-6">
          <p className="font-bold uppercase heading-5 text-black/80">Features</p>
          <p onClick={toggleFeatures}>
            {featuresOpened ? (
              <MinusSquare className="size-4" />
            ) : (
              <PlusSquare className="size-4" />
            )}
          </p>
        </div>
        <Collapse
          in={featuresOpened}
          transitionTimingFunction="linear">
          <div className="grid grid-cols-2 gap-y-8">
            {/* Display feature items from array */}
            {vehicleData?.travel_feature.features.map((item) => (
              <p
                key={item.id}
                className="flex items-center gap-2">
                <BookMarkIcon />
                <span className="body-alt">{item.name}</span>
              </p>
            ))}

            {/* Display true boolean features */}
            {vehicleData?.travel_feature &&
              Object.entries(vehicleData.travel_feature)
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
                    <span className="body-alt max-w-4/5">
                      {formatTravelFeature(key)}
                    </span>
                  </p>
                ))}

            {/* Display false boolean features */}
            {vehicleData?.travel_feature &&
              Object.entries(vehicleData.travel_feature)
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
                  <p
                    key={key}
                    className="flex items-center gap-2">
                    <BookMarkIcon />
                    <span className="body-alt max-w-4/5">
                      No {formatTravelFeature(key)}
                    </span>
                  </p>
                ))}
          </div>
        </Collapse>
      </div>

      {/* Safety */}
      <div className="py-4 border-b border-black/10">
        <div className="flex items-center justify-between gap-2 pb-4">
          <p className="font-bold uppercase heading-5 text-black/80">Safety</p>
          <p onClick={toggleSafety}>
            {safetyOpened ? (
              <MinusSquare className="size-4" />
            ) : (
              <PlusSquare className="size-4" />
            )}
          </p>
        </div>
        <Collapse
          in={safetyOpened}
          transitionTimingFunction="linear">
          <div className="grid grid-cols-2 gap-y-8">
            {vehicleData?.specification &&
              safetyKeys.map((key) => {
                if (key in vehicleData.specification) {
                  const value =
                    vehicleData.specification[
                      key as keyof VehicleSpecification
                    ];
                  if (value === "true") {
                    return (
                      <p
                        key={key}
                        className="flex items-center gap-2">
                        <BookMarkIcon />
                        <span className="body-alt max-w-4/5">
                          {formatSafetySpec(key)}
                        </span>
                      </p>
                    );
                  } else if (value === "false") {
                    return (
                      <p
                        key={key}
                        className="flex items-center gap-2">
                        <BookMarkIcon />
                        <span className="body-alt max-w-4/5">
                          {formatSafetySpec(`No ${key}`)}
                        </span>
                      </p>
                    );
                  }
                }
                return null;
              })}
          </div>
        </Collapse>
      </div>
    </div>
  );
}

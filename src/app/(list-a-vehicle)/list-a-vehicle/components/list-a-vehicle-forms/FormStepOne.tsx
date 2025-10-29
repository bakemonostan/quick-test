/* eslint-disable @next/next/no-img-element */
"use client";
import { useVehicleListingStore } from "@/app/(list-a-vehicle)/list-a-vehicle/vehicleListingstore";
import { useCategories } from "@/hooks/hooks";
import { useModal } from "@/providers/ModalContext";
import VehicleDetailsComponent from "../VehicleDetailsComponent";
import MultistepFormButtons from "./MultistepFormButtons";
import { useMutation } from "@tanstack/react-query";
import { submitVehicleDetails } from "@/services/vehicleListing";
import { toast } from "sonner";
import { VehicleDetailsFormData } from "@/types/vehicleListingForm";

export default function FormStepOne() {
  const { categoryData, isLoading } = useCategories();
  const store = useVehicleListingStore();
  const { openModal } = useModal();



  const { isPending, mutate } = useMutation({
    mutationKey: ['submit vehicle listing'],
    mutationFn: submitVehicleDetails,
    onSuccess: (data) => {
      toast.success("Success", { description: "Listing created successfully" });
      if (data.data?.data?.id) {
        store.setListingId(data.data.data.id);
      }
      store.setCurrentStep(2);
    },
    onError: (error) => {
      toast.error("Error", { description: error.message });
    }
  });

  const onBackClick = () => {
    store.setCurrentStep(1);
    store.setIsStepOneComplete(false);
    openModal("vehicle-type-modal");
  }


  const onSubmit = () => {

    const updatedData = {
      ...store.formOneValue,
      category: store.categoryId,
      make: store.ids.makeId,
      state: store.address.state,
      city: store.address.city,
      country: store.address.country,
      postal_code: store.address.postal_code,
      model: store.ids.modelId,
      type: store.ids.typeId,
      location: store.address.city
    }
    store.setIsStepOneComplete(true)
    const { city, state, country, postal_code } = store.address;
    const payload = {
      ...updatedData,
      city,
      state,
      country,
      postal_code
    };
    mutate(payload as unknown as VehicleDetailsFormData)
  }

  const handleCategorySelect = (cardName: string) => {
    store.setSelectedVehicleType(cardName);
    openModal("vehicle-type-modal");
  };

  
  return (
    <div>
      <form className="pb-7 space-y-5">
        <p className="font-bold uppercase">Choose a vehicle category</p>

        {!isLoading && categoryData ? (
          <ul className="grid grid-cols-2 gap-5 md:grid-cols-3">
            {categoryData?.map((card) => (
              <div
                key={card.id}
                className={`
                  cursor-pointer flex flex-col items-center text-wrap justify-center border rounded-md bg-black/5 aspect-[3/2]
                  ${
                    store.selectedVehicleType === card.name
                      ? "border-yellow-300 text-gray-600 bg-gray-50"
                      : "text-gray-500 hover:text-gray-600 hover:bg-gray-50"
                  }
                  ${store.isStepOneComplete ? "pointer-events-none" : ""}
                `}
                onClick={() => handleCategorySelect(card.name)}>
                <li>
                  <input
                    type="radio"
                    id={card.id}
                    value={card.name}
                    checked={store.selectedVehicleType === card.name}
                    onChange={() => handleCategorySelect(card.name)}
                    className="hidden"
                  />
                  <label htmlFor={card.name}>
                    <p className="flex flex-col items-center text-center text-wrap">
                      {card.image && (
                        <img
                          src={card.image}
                          className="size-20 sm:size-auto"
                          alt={card.name}
                        />
                      )}
                      <span className="text-xs sm:text-base">{card.name}</span>
                    </p>
                  </label>
                </li>
              </div>
            ))}
          </ul>
        ) : (
          <ul className="grid grid-cols-2 gap-5 md:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="border rounded-md bg-gray-100 aspect-[3/2]"></div>
            ))}
          </ul>
        )}
        {/* Display vehicle details component if step one is complete */}
        {store.isStepOneComplete && (
          <div>
            <VehicleDetailsComponent />
          </div>
        )}
        {store.isStepOneComplete && (
          <MultistepFormButtons
            type="button"
            onBackClick={onBackClick}
            onContinueClick={onSubmit}
            currentStep={1}
            totalSteps={6}
            isSubmitting={isPending}
          />
        )}
      </form>
    </div>
  );
}

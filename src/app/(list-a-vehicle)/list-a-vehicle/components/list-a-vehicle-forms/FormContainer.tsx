"use client";
import { useVehicleListingStore } from "../../vehicleListingstore";
import FormStepOne from "./FormStepOne";
import MultiFormHeader from "./MultiformHeader";
import FormStepTwo from "./FormStepTwo";
import FormStepThree from "./FormStepThree";
import FormStepFour from "./FormStepFour";
import FormStepSix from "./FormStepSix";
import FormStepFive from "./FormStepFive";
export default function FormContainer() {
  const { currentStep } = useVehicleListingStore();

  return (
    <div>
      <MultiFormHeader />
      {currentStep === 1 && <FormStepOne />}
      {currentStep === 2 && <FormStepTwo />}
      {currentStep === 3 && <FormStepThree />}
      {currentStep === 4 && <FormStepFour />}
      {currentStep === 5 && <FormStepFive />}
      {currentStep === 6 && <FormStepSix />}
    </div>
  );
}

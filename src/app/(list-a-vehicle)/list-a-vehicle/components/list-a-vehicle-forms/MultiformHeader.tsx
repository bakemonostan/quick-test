"use client";
import { Separator } from "@/components/ui/separator";
import { useVehicleListingStore } from "../../vehicleListingstore";
import { useRouter } from "next/navigation";
export default function MultiFormHeader() {
  const { currentStep, totalSteps, resetStore } = useVehicleListingStore();
  const router = useRouter();

  const handleStartOver = () => {
    resetStore();
    router.push("/list-a-vehicle");
  };

  return (
    <div className="p-3 mb-3 rounded-md bg-black/5">
      <h1 className="pb-2 text-lg font-bold">List your vehicle on Kaparki</h1>
      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
        <div className="flex items-center justify-between w-full gap-4 sm:w-max">
          <p className="text-sm">Step {currentStep} of {totalSteps}</p>
          <Separator orientation="vertical" className="h-6 border border-gray-400" />
          <p className="text-xs sm:text-base">Next: More about your vehicle</p>
        </div>
        <div className="relative block h-3 bg-white rounded-2xl sm:hidden">
          <div
            className="absolute h-3 bg-gradient-to-r  from-[#FFCB4E] to-[#AD75E2] rounded-2xl"
            style={{width: `${(currentStep / totalSteps) * 100}%`}}
          ></div>
        </div>
        <div className="flex items-center justify-between w-full gap-4 sm:w-max">
          <span
            className="underline cursor-pointer"
            onClick={handleStartOver}
          >
            Start Over
          </span>
        </div>
      </div>
      <div className="relative hidden h-3 mt-2 bg-white rounded-2xl sm:block">
        <div
          className="absolute h-3 bg-gradient-to-r  from-[#FFCB4E] to-[#AD75E2] rounded-2xl"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        ></div>
      </div>
    </div>
  );
}

/* eslint-disable */
"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useVehicleListingStore } from "../../vehicleListingstore";
import MultistepFormButtons from "./MultistepFormButtons";
import { Form } from "@/components/ui/form";
import {
  TextInput,
  RadioInput,
  SelectInput,
} from "@/components/Form/FormFields";
import { FormStepFiveSchema, FormStepFiveSchemaType } from "../../schema";
import {
  driverOptions,
  formFiveRadioOptions,
  licensingOptions,
} from "@/app/(list-a-vehicle)/form/form.content";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { handlePost } from "@/utils/general";
import { toast } from "sonner";

export default function FormStepFive() {
  const { setCurrentStep, formFiveValue, setFormFiveValue, listingId } =
    useVehicleListingStore();

  // Prepare default values for the form
  const prepareDefaultValues = () => {
    const defaultValues: Partial<FormStepFiveSchemaType> = {
      ...formFiveValue,
    };

    // List of fields that need to be converted from boolean to string
    const booleanFields = [
      "travel_abroad_allowed",
      "smoking_allowed",
      "pets_allowed",
      "festival_allowed",
    ] as const;

    // Convert boolean values to strings for radio inputs
    booleanFields.forEach((field) => {
      if (defaultValues[field] !== undefined) {
        (
          defaultValues as Record<string, string | boolean | number | undefined>
        )[field] = defaultValues[field] === true ? "true" : "false";
      }
    });

    return defaultValues;
  };

  const form = useForm<FormStepFiveSchemaType>({
    resolver: zodResolver(FormStepFiveSchema),
    defaultValues: prepareDefaultValues(),
  });

  // Update form when external value changes
  useEffect(() => {
    const values = prepareDefaultValues();
    Object.keys(values).forEach((key) => {
      const value = values[key as keyof FormStepFiveSchemaType];
      if (value !== undefined) {
        form.setValue(key as keyof FormStepFiveSchemaType, value);
      }
    });
  }, [formFiveValue, form]);

  const { mutate: submitForm, isPending } = useMutation({
    mutationKey: ["add travel features"],
    mutationFn: (data: FormStepFiveSchemaType) =>
      handlePost(`/vehicle/travel-features/${listingId}`, data),
    onSuccess: () => {
      setFormFiveValue(form.getValues());
      setCurrentStep(6);
      toast.success("Travel features updated successfully");
    },
    onError: (error) => {
      toast.error("Failed to update travel features. Please try again.");
      console.error("Submission error:", error);
    },
  });

  const onSubmit = (data: FormStepFiveSchemaType) => {
    submitForm(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="pt-8">
          <div className="space-y-1">
            <h1 className="header-l font-bold">Set some rules for renters</h1>
            <p className="text-black/80 body-2">
              It&apos;s your vehicle after all. Let renters know how best to
              take care of your vehicle
            </p>
          </div>
        </div>

        <div className="py-5 space-y-5">
          <p className="text-black/80 body-2 font-bold uppercase">
            General Rules
          </p>
          <div className="w-full pt-0 space-y-6 sm:w-1/2">
            <RadioInput
              name="smoking_allowed"
              control={form.control}
              labelText="Smoking allowed?"
              options={formFiveRadioOptions}
            />

            <RadioInput
              name="pets_allowed"
              control={form.control}
              labelText="Pets allowed?"
              options={formFiveRadioOptions}
            />

            <RadioInput
              name="travel_abroad_allowed"
              control={form.control}
              labelText="Going abroad allowed?"
              options={formFiveRadioOptions}
            />

            <RadioInput
              name="festival_allowed"
              control={form.control}
              labelText="Festivals/partying allowed?"
              options={formFiveRadioOptions}
            />
          </div>

          <div className="w-full space-y-6 sm:w-1/2">
            <TextInput
              name="minimum_age"
              control={form.control}
              label="Minimum age restriction"
              placeholder="Put a minimum age (18+)"
              type="number"
              min={18}
            />

            <SelectInput
              name="driver_category"
              control={form.control}
              labelText="Who can drive the vehicle?"
              items={driverOptions}
              placeholder="Select driver category"
            />

            <SelectInput
              name="driver_license"
              control={form.control}
              labelText="Mandatory driver's license required to drive"
              items={licensingOptions}
              placeholder="Select license type"
            />
          </div>

          <div className="space-y-6 pt-4">
            <TextInput
              name="rule"
              control={form.control}
              labelClass="!text-black/70 !header-6 !font-bold !uppercase !pb-4"
              label="Additional rules or information for renters"
              placeholder="E.g, No over speeding allowed. Always check water before starting engine"
              className="h-[5.625rem]"
              isTextArea={true}
            />

            <TextInput
              name="pick_up_instruction"
              control={form.control}
              label="Pick up and return instructions for your guest"
              labelClass="!text-black/70 !header-6 !font-bold !uppercase !pb-4"
              placeholder="e.g Return before 3pm"
              className="h-[5.625rem]"
              isTextArea={true}
            />
          </div>
        </div>

        <MultistepFormButtons
          currentStep={5}
          totalSteps={6}
          isSubmitting={isPending}
          onBackClick={() => setCurrentStep(4)}
          onContinueClick={form.handleSubmit(onSubmit)}
        />
      </form>
    </Form>
  );
}

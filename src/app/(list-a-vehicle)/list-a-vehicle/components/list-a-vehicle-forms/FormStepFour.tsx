"use client";
import { useVehicleListingStore } from "../../vehicleListingstore";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Plus, Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormStepFourSchema, type FormStepFourSchemaType } from "../../schema";
import MultistepFormButtons from "./MultistepFormButtons";
import {
  NumberInputWithCurrency,
  TextInput,
} from "@/components/Form/FormFields";
import {
  calculatePriceAfterVat,
  calculateVat,
  formatDate,
  handlePost,
} from "@/utils/general";
import { useEffect } from "react";
import {
  fieldItems,
  radioGroupLabels,
  radioGroupDisplayLabels,
} from "@/app/(list-a-vehicle)/form/form.content";
import { useModal } from "@/providers/ModalContext";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export default function FormStepFour() {
  const store = useVehicleListingStore();
  const { openModal } = useModal();

  const form = useForm<FormStepFourSchemaType>({
    resolver: zodResolver(FormStepFourSchema),
    defaultValues: {
      instant_bookings: false,
    },
  });

  const { mutate: submitForm, isPending } = useMutation({
    mutationFn: (data: FormStepFourSchemaType) =>
      handlePost(`/vehicle/rental-fee/${store.listingId}`, data),
    onSuccess: () => {
      store.setFormFourValue(form.getValues());
      store.setCurrentStep(5);
      toast.success("Rental fees updated successfully");
    },
    onError: (error) => {
      toast.error("Ensure all fields are filled correctly", {
        description: error.message,
      });
    },
  });

  useEffect(() => {
    if (store.formFourValue) {
      form.reset(store.formFourValue);
    }
  }, [form, store.formFourValue]);

  const onSubmit = (data: FormStepFourSchemaType) => {
    const formattedBlockedDates = store.blockedDates?.map((period) => ({
      from: formatDate(period.from, "Y/m/d"),
      to: formatDate(period.to, "Y/m/d"),
    }));

    submitForm({
      ...data,
      blocked_period: formattedBlockedDates,
    });
  };

  // Handle delete of blocked period
  const deleteDate = (index: number) => {
    const currentPeriods = form.getValues("blocked_period") || [];
    const updatedPeriods = currentPeriods.filter((_, i) => i !== index);
    form.setValue("blocked_period", updatedPeriods);

    const currentFormValues = store.blockedDates || [];
    store.setBlockedDates(currentFormValues.filter((_, i) => i !== index));
  };

  const addUnavailabilityPeriod = () => {
    openModal("unavailability-modal");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="py-8">
          <h2 className="header-l font-bold">Rental rates and availability</h2>
        </div>
        <div className="space-y-10 sm:w-2/3 lg:w-3/6">
          {fieldItems.map((item) => (
            <div key={item.label}>
              <NumberInputWithCurrency
                control={form.control}
                name={item.name}
                label={item.label}
              />

              <div className="p-3 mt-5 rounded-md bg-black/5">
                <div className="grid grid-cols-2">
                  <span className="text-black/80 body-3">
                    Your will receive
                  </span>
                  <span className="text-right text-black/80 body-3">
                    {calculatePriceAfterVat(
                      Number(form.watch(item.name)) || 0,
                      21
                    )}
                  </span>
                </div>
                <div className="grid grid-cols-2">
                  <span className="text-black/80 body-3">Kaparki fee</span>
                  <span className="text-right text-black/80 body-3">
                    {calculateVat(Number(form.watch(item.name)) || 0, 21)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Separator className="my-12 border" />

        <div className="space-y-10 sm:w-2/3 lg:w-3/6">
          <p className="py-1 text-black/80 header-6 font-bold uppercase">
            Additional Cost
          </p>
          <NumberInputWithCurrency
            control={form.control}
            name="security_deposit"
            label="Security deposit"
          />

          <TextInput
            control={form.control}
            name="daily_mileage"
            label="Daily mileage limit (in KM)"
            labelClass="text-black/80 body-3 !font-medium"
            type="number"
          />

          <NumberInputWithCurrency
            control={form.control}
            name="cost_per_km"
            label="Price per extra KM"
          />
        </div>

        <Separator className="my-12 border" />

        <div>
          <p className="py-1 text-black/80 body-2 font-bold uppercase">
            Availability
          </p>
          <p className="py-2 pb-10 text-black/80 body-2">
            Set conditions on how you want to hire, when and days you don&apos;t
            want your vehicle to be listed
          </p>
        </div>

        <div>
          <FormField
            control={form.control}
            name="instant_bookings"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="text-black/80 !body-2 !font-bold">
                  Booking type
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={(value) => field.onChange(value === "true")}
                    defaultValue={field.value ? "true" : "false"}
                    className="flex flex-col space-y-1">
                    {radioGroupLabels.map((item, index) => (
                      <FormItem
                        key={item.value}
                        className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value={item.value} />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {radioGroupDisplayLabels[index]}
                        </FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Separator className="my-12 border" />

        <div>
          <p className="py-1 text-black/80 body-2 font-bold ">
            Unavailability periods
          </p>
          <p className="py-2 pb-10 text-black/80 body-2">
            To prevent bookings on specific days, set the dates when your
            vehicle is not available. Renters will be unable to book your
            vehicle during these times.
          </p>
          <div className="space-y-8">
            {store.blockedDates?.map((period, index) => (
              <div
                key={index}
                className="flex items-center justify-between gap-3 p-5 rounded-sm bg-black/5">
                <div>
                  <span>
                    {formatDate(period.from, "Y/m/d")} -{" "}
                    {formatDate(period.to, "Y/m/d")}
                  </span>
                </div>
                <div className="flex items-center gap-3 w-max">
                  <span
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => deleteDate(index)}>
                    Delete <Trash2 />
                  </span>
                </div>
              </div>
            ))}

            <div
              className="flex items-center gap-3 p-3 rounded-sm cursor-pointer bg-black/5 w-max"
              onClick={addUnavailabilityPeriod}>
              <Plus />
              <span>Add new unavailability periods</span>
            </div>
          </div>
        </div>

        <Separator className="my-12 border" />

        <div className="sm:w-2/3 lg:w-3/6">
          <p className="py-2 pb-3 text-black/80 body-2 font-bold">
            Advance notice
          </p>
          <TextInput
            control={form.control}
            name="advance_notice"
            label="How many days notice do you need before a trip starts"
            placeholder="1"
            type="number"
          />
        </div>
        <Separator className="my-12 border" />

        <div className="pb-10 space-y-10">
          <div className="sm:w-2/3 lg:w-3/6">
            <p className="py-2 text-black/80 body-2 font-bold">
              Minimum trip duration
            </p>
            <TextInput
              control={form.control}
              name="min_trip_duration"
              label="What's the shortest rental days you will accept?"
              type="number"
            />
          </div>
          <div className="sm:w-2/3 lg:w-3/6">
            <p className="py-2 text-black/80 body-2 font-bold">
              Maximum trip duration
            </p>
            <TextInput
              control={form.control}
              name="max_trip_duration"
              label="What's the longest rental days you will accept?"
              type="number"
            />
          </div>
        </div>

        <MultistepFormButtons
          currentStep={4}
          totalSteps={6}
          isSubmitting={isPending}
          onBackClick={() => {
            store.setCurrentStep(3);
          }}
          onContinueClick={() => {
            form.handleSubmit(onSubmit)();
          }}
        />
      </form>
    </Form>
  );
}

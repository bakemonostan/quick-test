"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useVehicleListingStore } from "../../vehicleListingstore";
import MultistepFormButtons from "./MultistepFormButtons";
import { FormStepSixSchema } from "../../schema";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import { setCookie } from "cookies-next";
import { toast } from "sonner";
import api from "@/config/api";
import { useBookingStore } from "@/store/bookingStore";
import { useRouter } from "next/navigation";

export default function FormStepSix() {
  const { setCurrentStep, formSixValue, setFormSixValue, listingId } =
    useVehicleListingStore();

  const { setVehicleData,setBookingId, setBookingImage } = useBookingStore();
  const router = useRouter();
  const form = useForm<z.infer<typeof FormStepSixSchema>>({
    resolver: zodResolver(FormStepSixSchema),
    defaultValues: formSixValue,
  });

  const { mutate: submitForm, isPending } = useMutation({
    mutationKey: ["add listing"],
    mutationFn: (formData: z.infer<typeof FormStepSixSchema>) =>
      api.post(`/vehicle/listing/${listingId}`, formData),
    onSuccess: (response) => {
      setCookie("vehicle-listing-data", "available");
      setFormSixValue(form.getValues());
      setVehicleData(response.data.data);
      setBookingId(response.data.data.id);
      setBookingImage(response.data.data.images[0].image);
      toast.success("Vehicle listing created successfully!");
      router.push("/preview");
    },
    onError: (error) => {
      toast.error("Failed to create vehicle listing. Please try again.");
      console.error("Submission error:", error);
    },
  });

  const onSubmit = (values: z.infer<typeof FormStepSixSchema>) => {
    submitForm(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6">
        <div className="pt-8">
          <h2 className="header-l font-bold">Give your ad a title</h2>
          <p className="text-black/80 body-2">
            Don&apos;t forget to mention what makes it a good choice for
            potential renters
          </p>
        </div>
        <div className="py-5 space-y-5">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full sm:w-3/4 lg:w-1/3">
                <FormLabel className="!text-black/70 !header-6 !font-bold !uppercase !pb-4">AD TITLE</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g Tesla Model 3"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="!text-black/70 !header-6 !font-bold !uppercase !pb-4">AD DESCRIPTION</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="e.g Tesla Model 3"
                    className="min-h-32"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <MultistepFormButtons
          currentStep={6}
          totalSteps={6}
          isSubmitting={isPending}
          onBackClick={() => {
            setCurrentStep(5);
          }}
          onContinueClick={form.handleSubmit(onSubmit)}
        />
      </form>
    </Form>
  );
}

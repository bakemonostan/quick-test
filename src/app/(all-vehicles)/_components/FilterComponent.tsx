"use client";

import { useState, useEffect, useCallback } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDebouncedValue } from "@mantine/hooks";
import { useModal } from "@/providers/ModalContext";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { SelectInput, SliderInput } from "@/components/Form/FormFields";
import StarIcon from "@/components/icons/StarIcon";

const formSchema = z.object({
  price_per_day: z.number().min(0).default(30),
  rating: z.number().min(1).max(5).default(3),
  sort_by: z.enum(["Lowest price", "Highest price"]).default("Lowest price"),
  instant_bookings: z.boolean().default(false),
});

type FilterFormValues = z.infer<typeof formSchema>;

// Default filter values that match the form schema defaults
export const DEFAULT_FILTER_VALUES: FilterFormValues = {
  price_per_day: 30,
  rating: 3,
  sort_by: "Lowest price",
  instant_bookings: false,
};

interface FilterComponentProps {
  onFilterChange?: (values: FilterFormValues) => void;
}

export default function FilterComponent({
  onFilterChange,
}: FilterComponentProps = {}) {
  const [formValues, setFormValues] = useState<FilterFormValues>(DEFAULT_FILTER_VALUES);
  const [debouncedValues] = useDebouncedValue(formValues, 1000);
  const { openModal } = useModal();

  const form = useForm<FilterFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: DEFAULT_FILTER_VALUES,
  });

  // Memoize the watch callback to prevent it from being recreated on every render
  const handleFormChange = useCallback((values: Partial<FilterFormValues>) => {
    if (values && Object.keys(values).length > 0) {
      setFormValues((current) => ({
        ...current,
        ...values,
      }));
    }
  }, []);

  useEffect(() => {
    const subscription = form.watch(handleFormChange);
    return () => subscription.unsubscribe();
  }, [form, handleFormChange]);

  // Only trigger filter change when debounced values change
  useEffect(() => {
    if (onFilterChange && debouncedValues) {
      onFilterChange(debouncedValues);
    }
  }, [debouncedValues, onFilterChange]);

  const toggleFilterModal = () => {
    openModal("vehicles-filter-modal");
  };

  return (
    <Form {...form}>
      <form className="bg-white rounded shadow-lg sticky top-34">
        <div className="border-b border-gray-200 pb-4 px-4">
          <p className=" font-bold body-secondary uppercase text-black/80">
            Filters
          </p>
        </div>
        <div className="p-4 border-b border-gray-200">
          <SelectInput
            name="sort_by"
            control={form.control}
            labelText="Sort by"
            items={["Lowest price", "Highest price"]}
            placeholder="Sort Lowest price"
            className="cursor-pointer"
          />
        </div>

        <div className="p-4 border-b border-gray-200">
          <FormField
            control={form.control}
            name="price_per_day"
            render={({ field }) => (
              <FormItem className="cursor-pointer">
                <FormDescription className="flex justify-between text-lg">
                  <span>Price per day</span>
                  <span>€{field.value}</span>
                </FormDescription>
                <FormControl>
                  <SliderInput
                    name="price_per_day"
                    control={form.control}
                    label=""
                    min={0}
                    max={2000}
                    step={2}
                    defaultValue={0}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="p-4 border-b border-gray-200">
          <FormField
            control={form.control}
            name="rating"
            render={({ field }) => (
              <FormItem className="cursor-pointer">
                <FormDescription className="flex justify-between">
                  <span>Ratings</span>
                  <span className="flex items-center gap-1.5">
                    <StarIcon className="size-5" />
                    {field.value}
                  </span>
                </FormDescription>
                <div>
                  <p>Browse vehicles rating</p>
                </div>
                <FormControl>
                  <SliderInput
                    name="rating"
                    control={form.control}
                    label=""
                    min={1}
                    max={5}
                    step={1}
                    defaultValue={1}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="p-4 border-b border-gray-200">
          <FormField
            control={form.control}
            name="instant_bookings"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg cursor-pointer">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Instant bookings</FormLabel>
                  <FormDescription>
                    Browse vehicles that can be booked without host approval
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className="p-4">
          <Button
            onClick={toggleFilterModal}
            variant="cta"
            className="w-full"
            type="button">
            More filters
          </Button>
        </div>
      </form>
    </Form>
  );
}

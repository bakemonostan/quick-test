"use client";

import { Modal } from "@/components/ui/modal";
import { useModal } from "@/providers/ModalContext";
import { Button } from "@/components/ui/button";
import { useVehicleListingStore } from "../vehicleListingstore";
import { format } from "date-fns";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import RangeDatePicker from "@/components/Form/RangeDatePicker";
import { toast } from "sonner";

const UnavailabilityFormSchema = z.object({
  dateRange: z
    .object({
      from: z.string().optional().nullable(),
      to: z.string().optional().nullable(),
    })
    .refine(
      (data) => {
        if (!data.from || !data.to) return true;
        return data.from < data.to;
      },
      {
        message: "End date must be after start date.",
        path: ["to"],
      }
    ),
});

type FormValues = z.infer<typeof UnavailabilityFormSchema>;

export const DEFAULT_FORM_VALUES: FormValues = {
  dateRange: {
    from: null,
    to: null,
  },
};

export default function UnavailabilityPeriods() {
  const { closeModal } = useModal();
  const { setBlockedDates, blockedDates } = useVehicleListingStore();

  const form = useForm<FormValues>({
    resolver: zodResolver(UnavailabilityFormSchema),
    defaultValues: DEFAULT_FORM_VALUES,
  });

  const onSubmit = (data: FormValues) => {
    if (!data.dateRange.from || !data.dateRange.to) {
      return;
    }
    const formattedDateRange = {
      from: format(data.dateRange.from, "yyyy-MM-dd"),
      to: format(data.dateRange.to, "yyyy-MM-dd"),
    };
    // Check if the date range already exists
    const existingRange = blockedDates.find(
      (range) =>
        range.from === formattedDateRange.from &&
        range.to === formattedDateRange.to
    );
    if (existingRange) {
      toast.error("Date range already exists");
      return;
    }
    setBlockedDates([...blockedDates, formattedDateRange]);
    closeModal();
  };

  return (
    <Modal
      id="unavailability-modal"
      title="Add Unavailability Period"
      closeOnInteractOutside={false}
      className="modal-md">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6">
          <RangeDatePicker
            control={form.control}
            name="dateRange"
            label="Unavailability periods"
            placeholder="Select start and end dates"
          />
          <div className="flex justify-end gap-5">
            <Button
              type="button"
              variant="plain"
              className="ml-2"
              onClick={() => closeModal()}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant={"cta"}>
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
}

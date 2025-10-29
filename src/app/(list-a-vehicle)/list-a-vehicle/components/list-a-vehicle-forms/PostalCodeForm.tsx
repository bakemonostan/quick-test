/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { TextInput } from "@/components/Form/FormFields";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDebouncedValue } from "@mantine/hooks";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useVehicleListingStore } from "../../vehicleListingstore";
import { fetchAddressFromPostalCode } from "../../utils/addressUtils";
import { useModal } from "@/providers/ModalContext";
import { ModalButton } from "@/components/ui/modal-button";
import { toast } from "sonner";

const schema = z.object({
  postalCode: z
    .string({
      required_error: "Postal code is required",
    })
    .min(2, {
      message: "Postal code must be at least 2 characters",
    }),
});

type PostalCodeFormSchema = z.infer<typeof schema>;

export default function PostalCodeForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { openModal } = useModal();
  const { setAddress, setPostalCode } = useVehicleListingStore();

  const form = useForm<PostalCodeFormSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      postalCode: "",
    },
  });

  const postalCode = form.watch("postalCode");
  const [debouncedPostalCode] = useDebouncedValue(postalCode, 1500);

  // Calculate if debounce is active (button should be disabled)
  const isDebouncing =
    postalCode !== debouncedPostalCode || !debouncedPostalCode;

  useEffect(() => {
    const processPostalCode = async () => {
      if (debouncedPostalCode) {
        setIsLoading(true);

        setPostalCode(debouncedPostalCode);

        const data = await fetchAddressFromPostalCode(debouncedPostalCode);

        if (data) {
          setAddress(data);
          if (!data.isError) {
            toast.success("Address found", {
              description: `Postal code: ${debouncedPostalCode} is valid, please continue to the next step`,
            });
          }
        }

        if (data?.isError) {
          toast.error("No address found", {
            description: `Please check your postal code and try again`,
          });
          form.setError("postalCode", {
            message: "Invalid postal code",
          });
          form.reset({ postalCode: "" });
        }

        setIsLoading(false);
      }
    };

    processPostalCode();
  }, [debouncedPostalCode]);

  const onSubmit = (values: PostalCodeFormSchema) => {
    openModal("address-modal");
    form.reset({ postalCode: "" });
    setPostalCode(values.postalCode);
  };

  return (
    <div>
      <p className="header-6 font-extrabold uppercase pb-4">Vehicle Location</p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-[449px]">
          <TextInput
            label="Postal Code"
            placeholder="Enter your postal code"
            control={form.control}
            name="postalCode"
          />
          {isLoading && (
            <p className="text-sm text-muted-foreground mt-1">
              Processing postal code...
            </p>
          )}
          <div className="flex justify-start pt-4">
            <ModalButton
              modalId="address-modal"
              type="submit"
              variant="cta"
              disabled={isDebouncing || isLoading}>
              Continue
            </ModalButton>
          </div>
        </form>
      </Form>
    </div>
  );
}

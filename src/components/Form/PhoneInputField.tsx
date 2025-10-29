import * as React from "react";
import type { ControllerProps, FieldPath, FieldValues } from "react-hook-form";
import * as RPNInput from "react-phone-number-input";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PhoneInput } from "./PhoneInput";

interface PhoneInputFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> extends Omit<
    React.ComponentPropsWithoutRef<typeof PhoneInput>,
    "value" | "defaultValue" | "onChange"
  > {
  label?: string;
  name: TName;
  control: ControllerProps<TFieldValues, TName>["control"];
  defaultValue?: RPNInput.Value;
  defaultCountry?: RPNInput.Country;
}

export function PhoneInputField<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  label,
  name,
  control,
  defaultValue,
  ...props
}: PhoneInputFieldProps<TFieldValues, TName>) {
  return (
    <FormField
      control={control}
      name={name}
      defaultValue={defaultValue as unknown as TFieldValues[TName]}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <PhoneInput
              {...props}
              value={field.value}
              onChange={field.onChange}
              className="w-full"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
} 

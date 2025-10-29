'use client'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox, Slider, Switch } from "@mantine/core";
import {
  CustomFormCheckboxProps,
  CustomFormFieldProps,
  CustomFormRadioProps,
  CustomFormSelectProps,
} from "./types";
import { FieldValues, Control, Path } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { PinInput } from "@mantine/core";
import classes from "../../app/pin-input.module.css";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Euro } from "lucide-react";
import { Textarea } from "../ui/textarea";

type CustomFormSliderProps<T extends FieldValues = FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label: string;
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number;
};

export function NumberInputWithCurrency<T extends FieldValues = FieldValues>({
  name,
  control,
  label,
  labelClass = "",
  placeholder = "1",
}: {
  name: Path<T>;
  control: Control<T>;
  label: string;
  labelClass?: string;
  placeholder?: string;
}) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 items-center space-y-0 w-full">
          <FormLabel
            className={cn(labelClass, "!text-black/80 !body-2 !font-bold")}>
            {label}
          </FormLabel>
          <FormControl>
            <div className="relative">
              <Euro className="absolute rounded-s-lg text-black/40 p-3 top-1/2 -translate-y-1/2 bg-black/5 h-full w-10" />
              <Input
                type="number"
                className="pl-12 text-right"
                placeholder={placeholder}
                {...field}
                min={1}
                onChange={(e) => field.onChange(Number(e.target.value))}
                value={field.value || ""}
              />
            </div>
          </FormControl>
          <FormMessage className="p-0" />
        </FormItem>
      )}
    />
  );
}

export function TextInput<T extends FieldValues = FieldValues>({
  name,
  control,
  label,
  labelClass = "",
  placeholder,
  type,
  isTextArea = false,
  min = 1,
}: CustomFormFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className={cn(labelClass, "capitalize")}>
            {label}
          </FormLabel>
          <FormControl>
            {isTextArea ? (
              <Textarea
                {...field}
                className="h-[5.625rem]"
                placeholder={placeholder}
                value={field.value || ""}
              />
            ) : (
              <Input
                type={type}
                className="shadow-none active:shadow-none focus:shadow-none rounded-sm"
                {...field}
                placeholder={placeholder || "1"}
                min={min}
                value={field.value || ""}
                onChange={(e) => {
                  if (type === "number") {
                    field.onChange(
                      e.target.value === "" ? "" : Number(e.target.value)
                    );
                  } else {
                    field.onChange(e.target.value);
                  }
                }}
              />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export function SelectInput<T extends FieldValues = FieldValues>({
  name,
  control,
  items,
  labelText,
  placeholder,
  ...props
}: CustomFormSelectProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem
          className={cn("w-full space-y-0", props.className)}
        >
          <FormLabel>{labelText}</FormLabel>
          <Select
            value={field.value}
            onValueChange={field.onChange}
            disabled={props.disabled}
            
            >
            <FormControl>
              <SelectTrigger className={cn("w-full py-2 px-3 shadow-none", props.triggerClassName)}>
                <SelectValue placeholder={placeholder} className="uppercase truncate " />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {items.map((item) => (
                <SelectItem
                  key={item}
                  value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export function CheckboxInput<T extends FieldValues = FieldValues>({
  name,
  control,
  labelText,
}: CustomFormCheckboxProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="capitalize">{labelText}</FormLabel>
          <FormControl>
            <Checkbox {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export function RadioInput<T extends FieldValues = FieldValues>({
  name,
  control,
  labelText,
  options,
}: CustomFormRadioProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="capitalize font-medium">{labelText}</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              value={field.value}
              className="flex gap-4">
              {options.map((option) => {
                const id = `${name}-${option}`;
                return (
                  <div
                    key={id}
                    className="flex items-center space-x-2">
                    <RadioGroupItem
                      value={option}
                      id={id}
                    />
                    <Label 
                      htmlFor={id} 
                      className="cursor-pointer capitalize text-black/70">
                      {option === 'true' ? 'Yes' : option === 'false' ? 'No' : option}
                    </Label>
                  </div>
                );
              })}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

// switch case for the form fields
export function SwitchInput<T extends FieldValues = FieldValues>({
  name,
  control,
  label,
}: CustomFormFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="capitalize">{label}</FormLabel>
          <FormControl>
            <Switch
              {...field}
              color="yellow.4"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

// slider case for the form fields
export function SliderInput<T extends FieldValues = FieldValues>({
  name,
  control,
  label,
  min = 0,
  max = 100,
  step = 1,
  defaultValue = 0,
}: CustomFormSliderProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="capitalize">{label}</FormLabel>
          <FormControl>
            <div className="space-y-2">
              <Slider
                value={field.value || defaultValue}
                onChange={field.onChange}
                min={min}
                max={max}
                step={step}
                color="black"
                
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{field.value || defaultValue}</span>
              </div>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
interface PinInputComponentProps<T extends FieldValues = FieldValues> {
  name: Path<T>;
  control: Control<T>;
}
export function PinInputComponent<T extends FieldValues = FieldValues>({
  name,
  control,
}: PinInputComponentProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <PinInput
              classNames={{
                pinInput: classes.pinInput,
              }}
              length={4}
              placeholder="*"
              {...field}
              size="xl"
              mx="auto"
              type="number"
              oneTimeCode
            />
          </FormControl>
          <FormMessage className="text-red-500 text-sm text-center font-medium" />
        </FormItem>
      )}
    />
  );
}

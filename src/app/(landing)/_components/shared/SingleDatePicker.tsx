"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Control, FieldValues, Path } from "react-hook-form";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Global styles for the calendar
export const calendarStyles = {
  root: "px-1 py-6 bg-[#FAFAFA] h-[21.875rem] max-w-[23.4375rem] flex  flex-col gap-5 rounded-3xl items-center",
  months: "relative w-[100%] h-full flex flex-col justify-between",
  month_grid: "w-[90%]",
  weekday: "text-[#9B9D9F] text-[14px] capitalize pb-3 font-normal",
  caption_label: "hidden",
  month: "w-full text-center mx-auto flex justify-center items-center flex-col",
  day: "size-10 font-normal aria-selected:opacity-100 m-1 relative z-20 text-[14px] hover:bg-black/10 hover:rounded-full cursor-pointer disabled:cursor-not-allowed",
  day_button: "size-10 relative z-20 cursor-pointer",
  outside: "opacity-50 text-black/20 cursor-not-allowed",
  selected: "bg-yellow-500 text-primary-foreground rounded-full font-medium",
};

interface SingleDatePickerProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  buttonClassName?: string;
  calendarClassName?: string;
  placeholderClassName?: string;
  popoverContentClassName?: string;
  showFormMessage?: boolean;
}

export function SingleDatePicker<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  disabled,
  className,
  buttonClassName,
  placeholderClassName,
  calendarClassName,
  popoverContentClassName,
  showFormMessage = true,
}: SingleDatePickerProps<T>) {
  const [open, setOpen] = useState(false);
  const [month, setMonth] = useState(new Date());
  const disabledDays = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("flex flex-col w-full", className)}>
          {label && <FormLabel>{label}</FormLabel>}
          <Popover
            open={open}
            onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  disabled={disabled}
                  variant="outline"
                  className={cn(
                    "w-full text-left font-normal justify-start p-0",
                    !field.value && "text-muted-foreground",
                    buttonClassName
                  )}>
                  <div className="w-full text-left truncate">
                    {field.value ? (
                      format(field.value, "PPP")
                    ) : (
                      <span className={cn(
                        "p-2",
                        placeholderClassName
                      )}>{placeholder || "Select date"}</span>
                    )}
                  </div>
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent
              className={cn(
                "w-auto min-w-[280px] p-0 rounded-3xl",
                popoverContentClassName
              )}
              align="start">
              <div>
                <Calendar
                  showOutsideDays={false}
                  disabled={disabledDays}
                  month={month}
                  onMonthChange={setMonth}
                  components={{
                    Nav: () => {
                      return (
                        <div className="flex justify-between items-center px-4">
                          <button
                            className="nav-button"
                            onClick={() =>
                              setMonth(
                                new Date(
                                  month.getFullYear(),
                                  month.getMonth() - 1
                                )
                              )
                            }>
                            <ChevronLeft />
                          </button>
                          <span className="body-2 font-medium text-black/80">
                            {format(month, "MMMM yyyy")}
                          </span>
                          <button
                            className="nav-button"
                            onClick={() =>
                              setMonth(
                                new Date(
                                  month.getFullYear(),
                                  month.getMonth() + 1
                                )
                              )
                            }>
                            <ChevronRight />
                          </button>
                        </div>
                      );
                    },
                  }}
                  mode="single"
                  selected={field.value}
                  onSelect={(date) => {
                    field.onChange(date);
                    setOpen(false);
                  }}
                  autoFocus
                  className={calendarClassName}
                  classNames={calendarStyles}
                />
              </div>
            </PopoverContent>
          </Popover>
          {showFormMessage && <FormMessage />}
        </FormItem>
      )}
    />
  );
}

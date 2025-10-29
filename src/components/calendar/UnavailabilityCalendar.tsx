import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker, DateRange } from "react-day-picker";
import { format } from "date-fns";
import { useState } from "react";

interface UnavailabilityPeriod {
  from: string;
  to: string;
}

interface UnavailabilityCalendarProps {
  unavailabilityPeriod: UnavailabilityPeriod;
  selected?: DateRange;
}

export function UnavailabilityCalendar({
  unavailabilityPeriod,
  selected: initialSelected,
}: UnavailabilityCalendarProps) {
  const [month, setMonth] = useState<Date>(new Date(unavailabilityPeriod.from.replace(/\//g, "-")));
  const [selected, setSelected] = useState<DateRange | undefined>(
    initialSelected
  );

  const disabledDays = [{
    from: new Date(unavailabilityPeriod.from.replace(/\//g, "-")),
    to: new Date(unavailabilityPeriod.to.replace(/\//g, "-")),
  }];

  return (
    <DayPicker
      month={month}
      onMonthChange={setMonth}
      selected={selected}
      onSelect={setSelected}
      disabled={[
        { before: new Date() }, // Disable past dates
        ...disabledDays.map((period) => ({
          from: period.from,
          to: period.to,
        })),
      ]}
      components={{
        Nav: () => {
          return (
            <div className="flex justify-between items-center px-4">
              <button
                className="nav-button"
                onClick={() =>
                  setMonth(new Date(month.getFullYear(), month.getMonth() - 1))
                }>
                <ChevronLeft />
              </button>
              <span className="body-2 font-medium text-black/80">
                {format(month, "MMMM yyyy")}
              </span>
              <button
                className="nav-button"
                onClick={() =>
                  setMonth(new Date(month.getFullYear(), month.getMonth() + 1))
                }>
                <ChevronRight />
              </button>
            </div>
          );
        },
      }}
      formatters={{
        formatWeekdayName: (date) => {
          return date.toLocaleDateString("en-US", { weekday: "short" });
        },
      }}
      classNames={{
        root: "px-1 py-6 bg-[#FAFAFA] h-[21.875rem] max-w-[23.4375rem] flex  flex-col gap-5 rounded-xl items-center border-black/10 border",
        months: "relative w-[100%] h-full flex flex-col justify-between",
        month_grid: "w-[90%]",
        weekday: "text-[#9B9D9F] text-[14px] capitalize pb-3 font-normal",
        caption_label: "hidden",
        month:
          "w-full text-center mx-auto flex justify-center items-center flex-col",
        day: "size-10 font-normal aria-selected:opacity-100 m-1 relative z-20 text-[14px]",
        day_button: "size-10 relative z-20",
        range_end:
          "bg-[#F8C421] rounded-full before:content-[''] before:absolute before:inset-0 before:bg-[#F8C421] before:rounded-full before:z-10 after:content-[''] after:border-[#F8C421] after:-z-1 after:rounded-tr-3xl after:rounded-br-3xl after:absolute after:inset-0 after:bg-[#F9F7DE] after:border-b-[.0625rem] after:pb-10 after:border-r-[#F8C421]",
        range_start:
          "bg-[#F8C421] rounded-full before:content-[''] before:absolute before:inset-0 before:bg-[#F8C421] before:rounded-full before:z-10 after:content-[''] after:-z-1 after:rounded-tl-3xl after:rounded-bl-3xl  after:absolute after:inset-0 after:bg-[#F9F7DE] after:border-t-[.0625rem] after:border-l-[.0625rem] after:border-[#F8C421]",
        range_middle: "bg-[#F9F7DE] border-y-[.0625rem] border-[#F8C421]",
        selected: " border-[#F8C421]",
      }}
      mode="range"
    />
  );
}

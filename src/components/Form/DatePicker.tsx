// "use client";
// import {
//   FormControl,
//   FormField,
//   FormItem,
//   FormMessage,
// } from "@/components/ui/form";
// import classes from "./styles/RangeDatePicker.module.css";
// import { Control, FieldValues, Path } from "react-hook-form";

// type CustomDatepickerProps<T extends FieldValues = FieldValues> = {
//   name: Path<T>;
//   control: Control<T>;
//   label?: string;
//   min?: number;
//   max?: number;
//   type?: "date" | "range";
//   step?: number;
//   defaultValue?: number;
//   placeholder?: string;
// };


// export function SingleDatePicker<T extends FieldValues>({
//   control,
//   name,
//   label = "Date",
//   placeholder = "Select date",
// }: {
//   control: Control<T>;
//   name: Path<T>;
//   label?: string;
//   placeholder?: string;
// }) {
//   return (
//     <FormField
//       control={control}
//       name={name}
//       render={({ field }) => (
//         <FormItem>
//           <FormControl>
//             <DatePickerInput
//               label={label}
//               classNames={classes}
//               variant="unstyled"
//               value={field.value}
//               onChange={field.onChange}
//               placeholder={placeholder}
//               valueFormat="YYYY MMM DD"
//             />
//           </FormControl>
//           <FormMessage />
//         </FormItem>
//       )}
//     />
//   );
// }

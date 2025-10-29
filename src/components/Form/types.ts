import { Path, Control, FieldValues } from "react-hook-form";
import { InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes } from "react";

export interface CustomFormFieldProps<T extends FieldValues = FieldValues> extends 
  Omit<InputHTMLAttributes<HTMLInputElement> | TextareaHTMLAttributes<HTMLTextAreaElement>, 'name'> {
    name: Path<T>;
    control: Control<T>;
    label: string;
    min?: number;
    placeholder?: string;
      isTextArea?: boolean;
      type?: string;
      labelClass?: string;
  };

export interface CustomFormSelectProps<T extends FieldValues = FieldValues> extends 
  Omit<SelectHTMLAttributes<HTMLSelectElement>, 'name'> {
    name: Path<T>;
    control: Control<T>;
    items: string[];
    labelText?: string;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
    triggerClassName?: string;
  };

export interface CustomFormCheckboxProps<T extends FieldValues = FieldValues> extends 
  Omit<InputHTMLAttributes<HTMLInputElement>, 'name' | 'type'> {
    name: Path<T>;
    control: Control<T>;
    labelText?: string;
  };
  export interface CustomFormRadioProps<T extends FieldValues = FieldValues> extends 
  Omit<InputHTMLAttributes<HTMLInputElement>, 'name' | 'type'> {
    name: Path<T>;
    control: Control<T>;
    labelText?: string;
    options: string[];
  };

"use client";

import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";

interface DynamicFormFieldsProps {
  title: string;
  fields: string[];
  equipment_type: string;
}

export function DynamicFormFields({
  title,
  fields,
  equipment_type,
}: DynamicFormFieldsProps) {
  const form = useFormContext();

  const isFeatureChecked = (
    value: Record<string, string[]> | undefined,
    type: string,
    item: string
  ) => {
    if (!value) return false;
    return value[type]?.includes(item) || false;
  };

  const toggleFeature = (
    field: { 
      value: Record<string, string[]> | undefined; 
      onChange: (value: Record<string, string[]>) => void 
    },
    featureId: string
  ) => {
    const currentValue = field.value || {};
    const currentTypeArray = currentValue[equipment_type] || [];

    const updatedTypeArray = currentTypeArray.includes(featureId)
      ? currentTypeArray.filter((id: string) => id !== featureId)
      : [...currentTypeArray, featureId];

    field.onChange({
      ...currentValue,
      [equipment_type]: updatedTypeArray,
    });
  };

  return (
    <div className="bg-gray-50 py-4 rounded-md">
      <p className="pb-3 font-bold text-sm text-black/70 uppercase">{title}</p>
      <div>
        <FormField
          control={form.control}
          name="equipped_with"
          render={({ field }) => (
            <FormItem>
              <div className="grid grid-cols-2  gap-y-3">
                {fields.map((item) => (
                  <FormControl key={item}>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`${equipment_type}-${item}`} 
                        checked={isFeatureChecked(field.value, equipment_type, item)}
                        onCheckedChange={() => toggleFeature(field, item)}
                      />
                      <FormLabel 
                        htmlFor={`${equipment_type}-${item}`}
                        className="cursor-pointer input-text pb-0"
                      >
                        {item}
                      </FormLabel>
                    </div>
                  </FormControl>
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}

export default DynamicFormFields;

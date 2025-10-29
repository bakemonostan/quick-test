"use client";
import React from "react";
import { SelectInput } from "@/components/Form/FormFields";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  useCategories,
  useCategoryId,
  useGetSubcategoriesByCategoryId,
  useGetSubcategoryId,
} from "@/hooks/hooks";
import { formatDate } from "@/utils/general";
import {
  DEFAULT_FORM_VALUES,
  formSchema,
  FormValues,
} from "@/schemas/hero-search-component";
import { usePathname, useRouter } from "next/navigation";
import RangeDatePicker from "@/components/Form/RangeDatePicker";
import { useTypes } from "@/services/dropdown";

interface props extends React.HTMLProps<HTMLDivElement> {
  className?: string;
}

export default function HeroSearchComponent(props: props) {
  const pathname = usePathname();
  const router = useRouter();
  const isAllVehiclesRoute = pathname.includes("/all-vehicles");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: DEFAULT_FORM_VALUES,
  });

  // Watch for form field changes
  const category = form.watch("category");
  const subCategory = form.watch("subCatergory");
  const type = form.watch("type");

  const { categoryNames, isLoading } = useCategories();
  const categoryId = useCategoryId(category!);
  const { subCategories, subcategoriesLoading } =
    useGetSubcategoriesByCategoryId(categoryId!);
  const { data: types, isLoading: typesLoading } = useTypes(categoryId!);

  const showTypes =
    Array.isArray(subCategories) &&
    subCategories.length === 0 &&
    types &&
    types.length > 0;

  const subCategoryId = useGetSubcategoryId(categoryId!, subCategory!);

  const typeId =
    showTypes && type ? types.find((t) => t.name === type)?.id : null;

  const onSubmit = (data: FormValues) => {
    // Build URL parameters
    const params = new URLSearchParams();

    if (categoryId) params.append("category", categoryId);
    if (subCategoryId) params.append("sub_category", subCategoryId);
    if (typeId) params.append("type", typeId);

    if (data.rangeDate.from) {
      params.append("rental_date_from", formatDate(data.rangeDate.from));
    }

    if (data.rangeDate.to) {
      params.append("rental_date_to", formatDate(data.rangeDate.to));
    }

    // Redirect to all-vehicles page with query parameters
    router.push(`/all-vehicles?${params.toString()}`);
  };

  return (
    <div
      className={`mx-auto ${
        isAllVehiclesRoute ? "max-w-[1080px]" : "max-w-4xl"
      }`}
      {...props}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="sm:block shadow-xl mx-auto rounded-2xl sm:rounded-full p-[1px] bg-gradient-to-r from-[#AD75E2] to-[#FFCB4E] ">
          <div
            className="sm:grid flex sm:items-center flex-col sm:grid-cols-4
           rounded-2xl gap-3 bg-white sm:rounded-full ">
            <div className="grid grid-cols-3 col-span-3  px-4 gap-5 py-1">
              <div className="relative flex items-center px-2">
                <SelectInput
                  control={form.control}
                  name="category"
                  labelText="Category"
                  disabled={isLoading}
                  placeholder="Category"
                  triggerClassName=" px-0 border-0 py-0 shadow-none body-secondary"
                  items={categoryNames || []}
                />
                <div className="hidden sm:block absolute top-1/2 -translate-y-1/2 -right-1 w-0.5 h-3/4 bg-gray-200"></div>
              </div>
              <div className="relative flex items-center px-2 ">
                {subCategories && subCategories.length > 0 ? (
                  <SelectInput
                    control={form.control}
                    name="subCatergory"
                    disabled={subcategoriesLoading}
                    labelText="Sub Category"
                    triggerClassName=" px-0 border-0 py-0 shadow-none body-secondary"
                    items={subCategories || []}
                    placeholder="Sub Category"
                  />
                ) : showTypes ? (
                  <SelectInput
                    control={form.control}
                    name="type"
                    disabled={typesLoading}
                    labelText="Type"
                    triggerClassName=" px-0 border-0 py-0 shadow-none body-secondary"
                    items={types.map((type) => type.name) || []}
                    placeholder="Type"
                  />
                ) : (
                  <SelectInput
                    control={form.control}
                    name="subCatergory"
                    disabled={subcategoriesLoading}
                    labelText="Sub Category"
                    triggerClassName=" px-0 border-0 py-0 shadow-none body-secondary"
                    items={subCategories || []}
                    placeholder="Sub Category"
                  />
                )}
                <div className="absolute hidden sm:block top-1/2 -translate-y-1/2 -right-1 w-0.5 h-3/4  bg-gray-200"></div>
              </div>
              <div className="relative flex items-center px-2 w-full">
                <RangeDatePicker
                  control={form.control}
                  name="rangeDate"
                  label="Rental dates"
                  variant="unstyled"
                  placeholder="From - Until"
                />
              </div>
            </div>

            <div className="relative flex items-end justify-end h-full p-1">
              <Button
                type="submit"
                variant="cta"
                className="h-full rounded-full">
                Search
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}

"use client";

import { Modal } from "@/components/ui/modal";
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
// import { formatDate } from "@/utils/general";
import {
  DEFAULT_FORM_VALUES,
  formSchema,
  FormValues,
} from "@/schemas/hero-search-component";
import { useModal } from "@/providers/ModalContext";
import RangeDatePicker from "@/components/Form/RangeDatePicker";
import { useRouter } from "next/navigation";
import { useTypes } from "@/services/dropdown";

export function HeroSearchModal() {
  const { closeModal } = useModal();
  const router = useRouter();

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
    const params = new URLSearchParams();

    // Add category parameter if it exists
    if (categoryId) params.set("category", categoryId);

    // Add either subcategory or type parameter based on what's available
    if (showTypes && typeId) {
      params.set("type", typeId);
    } else if (subCategoryId) {
      params.set("sub_category", subCategoryId);
    }

    // Add date range parameters if they exist
    if (data.rangeDate.from)
      params.set("rental_date_from", data.rangeDate.from);
    if (data.rangeDate.to) params.set("rental_date_to", data.rangeDate.to);

    // Redirect to all-vehicles page with query parameters
    router.push(`/all-vehicles?${params.toString()}`);
    closeModal();
  };

  return (
    <Modal
      id="hero-search-modal"
      title="Find Your Vehicle"
      className="!max-w-[31.25rem] rounded-3xl">
      <div className="p-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4">
            <div className="space-y-4">
              <div>
                <SelectInput
                  control={form.control}
                  name="category"
                  labelText="Category"
                  disabled={isLoading}
                  placeholder="Category"
                  items={categoryNames || []}
                />
              </div>

              <div>
                {subCategories && subCategories.length > 0 ? (
                  <SelectInput
                    control={form.control}
                    name="subCatergory"
                    disabled={subcategoriesLoading}
                    labelText="Sub Category"
                    items={subCategories || []}
                    placeholder="Sub Category"
                  />
                ) : showTypes ? (
                  <SelectInput
                    control={form.control}
                    name="type"
                    disabled={typesLoading}
                    labelText="Type"
                    items={types.map((type) => type.name) || []}
                    placeholder="Type"
                  />
                ) : (
                  <SelectInput
                    control={form.control}
                    name="subCatergory"
                    disabled={subcategoriesLoading}
                    labelText="Sub Category"
                    items={subCategories || []}
                    placeholder="Sub Category"
                  />
                )}
              </div>

              <div>
                <RangeDatePicker
                  control={form.control}
                  name="rangeDate"
                  label="Rental Date"
                  placeholder="Rental Date"
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="cta"
              className="w-full rounded-full mt-6">
              Search
            </Button>
          </form>
        </Form>
      </div>
    </Modal>
  );
} 

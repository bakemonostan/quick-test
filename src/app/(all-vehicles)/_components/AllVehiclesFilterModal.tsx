"use client";

import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { useModal } from "@/providers/ModalContext";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import {
  SelectInput,
  SliderInput,
  TextInput,
} from "@/components/Form/FormFields";
import { Switch } from "@/components/ui/switch";
import StarIcon from "@/components/icons/StarIcon";
import {
  useCategories,
  useGetSubcategoriesByCategoryId,
  useGetSubcategoryId,
} from "@/hooks/hooks";
import {
  useMakes,
  useModels,
  useTypes,
  useVehicleConditionDropdown,
} from "@/services/dropdown";

const formSchema = z.object({
  category: z.string().optional(),
  sub_categories: z.string().optional(),
  type: z.string().optional(),
  make: z.string().optional(),
  model: z.string().optional(),
  year: z.string().optional(),
  condition: z.string().optional(),
  price_per_day: z.number().min(0).default(30),
  rating: z.number().min(1).max(5).default(3),
  sort_by: z.enum(["Lowest price", "Highest price"]).default("Lowest price"),
  instant_bookings: z.boolean().default(false),
});

type FilterFormValues = z.infer<typeof formSchema>;

const DEFAULT_FILTER_VALUES: FilterFormValues = {
  category: undefined,
  sub_categories: undefined,
  type: undefined,
  make: undefined,
  model: undefined,
  year: undefined,
  condition: undefined,
  price_per_day: 30,
  rating: 3,
  sort_by: "Lowest price",
  instant_bookings: false,
};

const AllVehiclesFilterModal = () => {
  const { closeModal } = useModal();
  const form = useForm<FilterFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: DEFAULT_FILTER_VALUES,
  });

  const {
    categoryData,
    categoryNames,
    isLoading: categoryLoading,
  } = useCategories();
  form.watch("category");
  form.watch("sub_categories");
  form.watch("type");
  form.watch("make");
  form.watch("model");

  function categoryId() {
    if (!form.getValues("category")) return null;
    else {
      const category = categoryData?.find(
        (category) => category.name === form.getValues("category")
      );
      return category?.id;
    }
  }
  const { subCategories, subcategoriesLoading } =
    useGetSubcategoriesByCategoryId(categoryId()!);

  const subCategoryId = useGetSubcategoryId(
    categoryId()!,
    form.getValues("sub_categories")!
  );

  const { data: types, isLoading: typesLoading } = useTypes(
    subCategoryId || categoryId()!
  );
  const typeId = types?.find(
    (type) => type.name === form.getValues("type")
  )?.id;
  const { data: makes, isLoading: makesLoading } = useMakes(typeId || "");
  const makeId = makes?.find(
    (make) => make.name === form.getValues("make")
  )?.id;
  const { data: models, isLoading: modelsLoading } = useModels(makeId || "");
  const modelId = models?.find(
    (model) => model.name === form.getValues("model")
  )?.id;

  const { data: conditionOptions, isLoading: conditionLoading } =
    useVehicleConditionDropdown();

  const resetForm = () => {
    form.reset(DEFAULT_FILTER_VALUES);
  };

  const onSubmit = (data: FilterFormValues) => {
    const payload = {
        category: categoryId(),
        sub_categories: subCategoryId,
        type: typeId,
        make: makeId,
        model: modelId,
        year: data.year,
        condition: data.condition,
        price_per_day: data.price_per_day,
        rating: data.rating,
      instant_bookings: data.instant_bookings,
    };
    
    closeModal();
    return payload 
  };

  return (
    <Modal
      id="vehicles-filter-modal"
      title="General Filters"
      className="!max-w-[33rem] h-[70%] overflow-y-auto ">
      <div className="flex justify-between items-center border-b border-gray-200 pb-2 mb-4">
        <p className="text-sm text-gray-600">Filter your search</p>
        <p
          onClick={resetForm}
          className="text-sm text-yellow-500 underline cursor-pointer">
          Reset filters
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5">
          {/* Vehicle Type Section */}
          <div className="space-y-4">
            <SelectInput
              name="category"
              control={form.control}
              labelText="Vehicle category"
              items={categoryNames || []}
              placeholder="Select category"
              className="cursor-pointer"
              disabled={categoryLoading}
            />

            {subCategories && subCategories.length > 0 && (
              <SelectInput
                name="sub_categories"
                control={form.control}
                labelText="Sub Category"
                items={subCategories || []}
                placeholder="Select sub category"
                className="cursor-pointer"
                disabled={subcategoriesLoading}
              />
            )}

            <SelectInput
              name="type"
              control={form.control}
              labelText="Vehicle type"
              items={types?.map((type) => type.name) || []}
              placeholder="Select type"
              disabled={typesLoading}
              className="cursor-pointer"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <SelectInput
              name="make"
              control={form.control}
              labelText="Make"
              items={makes?.map((make) => make.name) || []}
              placeholder="Select make"
              disabled={makesLoading}
              className="cursor-pointer"
            />

            <SelectInput
              name="model"
              control={form.control}
              labelText="Model"
              items={models?.map((model) => model.name) || []}
              placeholder="Select model"
              disabled={modelsLoading}
              className="cursor-pointer"
            />

            <TextInput
              name="year"
              control={form.control}
              label="Year"
              placeholder="Year"
            />

            <SelectInput
              name="condition"
              control={form.control}
              labelText="Condition"
              items={conditionOptions || []}
              placeholder="Select condition"
              disabled={conditionLoading}
              className="cursor-pointer"
            />
          </div>

          {/* Price, Rating and Instant Booking Section */}
          <div className="space-y-5 pt-4 border-t border-gray-200">
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-lg">
                <span>Price per day</span>
                <span>€{form.watch("price_per_day")}</span>
              </div>
              <SliderInput
                name="price_per_day"
                control={form.control}
                label=""
                min={0}
                max={2000}
                step={2}
                defaultValue={30}
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <span>Ratings</span>
                <span className="flex items-center gap-1.5">
                  <StarIcon className="size-5" />
                  {form.watch("rating")}
                </span>
              </div>
              <p>Browse vehicles rating</p>
              <SliderInput
                name="rating"
                control={form.control}
                label=""
                min={1}
                max={5}
                step={1}
                defaultValue={3}
              />
            </div>

            <div className="flex flex-row items-center justify-between rounded-lg cursor-pointer">
              <div className="space-y-0.5">
                <p className="text-base">Instant bookings</p>
                <p className="text-sm text-gray-500">
                  Browse vehicles that can be booked without host approval
                </p>
              </div>
              <Switch
                checked={form.watch("instant_bookings")}
                onCheckedChange={(checked) =>
                  form.setValue("instant_bookings", checked)
                }
              />
            </div>
          </div>

          <div className="py-5">
            <Button
              variant="cta"
              className="w-full"
              type="submit">
              Get Results
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
};

export default AllVehiclesFilterModal;

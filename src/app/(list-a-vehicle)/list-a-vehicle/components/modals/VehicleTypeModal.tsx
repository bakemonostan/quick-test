/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Modal } from "@/components/ui/modal";
import { useVehicleListingStore } from "@/app/(list-a-vehicle)/list-a-vehicle/vehicleListingstore";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormStepOneSchema, FormStepOneSchemaType } from "../../schema";
import {
  useCategories,
  useGetSubcategoriesByCategoryId,
  useGetSubcategoryId,
} from "@/hooks/hooks";
import { Form } from "@/components/ui/form";
import { SelectInput, TextInput } from "@/components/Form/FormFields";
import { Button } from "@/components/ui/button";
import { useModal } from "@/providers/ModalContext";
import { toast } from "sonner";
import {
  useGearboxDropdown,
  useFuelTypeDropdown,
  useMakes,
  useModels,
  useTransmissionDropdown,
  useTypes,
} from "@/services/dropdown";

export default function VehicleTypeModal() {
  const store = useVehicleListingStore();
  const form = useForm<FormStepOneSchemaType>({
    resolver: zodResolver(FormStepOneSchema),
    mode: "onChange",
    defaultValues: {
      sub_categories: store.selectedSubCategory || " ",
    },
  });

  const { closeModal } = useModal();
  const { categoryData } = useCategories();
  const selectedVehicleType = store.selectedVehicleType;
  form.watch("sub_categories");
  form.watch("type");
  form.watch("make");
  form.watch("model");

  useEffect(() => {
    const subCategory = form.getValues("sub_categories");
    if (subCategory) {
      store.setSelectedSubCategory(subCategory);
    }
  }, [form.watch("sub_categories")]);

  const { subCategories, subcategoriesLoading } =
    useGetSubcategoriesByCategoryId(categoryId()!);

  function categoryId() {
    if (!selectedVehicleType) return null;
    else {
      const category = categoryData?.find(
        (category) => category.name === selectedVehicleType
      );
      return category?.id;
    }
  }

  const subCategoryId = useGetSubcategoryId(
    categoryId()!,
    form.getValues("sub_categories")!
  );

  useEffect(() => {
    if (categoryId()) {
      store.setCategoryId(categoryId()!);
    }
  }, [selectedVehicleType, categoryData]);

  useEffect(() => {
    if (subCategoryId) {
      store.setSubcategoryId(subCategoryId);
    }
  }, [subCategoryId]);

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
  const { data: gearbox, isLoading: gearboxLoading } = useGearboxDropdown();
  const { data: transmission, isLoading: transmissionLoading } =
    useTransmissionDropdown();
  const { data: fuelType, isLoading: fuelTypeLoading } = useFuelTypeDropdown();

  const onSubmit = (data: FormStepOneSchemaType) => {
    store.setIsStepOneComplete(true);
    store.setIds({
      categoryId: categoryId()!,
      subcategoryId: subCategoryId!,
      typeId: typeId!,
      makeId: makeId!,
      modelId: modelId!,
    });
    store.setSelectedSubCategory(data.sub_categories);
    toast.success("Vehicle types added", {
      position: "top-right",
    });
    store.setFormOneValue(data);
    closeModal();
  };

  return (
    <Modal
      className="modal-md"
      id="vehicle-type-modal"
      title={selectedVehicleType || "Vehicle Details"}>
      <div className="space-y-5">
        <p className="body-2 text-black/60">Add your vehicle details</p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5">
            {subCategories?.length !== 0 ? (
              <SelectInput
                control={form.control}
                name="sub_categories"
                disabled={subcategoriesLoading}
                labelText="Sub Category"
                items={subCategories || []}
                placeholder="Sub Category"
                key="sub_categories"
              />
            ) : null}

            <SelectInput
              control={form.control}
              name="type"
              disabled={
                typesLoading || subcategoriesLoading || types?.length === 0
              }
              labelText="Type"
              items={types?.map((type) => type.name) || []}
              placeholder="Type"
              key="type"
            />

            <div className="grid grid-cols-2 gap-3">
              <SelectInput
                control={form.control}
                name="make"
                disabled={makesLoading}
                labelText="Make"
                items={makes?.map((make) => make.name) || []}
                placeholder="Make"
                key="make"
              />
              <SelectInput
                control={form.control}
                name="model"
                disabled={modelsLoading}
                labelText="Model"
                items={models?.map((model) => model.name) || []}
                placeholder="Model"
                key="model"
              />
              <TextInput
                name="year"
                control={form.control}
                label="Year"
                placeholder="Year"
                key="year"
              />
              <SelectInput
                control={form.control}
                name="fuel_type"
                disabled={fuelTypeLoading}
                labelText="Fuel Type"
                items={fuelType || []}
                placeholder="Fuel Type"
                key="fuel_type"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <SelectInput
                control={form.control}
                name="transmission"
                disabled={transmissionLoading}
                labelText="Transmission"
                items={transmission || []}
                placeholder="Transmission"
                key="transmission"
              />
              <SelectInput
                control={form.control}
                name="gearbox"
                disabled={gearboxLoading}
                labelText="Gearbox"
                items={gearbox || []}
                placeholder="Gearbox"
                key="gearbox"
              />
            </div>
            <div className="grid grid-cols-2 gap-3  pt-4">
              <Button
                type="button"
                variant="plain"
                onClick={() => {
                  store.setIsStepOneComplete(false);
                  closeModal();
                }}>
                Back
              </Button>
              <Button
                type="submit"
                variant="cta">
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  );
}

// TODO: Add a loading state for the vehicle types
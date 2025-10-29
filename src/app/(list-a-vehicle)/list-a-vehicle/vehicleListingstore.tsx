import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { AddressData } from "./utils/addressUtils";
import {
  FormStepFiveSchema,
  FormStepFourSchema,
  FormStepSixSchema,
  FormStepThreeSchema,
  FormStepTwoSchema,
} from "./schema";
import { z } from "zod";

type FormTwoValues = z.infer<typeof FormStepTwoSchema>;
type FormThreeValues = z.infer<typeof FormStepThreeSchema>;
type FormFourValues = z.infer<typeof FormStepFourSchema>;
type FormFiveValues = z.infer<typeof FormStepFiveSchema>;
type FormSixValues = z.infer<typeof FormStepSixSchema>;

interface ListAVehicleStore {
  name: string;
  currentStep: number;
  listingId: string;
  setListingId: (listingId: string) => void;
  ids: {
    categoryId: string;
    subcategoryId: string;
    typeId: string;
    makeId: string;
    modelId: string;
  };
  formOneValue: Record<string, string>;
  setFormOneValue: (formOneValue: Record<string, string>) => void;
  formTwoValue: Partial<FormTwoValues>;
  setFormTwoValue: (formTwoValue: Partial<FormTwoValues>) => void;
  formThreeValue: Partial<FormThreeValues>;
  setFormThreeValue: (formThreeValue: Partial<FormThreeValues>) => void;
  formFourValue: Partial<FormFourValues>;
  setFormFourValue: (formFourValue: Partial<FormFourValues>) => void;
  formFiveValue: Partial<FormFiveValues>;
  setFormFiveValue: (formFiveValue: Partial<FormFiveValues>) => void;
  formSixValue: Partial<FormSixValues>;
  setFormSixValue: (formSixValue: Partial<FormSixValues>) => void;
  totalSteps: number;
  blockedDates: {
    from: string;
    to: string;
  }[];
  setBlockedDates: (blockedDates: { from: string; to: string }[]) => void;
  categoryId: string;
  setCategoryId: (categoryId: string) => void;
  subcategoryId: string;
  setSubcategoryId: (subcategoryId: string) => void;
  selectedVehicleType: string | null;
  setSelectedVehicleType: (type: string | null) => void;
  selectedSubCategory: string | null;
  setSelectedSubCategory: (subCategory: string | null) => void;
  setCurrentStep: (currentStep: number) => void;
  isStepOneComplete: boolean;
  setIsStepOneComplete: (isComplete: boolean) => void;
  toggleMap: boolean;
  postal_code: string;
  address: AddressData;
  toggleCategoryAddressModal: boolean;
  setName: (name: string) => void;
  setPostalCode: (postal_code: string) => void;
  setAddress: (address: AddressData) => void;
  setToggleMap: (toggleMap: boolean) => void;
  setToggleCategoryAddressModal: (toggleCategoryAddressModal: boolean) => void;
  setIds: (ids: {
    categoryId: string;
    subcategoryId: string;
    typeId: string;
    makeId: string;
    modelId: string;
  }) => void;
  resetStore: () => void;
}
export const useVehicleListingStore = create<ListAVehicleStore>()(
  persist(
    (set) => ({
      name: "",
      ids: {
        categoryId: "",
        subcategoryId: "",
        typeId: "",
        makeId: "",
        modelId: "",
      },
      currentStep: 1,
      totalSteps: 6,
      listingId: "",
      formOneValue: {},
      formTwoValue: {},
      formThreeValue: { images: [] },
      formFourValue: {},
      formFiveValue: {},
      formSixValue: {},
      isStepOneComplete: false,
      categoryId: "",
      subcategoryId: "",
      selectedVehicleType: null,
      selectedSubCategory: null,
      postal_code: "",
      address: {
        street: "",
        city: "",
        state: "",
        postal_code: "",
        country: "",
      },
      toggleMap: false,
      toggleCategoryAddressModal: false,
      blockedDates: [],
      setBlockedDates: (blockedDates: { from: string; to: string }[]) =>
        set({ blockedDates: [...blockedDates] }),
      setListingId: (listingId: string) => set({ listingId }),
      setCurrentStep: (currentStep: number) => set({ currentStep }),
      setFormOneValue: (formOneValue: Record<string, string>) =>
        set({ formOneValue }),
      setIds: (ids: {
        categoryId: string;
        subcategoryId: string;
        typeId: string;
        makeId: string;
        modelId: string;
      }) => set({ ids }),
      setFormTwoValue: (formTwoValue: Partial<FormTwoValues>) =>
        set({ formTwoValue }),
      setFormThreeValue: (formThreeValue: Partial<FormThreeValues>) =>
        set({ formThreeValue }),
      setFormFourValue: (formFourValue: Partial<FormFourValues>) =>
        set({ formFourValue }),
      setFormFiveValue: (formFiveValue: Partial<FormFiveValues>) =>
        set({ formFiveValue }),
      setFormSixValue: (formSixValue: Partial<FormSixValues>) =>
        set({ formSixValue }),
      setIsStepOneComplete: (isStepOneComplete: boolean) =>
        set({ isStepOneComplete }),
      setSelectedVehicleType: (selectedVehicleType: string | null) =>
        set({ selectedVehicleType }),
      setSelectedSubCategory: (selectedSubCategory: string | null) =>
        set({ selectedSubCategory }),
      setName: (name: string) => set({ name }),
      setPostalCode: (postal_code: string) => set({ postal_code }),
      setAddress: (address: AddressData) => set({ address }),
      setToggleMap: (toggleMap: boolean) => set({ toggleMap }),
      setCategoryId: (categoryId: string) => set({ categoryId }),
      setSubcategoryId: (subcategoryId: string) => set({ subcategoryId }),
      setToggleCategoryAddressModal: (toggleCategoryAddressModal: boolean) =>
        set({ toggleCategoryAddressModal }),
      resetStore: () =>
        set({
          name: "",
          postal_code: "",
          selectedVehicleType: null,
          selectedSubCategory: null,
          subcategoryId: "",
          formTwoValue: {},
          formThreeValue: { images: [] },
          formFourValue: {},
          formFiveValue: {},
          formSixValue: {},
          currentStep: 1,
          categoryId: "",
          address: {
            street: "",
            city: "",
            state: "",
            postal_code: "",
            country: "",
          },
          toggleMap: false,
          isStepOneComplete: false,
        }),
    }),
    {
      name: "list-a-vehicle",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

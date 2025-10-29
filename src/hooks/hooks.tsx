import { getCategories } from "@/services/dropdown";
import useCustomQuery from "./mutations/useCustomQuery";

// Shared query configuration
const categoriesQueryOptions = {
  staleTime: Infinity,
  cacheTime: 1000 * 60 * 60 * 24,
};

export function useCategories() {
  const categories = useCustomQuery(
    ["categories"],
    getCategories,
    categoriesQueryOptions
  );
  const categoryNames = categories.data?.data.map((item) => item.name);
  const categoryData = categories.data?.data;
  return {
    categoryNames,
    categoryData,
    isLoading: categories.isLoading,
  };
}

export function useCategoryId(categoryName: string) {
  const categories = useCustomQuery(
    ["categories"],
    getCategories,
    categoriesQueryOptions
  );
  const category = categories.data?.data.find(
    (item) => item.name === categoryName
  );
  return category?.id;
}

export function useGetSubcategoriesByCategoryId(categoryId: string) {
  const categories = useCustomQuery(
    ["categories"],
    getCategories,
    categoriesQueryOptions
  );
  const category = categories.data?.data?.find((item) => item.id === categoryId);
  const subCategoryFields = category?.sub_categories?.map((item) => item); 
  const subCategories = category?.sub_categories?.map((item) => item.name);
  const subcategoryImages = category?.sub_categories?.map((item) => item.image);
  return {
    subCategories,
    subcategoryImages,
    subCategoryFields,
    subcategoriesLoading: categories.isLoading,
  };
}

export function useGetSubcategoryId(
  categoryId: string,
  subCategoryName: string
) {
  const categories = useCustomQuery(
    ["categories"],
    getCategories,
    categoriesQueryOptions
  );
  const category = categories.data?.data.find((item) => item.id === categoryId);
  const subCategory = category?.sub_categories.find(
    (item) => item.name === subCategoryName
  );
  return subCategory?.id;
}


import { useState, useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  getCategories,
  getTypes,
  getMakes,
  getModels,
  getGearboxDropdown,
  getFuelTypesDropdown,
  getTransmissionDropdown,
  getVehicleConditionDropdown,
  getVehicleFeatures,
  getEquippedWith
} from '@/services/dropdown';
import { useVehicleListingStore } from '@/app/(list-a-vehicle)/list-a-vehicle/vehicleListingstore';
import { SubCategories } from '@/services/types';

const ONE_HOUR = 1000 * 60 * 60;
const ONE_DAY = 1000 * 60 * 60 * 24;

interface UseVehicleDropdownsProps {
  selectedVehicleType?: string | null;
  loadGearbox?: boolean;
  loadTransmission?: boolean;
  loadFuelType?: boolean;
  loadVehicleCondition?: boolean;
  loadEquippedWith?: boolean;
}


export function useVehicleDropdowns({ 
  selectedVehicleType,
  loadGearbox = false,
  loadTransmission = false,
  loadFuelType = false,
  loadVehicleCondition = false,
  loadEquippedWith = false
}: UseVehicleDropdownsProps = {}) {
  const store = useVehicleListingStore()
  const [catId, setCatId] = useState<string | undefined>(undefined);
  const [typeId, setTypeId] = useState<string | undefined>(undefined);
  const [makeId, setMakeId] = useState<string | undefined>(undefined);

  // Gearbox Dropdown - only load when needed
  const { data: gearboxData } = useQuery({
    queryKey: ['gearbox'],
    queryFn: getGearboxDropdown,
    staleTime: ONE_HOUR,
    gcTime: ONE_DAY,
    enabled: loadGearbox
  });
  
  const gearboxDropdown = useMemo(() => {
    return gearboxData || [];
  }, [gearboxData]);

  // Transmission Dropdown - only load when needed
  const { data: transmissionData } = useQuery({
    queryKey: ['transmission'],
    queryFn: getTransmissionDropdown,
    staleTime: ONE_HOUR,
    gcTime: ONE_DAY,
    enabled: loadTransmission
  });
  
  const transmissionOptions = useMemo(() => {
    return transmissionData || [];
  }, [transmissionData]);

  // Fuel Type Dropdown - only load when needed
  const { data: fuelTypeData } = useQuery({
    queryKey: ['fuel-type'],
    queryFn: getFuelTypesDropdown,
    staleTime: ONE_HOUR,
    gcTime: ONE_DAY,
    enabled: loadFuelType
  });
  
  const fuelTypeOptions = useMemo(() => {
    return fuelTypeData || [];
  }, [fuelTypeData]);

  // Vehicle Condition Dropdown - only load when needed
  const { data: vehicleConditionData } = useQuery({
    queryKey: ['vehicle-conditon'],
    queryFn: getVehicleConditionDropdown,
    staleTime: ONE_HOUR,
    gcTime: ONE_DAY,
    enabled: loadVehicleCondition
  });
  
  const vehicleCondition = useMemo(() => {
    return vehicleConditionData || [];
  }, [vehicleConditionData]);

  // Categories are always loaded as they're the base data
  const {
    data: categoryData,
    refetch: refetchCategories,
    isLoading: isLoadingCategories
  } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
    refetchOnWindowFocus: true,
    refetchOnMount: true
  });

  const categoryName = useMemo(() => {
    return categoryData?.data?.map((item) => item.name);
  }, [categoryData]);

  const categoryDataTypes = useMemo(() => {
    return categoryData?.data?.map((item) => item.types);
  }, [categoryData]);

  const categoryDataSubCategories = useMemo(() => {
    return categoryData?.data?.map((item) => item.sub_categories);
  }, [categoryData]);

  const subcategoryList = useMemo<SubCategories[]>(() => {
    return (
      categoryData?.data?.flatMap((category) =>
        category.sub_categories.map((subcat) => ({
          ...subcat,
          categoryName: category.name
        }))
      ) || []
    );
  }, [categoryData]);

  // Types are loaded only when a category is selected
  const { data: typesData, refetch: refetchTypes } = useQuery({
    queryKey: ['types', catId],
    queryFn: () => getTypes(catId),
    enabled: !!catId
  });

  // Using an empty string for categoryId if it doesn't exist on the store
  
  // Vehicle features are loaded only when a category is selected
  const { data: vehicleFeatures } = useQuery({
    queryKey: ['vehicle-features', store.subcategoryId],
    queryFn: () => getVehicleFeatures(store.subcategoryId),
    enabled: !!store.subcategoryId
  });

  // Equipped with data is loaded on demand
  const { data: equippedWithData, isLoading: loadingEquippedWith } = useQuery({
    queryKey: ['equipped-with'],
    queryFn: getEquippedWith,
    enabled: loadEquippedWith
  });

  const equippedWith = useMemo(() => {
    return equippedWithData?.data?.data;
  }, [equippedWithData]);

  const camperCheckboxes = useMemo(() => {
    if (!equippedWith) return [];
    return [
      {
        equipment_type: 'basics',
        title: 'Basic Camper Features',
        items: equippedWith.basics || []
      },
      {
        equipment_type: 'kitchen',
        title: 'Kitchen Feature',
        items: equippedWith.kitchen || []
      },
      {
        equipment_type: 'tech',
        title: 'Technological Features',
        items: equippedWith.tech || []
      },
      { equipment_type: 'extras', title: 'Extra features', items: equippedWith.extras || [] }
    ];
  }, [equippedWith]);

  const foodTruckCheckboxes = useMemo(() => {
    if (!equippedWith) return [];
    return [
      {
        equipment_type: 'kitchen',
        title: 'Kitchen Feature',
        items: equippedWith.kitchen || []
      },
      {
        equipment_type: 'kind_of_food',
        title: 'Kind of food',
        items: equippedWith.kind_of_food || []
      }
    ];
  }, [equippedWith]);

  const caravanCheckboxes = useMemo(() => {
    if (!equippedWith) return [];
    return [
      {
        equipment_type: 'basics',
        title: 'Basic Camper Features',
        items: equippedWith.basics || []
      },
      { equipment_type: 'extras', title: 'Extra features', items: equippedWith.extras || [] }
    ];
  }, [equippedWith]);

  // Makes are loaded only when a type is selected
  const { data: makesData, refetch: refetchMakes } = useQuery({
    queryKey: ['makes', typeId],
    queryFn: () => getMakes(typeId),
    enabled: !!typeId
  });

  // Models are loaded only when a make is selected
  const { data: modelsData, refetch: refetchModels } = useQuery({
    queryKey: ['models', makeId],
    queryFn: () => getModels(makeId),
    enabled: !!makeId
  });

  const subCategories = useMemo(() => {
    if (!selectedVehicleType || !categoryData?.data) {
      return [];
    }
    return categoryData.data
      .find((item) => selectedVehicleType === item.name)
      ?.sub_categories.map((item) => item.name);
  }, [categoryData, selectedVehicleType]);

  useEffect(() => {
    if (!selectedVehicleType || !categoryData?.data) return;
    const category = categoryData.data.find((category) => selectedVehicleType === category.name);
    if (category) {
      setCatId(category.id);
      refetchTypes();
    }
  }, [selectedVehicleType, categoryData, refetchTypes, store]);

  const typeOptions = useMemo(() => {
    if (typesData) {
      return typesData.map((type) => type.name);
    }
    return [];
  }, [typesData]);

  return {
    categoryData,
    categoryDataSubCategories,
    categoryDataTypes,
    typesData,
    categoryName,
    makesData,
    modelsData,
    catId,
    typeId,
    refetchCategories,
    vehicleCondition,
    vehicleFeatures,
    transmissionOptions,
    fuelTypeOptions,
    isLoadingCategories,
    makeId,
    refetchTypes,
    equippedWith,
    camperCheckboxes,
    foodTruckCheckboxes,
    caravanCheckboxes,
    loadingEquippedWith,
    refetchMakes,
    refetchModels,
    subCategories,
    gearboxDropdown,
    subcategoryList,
    typeOptions,
    setCatId,
    setTypeId,
    setMakeId
  };
} 

import api from "@/config/api";
import { ApiResponse, handleGet } from "@/utils/general";
import {
  Catergory,
  DropDataType,
  EquippedWithData,
  Features,
  Make,
  Model,
  SubCategories,
  TypeData,
} from "./types";
import useCustomQuery from "@/hooks/mutations/useCustomQuery";

export const getCategories = async () => {
  const res = await api.get<ApiResponse<Catergory[]>>("/dropdown/category");
  const data = res.data;
  return data;
};


export const getTypes = async (categoryID: string | undefined) => {
  const data = await api.get<ApiResponse<TypeData[]>>(
    `/dropdown/type/${categoryID}`
  );
  return data.data.data;
};

export const getGearboxDropdown = async () => {
  const data = await api.get<ApiResponse<DropDataType[]>>(`/dropdown/gearbox`);
  return data.data.data;
};

export const getFuelTypesDropdown = async () => {
  const data = await api.get<ApiResponse<DropDataType[]>>(`/dropdown/fuel-type`);
  return data.data.data;

};

export const getVehicleConditionDropdown = async () => {
  const data = await api.get<ApiResponse<DropDataType[]>>(`/dropdown/conditions`);
  return data.data.data;
};

export function useVehicleConditionDropdown() {
  return useCustomQuery(["vehicle-condition"], () => getVehicleConditionDropdown(), {
    enabled: true,
  });
}

export const getTransmissionDropdown = async () => {
  const data = await api.get<ApiResponse<DropDataType[]>>(`/dropdown/transmission`);
  return data.data.data;
};
export const getVehicleFeatures = async (id: string) => {
  return api.get<ApiResponse<SubCategories[]>>(`/dropdown/feature/${id}`);
};

export const getMakes = async (typeId: string | undefined) => {
  const data = await api.get<ApiResponse<Make[]>>(`/dropdown/make/${typeId}`);
  return data.data.data;
};

export const getModels = async (typeId: string | undefined) => {
  const data = await api.get<ApiResponse<Model[]>>(`/dropdown/model/${typeId}`);
  return data.data.data;
};

export const getEquippedWith = async () => {
  return api.get<ApiResponse<EquippedWithData>>(`/dropdown/equipped-with`);
};

export const getFeatures = async () => {
  return handleGet<Features[]>("/dropdown/feature");
};

export function useTypes(categoryId: string) {
  return useCustomQuery(["types", categoryId], () => getTypes(categoryId), {
    enabled: !!categoryId,
  });

}

export function useMakes(typeId: string) {
  return useCustomQuery(["makes", typeId], () => getMakes(typeId), {
    enabled: !!typeId,
  });
}

export function useModels(typeId: string) {
  return useCustomQuery(["models", typeId], () => getModels(typeId), {
    enabled: !!typeId,
  });
  
}

export function useGearboxDropdown() {
  return useCustomQuery(["gearbox"], () => getGearboxDropdown(), {
    enabled: true,
  });
}

export function useTransmissionDropdown() {
  return useCustomQuery(["transmission"], () => getTransmissionDropdown(), {
    enabled: true,
  });
}


export function useFuelTypeDropdown() {
  return useCustomQuery(["fuel-type"], () => getFuelTypesDropdown(), {
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false
  });
}


export interface RegistrationFormData {
  first_name: string;
  last_name: string;
  telephone: string;
  email: string;
}

export interface LoginResponse {
  email: string;
  token?: string;
}

export interface VerifyTokenResponse {
  token: string;
  message: string;
}



export interface SubCategories {
  id: string
  name: string
  image: string | null
}

export interface Catergory {
  id: string
  name: string
  sub_categories: SubCategories[]
  types: SubCategories[]
  image: string | null
}

export interface EquippedWithData {
  tech: string[]
  kitchen: string[]
  kind_of_food: string[]
  extras: string[]
  basics: string[]
}

export interface TypeData {
  id: string
  name: string
  image: string | null
  category: Catergory
}

export interface Make {
  id: string
  name: string
  image: string | null
  type: TypeData
}

export interface Model {
  id: string
  name: string
  image: string | null
  make: Make
}

export type DropDataType = string

export interface Features extends Catergory {
  id: string
  name: string
  image: string | null
  category: Catergory
}



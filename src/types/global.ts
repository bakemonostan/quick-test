import { type Feature } from './dashboard';
export interface ApiResponse<T> {
  message: string
  status: boolean
  data: T
}

export type StatusBadgeProps = {
  status: "success" | "pending" | "review" | "cancelled" | "active" | "paused" | "not approved";
  label?: string;
  size?: "sm" | "md" | "lg" | "xl";
};

interface Category {
  id: string
  name: string
  image: string | null
}

interface Type {
  id: string
  name: string
  image: string | null
}

interface Make {
  id: string
  name: string
  image: string | null
}

interface Model {
  id: string
  name: string
  image: string | null
  make: Make
}

interface Image {
  id: string
  image: string
}

interface Specification {
  id: string
  vehicle_condition: string
  vehicle_status: string
  engine_cylinders: string
  engine_hp: string
  exterior_color: string
  interior_color: string
  interior_material: string
  num_seat: number
  front_seat_belt: string
  back_seat_belt: string
  fire_extinguisher: string
  valid_mot: string
  light_brake_tires: string
  insurance: string
}

interface TravelFeature {
  id: string
  driver_license_category: string
  who_can_drive: string
  travel_abroad_allowed: string
  vehicle_features: string[]
  rule: string
  smoking_allowed: string
  pets_allowed: string
  minimum_age: number
  festival_allowed: string
  feature: string[]
  features: Feature[]
}

interface RentalRate {
  id: string
  daily_rate: string
  weekly_rate: string
  monthly_rate: string
  security_deposit: string
  cleaning_fee: string | null
  advance_notice: number
  max_trip_duration: number
  availability: string | null
  min_trip_duration: number
  weekly_mileage_limit: string | null
  cost_per_km: string
}

interface UnavailabilityPeriod {
  to: string
  from: string
}

interface Record {
  id: string
  title: string
  description: string
  status: string
  year: string
  location: string
  location_lat: number | null
  location_lng: number | null
  transmission: string
  fuel_type: string
  gear_box: string
  discounted: string | null
  discount: string | null
  category: Category
  type: Type
  make: Make
  model: Model
  images: Image[]
  specification: Specification
  travel_feature: TravelFeature
  rental_rate: RentalRate
  unavailability_period: UnavailabilityPeriod[]
}

export interface SavedVehicleDetails {
  message: string
  status: boolean
  data: Record
}

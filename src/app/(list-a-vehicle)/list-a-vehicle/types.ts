interface AddressFormTextInputs {
  label: string;
  name: string;
}

export const AddressFormTextInputs: AddressFormTextInputs[] = [
  {
    label: "City",
    name: "city",
  },
  {
    label: "State",
    name: "state",
  },
  {
    label: "Postal Code",
    name: "postal_code",
  },
  {
    label: "Country",
    name: "country",
  },
];

// Location types
interface Coordinates {
  lat: number;
  lng: number;
}

export interface Location {
  street: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  coordinates: Coordinates;
}

// Category and related types
interface Category {
  id: string;
  name: string;
  image: string | null;
}

interface Make {
  id: string;
  name: string;
  image: string | null;
}

interface Model {
  id: string;
  name: string;
  image: string | null;
  make: Make;
}

// Image type
interface VehicleImage {
  id: string;
  image: string;
}

// Specification type
interface Specification {
  id: string;
  vehicle_condition: string;
  vehicle_status: string;
  engine_cylinders: string;
  engine_hp: string;
  exterior_color: string;
  interior_color: string;
  interior_material: string;
  num_seat: number;
  front_seat_belt: string;
  back_seat_belt: string;
  fire_extinguisher: string;
  valid_mot: string;
  light_brake_tires: string;
  insurance: string;
}

// Travel feature types
interface Feature {
  id: string;
  name: string;
}

interface TravelFeature {
  id: string;
  driver_license_category: string;
  who_can_drive: string;
  travel_abroad_allowed: string;
  rule: string;
  smoking_allowed: string;
  pets_allowed: string;
  minimum_age: number;
  festival_allowed: string;
  features: Feature[];
}

// Rental rate type
interface RentalRate {
  id: string;
  daily_rate: string;
  weekly_rate: string;
  monthly_rate: string;
  security_deposit: string;
  cleaning_fee: string | null;
  advance_notice: number;
  max_trip_duration: number;
  availability: string | null;
  min_trip_duration: number;
  weekly_mileage_limit: string | null;
  cost_per_km: string;
}

// Unavailability period type
interface UnavailabilityPeriod {
  to: string;
  from: string;
}

// Host type
interface Host {
  profile_picture: string | null;
  name: string;
  joined: string;
}

// Deactivation type
interface Deactivation {
  reason: string | null;
  date: string | null;
  deactivated_by: string | null;
}

// Main vehicle data type
export interface VehicleData {
  id: string;
  title: string;
  description: string;
  status: string;
  year: string;
  location: string; // JSON string
  location_lat: string;
  location_lng: string;
  transmission: string;
  fuel_type: string;
  gear_box: string;
  discounted: string | null;
  discount: string | null;
  category: Category;
  type: Category;
  make: Make;
  model: Model;
  images: VehicleImage[];
  specification: Specification;
  travel_feature: TravelFeature;
  rental_rate: RentalRate;
  unavailability_period: UnavailabilityPeriod[];
  host_by: Host;
  deactivation: Deactivation;
  activation_status: boolean;
}

// API response type
export interface VehicleResponse {
  message: string;
  status: boolean;
  data: VehicleData;
}


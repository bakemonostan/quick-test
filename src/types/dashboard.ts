export interface ProfilePageData {
  id: string
  legal_name: string
  address: string
  email: string
  telephone: string
  bio: string
  picture: string | null
  review: unknown[]
  renter_identification: boolean
  bank_verification: boolean
}

export interface ViewDashBoard {
  details: {
    legal_name: string
    email: string
    profile_picture: string
  }
  completed_trips: number
  upcoming_trips: number
  pending_reviews: number
  total_bookings: number
  upcoming_bookings: number
  total_earnings: number
}

export interface VehicleListingTableData {
  id: string
  title: string
  make: string
  model: string
  year: string
  status: 'active' | 'pending' | 'paused' | 'rejected'
  vehicle_type: string
  image: string
  date: string
}

export interface imgData {
  id: string
  image: string
  vehicle_id: string
  created_at: string
  updated_at: string
  deleted_at: string
}

export interface VehicleListingDetailsData {
  id: string
  title: string,
  status: 'active' | 'pending' | 'paused' | 'not approved' | 'review'
  upcoming_booking: number
  total_payout: number
  make: string
  model: string
  year: string
  daily_rate: string
  weekly_rate: string
  monthly_rate: string
  security_deposit: string
  images: imgData[]
  cleaning_fee: string
}

export interface RequestTableData {
  id: string
  title: string
  booking_id: string
  total_amount: string
  status: 'active' | 'pending' | 'paused' | 'not approved'
  date: string
  image: string
  vehicle: VehicleListingTableData
}
export interface RequestDetailsData {
  id: string
  booking_id: string
  total_amount: string
  charges: string
  num_days: number
  rental_fee: number
  cleaning_fee: string
  discount: string | null
  pick_up_instruction: string
  status: 'confrimed' | 'cancelled'
  from_date: string
  to_date: string
  host_profile: HostProfile
  date: string
  image: string
  vehicle: Vehicle

}
export interface BookingsTableData {
  id: string
  booking_id: string
  title: string
  total_amount: string
  status: 'confirmed' | 'cancelled'
  date: string
  image: string
  vehicle: VehicleListingTableData
}
export interface BookingDetailsData {
  id: string
  title: string
  booking_id: string
  total_amount: string
  charges: string
  num_days: string
  rental_fee: string
  cleaning_fee: string
  discount: string
  pick_up_instruction: string
  status: string
  date: string
  image: string
  vehicle: Omit<Vehicle, 'condition'>
}

export interface UserData {
  id: string
  legal_name: string
  address: string
  email: string
  telephone: string
  bio: string
  picture: string | null
  reviews: unknown[]
  renter_identification: boolean
  bank_verification: boolean
}

// export type ListedBy =
export interface HostProfile {
  id: string
  profile_picture: string | null
  bio: string | null
  name: string
  rating: string | null
  verified_at: string | null
}

export interface UnavailabilityPeriod {
  from: string
  to: string
}

export interface Vehicle {
  id: string
  title: string
  description: string
  status: 'active' | 'pending' | 'paused' | 'not approved'
  year: string
  host?: {
    joined: string
    name: string
    profile_picture: string
  }
  host_by?: {
    joined: string
    name: string
    profile_picture: string
  }
  unavailability_period: UnavailabilityPeriod[]
  location: string
  location_lat: string | null
  location_lng: string | null
  condition: string
  transmission: string
  fuel_type: string
  gear_box: string
  images: imgData[]
  unavailability?: UnavailabilityPeriod[]
  discounted: string | null
  discount: string | null
  category: VehicleCategory
  type: VehicleType
  make: VehicleMake
  model: VehicleModel
  specification: VehicleSpecification
  travel_feature: TravelFeature
  rental_rate: RentalRate
}

export interface VehicleCategory {
  id: string
  name: string
  image: string | null
}

export interface VehicleType {
  id: string
  name: string
  image: string | null
  category: VehicleCategory
}

export interface VehicleMake {
  id: string
  name: string
  image: string | null
  type: VehicleType
}

export interface VehicleModel {
  id: string
  name: string
  image: string | null
  make: VehicleMake
}

export interface VehicleSpecification {
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

export interface Feature{
  id: string,
  name: string,
}

export interface TravelFeature {
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

export interface RentalRate {
  id: string
  daily_rate: number
  weekly_rate: number
  monthly_rate: number
  security_deposit: number
  cleaning_fee: number
  advance_notice: number
  max_trip_duration: number
  availability: string | null
  min_trip_duration: number
  weekly_mileage_limit: string
  cost_per_km: string
}

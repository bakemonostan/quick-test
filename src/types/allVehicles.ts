export interface VehicleImage {
  id: string
  image: string
  vehicle_id: string
  created_at: string
  updated_at: string
  deleted_at: string | null
}

export interface UnavailabilityPeriod {
  to: string
  from: string
}

export interface Availability {
  id: string
  vehicle_id: string
  travel_abroad_allowed: boolean | null
  unavailability_period: UnavailabilityPeriod[]
  created_at: string
  updated_at: string
  deleted_at: string | null
}

export interface Vehicle {
  id: string
  make: string
  title: string
  model: string
  year: string
  location: string
  features: string[]
  condition: string
  transmission: string
  fuel_type: string
  gear_box: string
  vehicle_type: string
  discounted: string | null
  discount: string | null
  image: VehicleImage[]
  daily_rate: string
  availability: Availability
}

export interface Link {
  url: string | null
  label: string
  active: boolean
}

export interface Meta {
  current_page: number
  from: number
  last_page: number
  links: Link[]
  path: string
  per_page: number
  to: number
  total: number
}

export interface FilterableVehicles {
  data: Vehicle[]
  links: {
    first: string
    last: string
    prev: string | null
    next: string | null
  }
  meta: Meta
}

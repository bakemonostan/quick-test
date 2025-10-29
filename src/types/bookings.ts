export interface BookingComplete {
  id: 'string'
  booking_id: 'string'
  total_amount: 'string'
  status: 'string'
  date: 'string'
  image: 'string'
  vehicle: {
    id: 'string'
    make: 'string'
    model: 'string'
    year: 'string'
    status: 'string'
    vehicle_type: 'string'
    image: 'string'
    date: 'string'
  }
}

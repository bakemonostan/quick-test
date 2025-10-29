export interface VehicleDetailsFormData {
  location: string
  category: string
  city: string
  state: string
  country: string
  type: string
  make: string
  model: string
  year: string
  fuel_type: string
  transmission: string
  gearbox: string
}

//
// export const StepOneFormFields = {
//   type: {
//     label: 'Type',
//     items: [
//       'Car',
//       'Camper or Caravan',
//       'Bus or Food Truck',
//       'Aviation/AirCraft',
//       'Historical Army Vehicle',
//       'Two Wheelers'
//     ]
//   },
//   make: {
//     label: 'Make',
//     items: ['Toyota', 'Honda', 'Ford']
//   },
//   model: {
//     label: 'Model',
//     items: ['Camry', 'Civic', 'F-150']
//   },
//   year: {
//     label: 'Year',
//     items: ['2020', '2021', '2022']
//   },
//   fuel_type: {
//     label: 'Fuel Type',
//     items: ['Petrol', 'Diesel', 'Gas']
//   },
//   transmission: {
//     label: 'Transmission',
//     items: ['All Wheel Drive', 'Front Wheel Drive']
//   },
//   gearbox: {
//     label: 'Gearbox',
//     items: ['Automatic', 'Semi Automatic', 'Manual']
//   }
// }

export const TechniclSpecifications = [
  {
    name: 'status',
    label: 'Vehicle status',
    items: ['static', 'drivable']
  },
  {
    name: 'engine_cylinder',
    label: 'Engine cylinders',
    items: [
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '10'
    ]
  },
  // {
  //   name: 'engine_horsepower',
  //   label: 'Engine horsepower',
  //   items: ['active', 'banned']
  // }
]

export const PhysicalAttributes = [
  {
    name: 'exterior_colour',
    label: 'External Color',
    items: ['Red', 'Blue', 'Black', 'White', 'Silver']
  },
  {
    name: 'interior_colour',
    label: 'Interior Color',
    items: ['Black', 'Beige', 'Gray']
  },
  {
    name: 'interior_material',
    label: 'Interior material',
    items: ['Leather', 'Fabric', 'Vinyl']
  },
  {
    name: 'seat_number',
    label: 'Number of Seats',
    items: [
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '10',
      '11',
      '12',
      '13',
      '14',
      '15',
      '16',
      '17',
      '18',
      '19',
      '20',
    ]
  }
]

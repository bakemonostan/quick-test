import { z } from "zod";

interface VehicleTypeModelInputs {
  name: string;
  type: string;
  required: boolean;
  options: string[];
  isGrid?: boolean;
}

export const VehicleTypeModelInputs: VehicleTypeModelInputs[] = [];

export const ConditionEnum = z.enum([
  "like new condition, mint, showroom",
  "very good condition, traces of usage, Light wear on paint and interior",
  "visible traces of usage, rust and/or patina, drivable with valid MOT",
  "non drivable, restoration project/static",
]);

export interface FormInput {
  name: string;
  label: string;
  items: string[];
}

export const TechnicalSpecifications: FormInput[] = [
  {
    name: "status",
    label: "Vehicle status",
    items: ["static", "drivable"],
  },
  {
    name: "engine_cylinder",
    label: "Engine cylinders",
    items: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
  },
];

export const PhysicalAttributes: FormInput[] = [
  {
    name: "exterior_colour",
    label: "External Color",
    items: ["Red", "Blue", "Black", "White", "Silver"],
  },
  {
    name: "interior_colour",
    label: "Interior Color",
    items: ["Black", "Beige", "Gray"],
  },
  {
    name: "interior_material",
    label: "Interior material",
    items: ["Leather", "Fabric", "Vinyl"],
  },

];

export interface RadioInput {
  name: string;
  label: string;
  groupWithNext?: boolean;
}

export const SpecialFeatures: RadioInput[] = [
  {
    name: "light_brake_tires",
    label: "Are lights, brakes and tires all in good order?",
  },
  {
    name: "front_seat",
    label: "Front seat seatbelts?",
    groupWithNext: true,
  },
  {
    name: "back_seat",
    label: "Back seat seatbelts?",
  },
  {
    name: "fire_extinguisher",
    label: "Do you have fire extinguishers installed?",
  },
  {
    name: "mot",
    label: "MOT valid?",
  },
  {
    name: "insurance",
    label: "Do you have valid insurance for your vehicle?",
  },
];

export const radioOptions = ["true", "false"];

// Form Step Four constants
export const fieldItems = [
  { name: "daily_rate" as const, label: "Daily rates in Euro (€)" },
  { name: "weekly_rate" as const, label: "Weekly rates in Euro (€)" },
  { name: "monthly_rate" as const, label: "Monthly rates in Euro (€)" },
];

export const radioGroupLabels = [
  { label: "Accept instant bookings", value: "true" },
  {
    label: "Only booking requests (You will need to approve all bookings)",
    value: "false",
  },
];

export const radioGroupDisplayLabels = [
  "Accept instant bookings",
  "Only booking requests (You will need to approve all bookings)",
];

// Form Step Five options
export const driverOptions = [
  'owner', 'renter'
];

export const licensingOptions = [
  'A', 'A1', 'A2', 'B', 'BE', 'C', 'C1', 'CE', 'C1E', 'D', 'D1', 'F', 'NONE'
];

export const formFiveRadioOptions = ["true", "false"];

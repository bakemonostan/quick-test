const formatSpecKey = (key: string) => {
  return key
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const formatSpecLabel = (key: string) => {
  switch (key) {
    case "vehicle_condition":
      return "Vehicle Condition";
    case "vehicle_status":
      return "Vehicle Status";
    case "engine_cylinders":
      return "Engine Cylinders";
    case "engine_hp":
      return "Engine Horsepower";
    case "exterior_color":
      return "Exterior Color";
    case "interior_color":
      return "Interior Color";
    case "interior_material":
      return "Interior Material";
    case "num_seat":
      return "Number of Seats";
    default:
      return formatSpecKey(key);
  }
};

const formatSafetySpec = (key: string) => {
  switch (key) {
    case "front_seat_belt":
      return "Front seat belts";
    case "back_seat_belt":
      return "Back seat belts";
    case "fire_extinguisher":
      return "Fire extinguisher";
    case "valid_mot":
      return "Valid MOT certification";
    case "light_brake_tires":
      return "Lights, brakes and tires in good condition";
    case "insurance":
      return "Vehicle is insured";
    case "!insurance":
      return "Vehicle is not insured";
    default:
      return formatSpecKey(key);
  }
};

const formatTravelFeature = (key: string) => {
  switch (key) {
    case "travel_abroad_allowed":
      return "Travel Abroad is allowed";
    case "smoking_allowed":
      return "Smoking is allowed";
    case "pets_allowed":
      return "Pets are allowed";
    case "festival_allowed":
      return "Festival Use is allowed";
    default:
      return formatSpecKey(key);
  }
};

const safetyKeys = [
  "front_seat_belt",
  "back_seat_belt",
  "fire_extinguisher",
  "valid_mot",
  "light_brake_tires",
  "insurance",
] as const;

const generalSpecKeys = [
  "vehicle_condition",
  "vehicle_status",
  "engine_cylinders",
  "engine_hp",
  "exterior_color",
  "interior_color",
  "interior_material",
  "num_seat",
] as const;

export {
  formatSpecKey,
  formatSpecLabel,
  formatSafetySpec,
  formatTravelFeature,
  safetyKeys,
  generalSpecKeys,
};

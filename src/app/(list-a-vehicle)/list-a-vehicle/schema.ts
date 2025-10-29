import { z } from "zod";

export const ConditionEnum = z.enum([
  "like new condition, mint, showroom",
  "very good condition, traces of usage, Light wear on paint and interior",
  "visible traces of usage, rust and/or patina, drivable with valid MOT",
  "non drivable, restoration project/static",
]);

export const StatusEnum = z.enum(["static", "drivable"]);

export const UnavailabiltyFormSchema = z
  .object({
    from: z.string({
      required_error: "Pick up date is required",
    }),
    to: z.string({
      required_error: "Return date is required",
    }),
  })
  .refine(
    ({ from, to }) => {
      return new Date(from) < new Date(to);
    },
    {
      message: "Pick up date must be before the return date",
      path: ["to"],
    }
  );

export type UnavailabiltyFormSchemaType = z.infer<
  typeof UnavailabiltyFormSchema
>;

export const AddressSchema = z.object({
  street: z.string().min(1, { message: "Street address is required" }),
  city: z.string().min(1, { message: "City is required" }),
  state: z.string().min(1, { message: "State/Region is required" }),
  postal_code: z.string().min(1, { message: "Postal code is required" }),
  country: z.string().min(1, { message: "Country is required" }),
});

export type AddressSchemaType = z.infer<typeof AddressSchema>;

export const FormStepOneSchema = z.object({
  sub_categories: z.string({
    required_error: "Please select a sub-category",
  }),
  type: z.string({
    required_error: "Please select a Type",
  }),
  make: z.string({
    required_error: "Please enter the vehicle make",
  }),
  model: z.string({
    required_error: "Please enter the vehicle model",
  }),
  year: z.string({
    required_error: "Please enter the year",
  }),
  fuel_type: z.string({
    required_error: "Please select a fuel type",
  }),
  transmission: z.string({
    required_error: "Please select a transmission type",
  }),
  gearbox: z.string({
    required_error: "Please select a gearbox type",
  }),
});

export type FormStepOneSchemaType = z.infer<typeof FormStepOneSchema>;

// Step 2
export const FormStepTwoSchema = z.object({
  condition: ConditionEnum,
  status: StatusEnum,
  engine_cylinder: z.string({
    required_error: "Please select an option",
  }),
  engine_horsepower: z.string({
    required_error: "Please enter a valid horsepower",
  }),
  exterior_colour: z.string({
    required_error: "Please select a color",
  }),
  seat_number: z.coerce.number({
    required_error: "Please select an option",
  }),
  exterior_colour_metallic: z.string().optional().default(""),
  interior_colour: z.string({
    required_error: "Please select an option",
  }),
  interior_material: z.string({
    required_error: "Please select an option",
  }),
  front_seat: z
    .string({
      required_error: "Please Pick an option",
    })
    .transform((value) => value === "true"),
  back_seat: z
    .string({
      required_error: "Please Pick an option",
    })
    .transform((value) => value === "true"),
  fire_extinguisher: z
    .string({
      required_error: "Please Pick an option",
    })
    .transform((value) => value === "true"),
  mot: z
    .string({
      required_error: "Please Pick an option",
    })
    .transform((value) => value === "true"),
  insurance: z
    .string({
      required_error: "Please pick an option",
    })
    .transform((value) => value === "true"),
  light_brake_tires: z.string().transform((value) => value === "true"),
  vehicle_features: z.array(z.string()).optional().default(["None"]),
  placed_onsite: z.coerce.boolean().optional().default(true),
  is_static: z.coerce.boolean().optional().default(true),
  length: z.number().optional(),
  height: z.number().optional(),
  weight: z.number().optional(),
  sleeping_places: z.number().optional().default(0),
  average_distance_on_battery: z.number().optional().default(0),
  equipped_with: z.record(z.array(z.string())).optional().default({}),
  aviation: z.string().optional().default(""),
});

// Step 3
export const FormStepThreeSchema = z.object({
  images: z
    .array(z.string())
    .min(6, { message: "Please upload all 6 images" })
    .refine((images) => images.length === 6, {
      message: "Please upload all 6 images",
      path: ["images"],
    }),
});

export type FormStepTwoSchemaType = z.infer<typeof FormStepTwoSchema>;

export const FormStepFourSchema = z
  .object({
    daily_rate: z
      .number({
        invalid_type_error: "Daily rate must be a number",
        required_error: "Daily rate is required",
      })
      .nonnegative("Daily rate must be at least 1")
      .min(1, "Minimum daily rate is 1"),
    weekly_rate: z
      .number({
        invalid_type_error: "Weekly rate must be a number",
        required_error: "Weekly rate is required",
      })
      .nonnegative("Weekly rate must be at least 1")
      .min(1, "Minimum weekly rate is 1"),
    monthly_rate: z
      .number({
        invalid_type_error: "Monthly rate must be a number",
        required_error: "Monthly rate is required",
      })
      .nonnegative("Monthly rate must be at least 1")
      .min(1, "Minimum monthly rate is 1"),
    advance_notice: z
      .number({
        invalid_type_error: "Advance notice must be a number",
        required_error: "Advance notice is required",
      })
      .nonnegative("Advance notice must be at least 1")
      .min(1, "Minimum advance notice is 1"),
    min_trip_duration: z
      .number({
        invalid_type_error: "Minimum trip duration must be a number",
        required_error: "Minimum trip duration is required",
      })
      .nonnegative("Minimum trip duration must be at least 1")
      .min(1, "Minimum trip duration is 1"),
    max_trip_duration: z
      .number({
        invalid_type_error: "Maximum trip duration must be a number",
        required_error: "Maximum trip duration is required",
      })
      .nonnegative("Maximum trip duration must be at least 1")
      .min(
        1,
        "Maximum trip duration cannot be less than minimum trip duration"
      ),
    security_deposit: z
      .number({
        invalid_type_error: "Security deposit must be a number",
        required_error: "Security deposit is required",
      })
      .min(500, "Minimum security deposit is 500")
      .nonnegative("Security deposit must be at least 500"),
    daily_mileage: z.number({ required_error: "Daily mileage is required" }),
    cost_per_km: z
      .number({
        invalid_type_error: "Cost per km must be a number",
        required_error: "Cost per km is required",
      })
      .nonnegative("Cost per km must be at least 0.1"),
    instant_bookings: z
      .boolean({
        required_error: "Please select an option for instant bookings",
      })
      .default(false),
    blocked_period: z
      .array(
        z.object({
          from: z
            .string({ required_error: "Blocked period start date is required" })
            .min(1, "Start date cannot be empty"),
          to: z
            .string({ required_error: "Blocked period end date is required" })
            .min(1, "End date cannot be empty"),
        })
      )
      .optional(),
  })
  .refine(
    ({ min_trip_duration, max_trip_duration }) =>
      min_trip_duration < max_trip_duration,
    {
      message:
        "Minimum trip duration cannot be greater than maximum trip duration",
      path: ["max_trip_duration"],
    }
  );

export type FormStepFourSchemaType = z.infer<typeof FormStepFourSchema>;

export const FormStepFiveSchema = z.object({
  driver_category: z.string({
    required_error: "Driver category is required",
  }),
  driver_license: z.string({
    required_error: "Driver license is required",
  }),
  travel_abroad_allowed: z
    .string({
      required_error: "Travel abroad permission is required",
    })
    .transform((value) => value === "true"),
  smoking_allowed: z
    .string({
      required_error: "Smoking permission is required",
    })
    .transform((value) => value === "true"),
  pets_allowed: z
    .string({
      required_error: "Pets permission is required",
    })
    .transform((value) => value === "true"),
  festival_allowed: z
    .string({
      required_error: "Festival permission is required",
    })
    .transform((value) => value === "true"),
  minimum_age: z.coerce
    .number({
      invalid_type_error: "Minimum age must be a number",
      required_error: "Minimum age is required",
    })
    .nonnegative("Minimum age must be 18 and above")
    .min(18, "Minimum age must be at least 18"),
  rule: z.string({
    required_error: "Rules are required",
  }),
  pick_up_instruction: z.string({
    required_error: "Pick-up instruction is required",
  }),
});

export type FormStepFiveSchemaType = z.infer<typeof FormStepFiveSchema>;

export const FormStepSixSchema = z.object({
  title: z.string({
    required_error: "Title is required",
  }),
  description: z.string({
    required_error: "Description is required",
  }),
});

export type FormStepSixSchemaType = z.infer<typeof FormStepSixSchema>;

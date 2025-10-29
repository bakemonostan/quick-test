import { z } from "zod";

export const formSchema = z.object({
  category: z.string().optional(),
  subCatergory: z.string().optional(),
  type: z.string().optional(),
  rangeDate: z.object({
    from: z.string().optional().nullable(),
    to: z.string().optional().nullable(),
  }),
});

export type FormValues = z.infer<typeof formSchema>;

export const DEFAULT_FORM_VALUES: FormValues = {
  category: "",
  subCatergory: "",
  type: "",
  rangeDate: {
    from: null,
    to: null,
  },
};

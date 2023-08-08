import { z } from "zod";

export const addressSchema = z
  .object({
    full_address: z.string(),
    city: z.string(),
    province: z.string(),
    postal_code: z.string().regex(/\d{5}/g, { message: "Number only" }),
    phone: z.string().min(10).max(12).startsWith("08"),
    recipient_name: z.string(),
  })
  .required();

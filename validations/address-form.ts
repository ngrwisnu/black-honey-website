import { z } from "zod";

export const addressSchema = z
  .object({
    full_address: z.string({ required_error: "Address is required" }),
    city: z.string({ required_error: "City is required" }),
    province: z.string({ required_error: "Province is required" }),
    postal_code: z.string().regex(/\d{5}/g, { message: "Number only" }),
    phone: z.string().min(10).max(12).startsWith("08"),
    recipient_name: z.string({ required_error: "Name is required" }),
  })
  .required();

import { z } from "zod";

export const addressSchema = z
  .object({
    full_address: z.string().min(1, { message: "Address cannot be empty" }),
    city: z.string().min(1, { message: "City cannot be empty" }),
    province: z.string().min(1, { message: "Province cannot be empty" }),
    phone: z.string().min(10).max(12).startsWith("08"),
    recipient_name: z
      .string()
      .min(1, { message: "Recipient name cannot be empty" }),
  })
  .required();

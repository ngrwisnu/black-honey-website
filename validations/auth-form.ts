import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string(),
});

export const registerSchema = z.object({
  fullname: z
    .string()
    .min(3, { message: "Your name must be 3 or more characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be 6 or more characters long" })
    .regex(/^[A-Za-z0-9]*[0-9][A-Za-z0-9]*$/g, {
      message: "Password did not match the requirements",
    }),
});

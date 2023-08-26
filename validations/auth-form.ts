import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password cannot be empty" }),
});

export const registerSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Your name must be 3 or more characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be 6 or more characters long" })
    .regex(/\d+/g, {
      message: "Must contains 1 or more numbers",
    })
    .regex(/[A-Z]+/g, {
      message: "Must contains 1 or more capital letters",
    }),
});

import { z } from "zod";

export const resetPassword = z.object({
  newPassword: z
    .string()
    .min(6, { message: "Password must be 6 or more characters long" })
    .regex(/\d+/g, {
      message: "Must contains 1 or more numbers",
    })
    .regex(/[A-Z]+/g, {
      message: "Must contains 1 or more capital letters",
    }),
  validateNewPassword: z.string(),
});

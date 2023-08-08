import { z } from "zod";

export const reviewSchema = z.object({
  rating: z.number().nonnegative(),
  message: z.string().max(255).optional(),
});

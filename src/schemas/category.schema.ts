import { z } from "zod";

export const categoryResponseSchema = z.object({
  id: z.number().positive(),
  name: z.string().max(45),
});

export const createCategoryRequestSchema = categoryResponseSchema.omit({
  id: true,
});

export const readAllCategoriesSchema = categoryResponseSchema.array();

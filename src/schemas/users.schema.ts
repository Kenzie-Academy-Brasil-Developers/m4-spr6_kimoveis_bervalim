import { z } from "zod";

export const userSchema = z.object({
  id: z.number().positive(),
  name: z.string().max(45).min(3),
  email: z.string().email().max(45).min(3),
  admin: z.boolean().default(false),
  password: z.string().max(120),
  createdAt: z.string(),
  updatedAt: z.string(),
  deletedAt: z.string().nullable(),
});

export const createUserRequestSchema = userSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
});

export const userWithoutAdminSchema = createUserRequestSchema.omit({
  admin: true,
});

export const updateUserNoAdminSchema = userWithoutAdminSchema.partial();

export const createUserResponseSchema = userSchema.omit({ password: true });

export const usersListResponse = createUserResponseSchema.array();

export const userLoginSchema = userSchema.pick({ email: true, password: true });

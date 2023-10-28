import { z } from "zod";

export const scheduleResponseSchema = z.object({
  id: z.number().positive(),
  date: z.string(),
  hour: z.string(),
  userId: z.number().positive().int(),
  realEstateId: z.number().positive().int(),
});

export const createScheduleRequestSchema = scheduleResponseSchema.omit({
  id: true,
  userId: true,
});

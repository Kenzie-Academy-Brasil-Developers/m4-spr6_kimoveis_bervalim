import { z } from "zod";
import { createScheduleRequestSchema } from "../schemas/schedules.schema";
import { Repository } from "typeorm";
import Schedule from "../entities/Schedule.entity";

export type TcreateScheduleRequest = z.infer<
  typeof createScheduleRequestSchema
>;
export type TscheduleRepo = Repository<Schedule>;

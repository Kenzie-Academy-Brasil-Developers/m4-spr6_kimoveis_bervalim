import { Router } from "express";
import {
  validateBody,
  verifyAdmin,
  verifyToken,
} from "../middlewares/globals.middleware";
import { createScheduleRequestSchema } from "../schemas/schedules.schema";
import {
  verifyRealStateExists,
  verifyRealStateScheduleExists,
  verifyUserRealStateScheduleExists,
} from "../middlewares/schedules.middleware";
import {
  createSchedulesController,
  readAllSchedulesByRealEstateController,
} from "../controllers/schedules.controller";

export const schedulesRouter: Router = Router();
schedulesRouter.post(
  "/",
  verifyToken,
  validateBody(createScheduleRequestSchema),
  verifyRealStateExists,
  verifyRealStateScheduleExists,
  verifyUserRealStateScheduleExists,
  createSchedulesController
);
schedulesRouter.get(
  "/realEstate/:id",
  verifyToken,
  verifyAdmin,
  readAllSchedulesByRealEstateController
);

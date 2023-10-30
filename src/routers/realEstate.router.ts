import { Router } from "express";
import {
  validateBody,
  verifyAdmin,
  verifyToken,
} from "../middlewares/globals.middleware";
import { verifyIfRealStateAdressExists } from "../middlewares/realState.middleware";
import { createRealStateRequestSchema } from "../schemas/realState.schema";
import {
  createRealEstateController,
  readAllRealEstatesController,
} from "../controllers/realEstate.controller";

export const realEstateRouter: Router = Router();

realEstateRouter.post(
  "/",
  verifyToken,
  verifyAdmin,
  validateBody(createRealStateRequestSchema),
  verifyIfRealStateAdressExists,
  createRealEstateController
);
realEstateRouter.get("/", readAllRealEstatesController);

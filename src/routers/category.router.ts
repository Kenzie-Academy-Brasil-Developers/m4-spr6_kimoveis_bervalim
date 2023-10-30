import { Router } from "express";
import {
  validateBody,
  verifyAdmin,
  verifyToken,
} from "../middlewares/globals.middleware";
import { createCategoryRequestSchema } from "../schemas/category.schema";
import {
  verifyIfCategoryExists,
  verifyIfCategoryNameIsUnique,
} from "../middlewares/categories.middleware";
import {
  createCategoryController,
  readAllCategoriesController,
  readRealStateByCategoryController,
} from "../controllers/categories.controller";

export const categoryRouter: Router = Router();

categoryRouter.post(
  "/",
  validateBody(createCategoryRequestSchema),
  verifyToken,
  verifyIfCategoryNameIsUnique,
  verifyAdmin,
  createCategoryController
);
categoryRouter.get("/", readAllCategoriesController);
categoryRouter.get(
  "/:id/realEstate",
  verifyIfCategoryExists,
  readRealStateByCategoryController
);

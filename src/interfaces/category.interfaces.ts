import { z } from "zod";
import {
  createCategoryRequestSchema,
  readAllCategoriesSchema,
} from "../schemas/category.schema";
import { Repository } from "typeorm";
import Category from "../entities/Category.entity";

export type TcreateCategoryRequest = z.infer<
  typeof createCategoryRequestSchema
>;
export type TreadAllCategories = z.infer<typeof readAllCategoriesSchema>;
export type TcategoryRepo = Repository<Category>;

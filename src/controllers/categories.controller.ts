import { Request, Response } from "express";
import {
  createCategoryService,
  readAllCategoriesService,
  readRealStateByCategoryService,
} from "../services/categories.service";
import { readCategoryRealStateRouteMock } from "../__tests__/mocks";

export const createCategoryController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const newCategory = await createCategoryService(req.body);
  return res.status(201).json(newCategory);
};

export const readAllCategoriesController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const categories = await readAllCategoriesService();
  return res.status(200).json(categories);
};

export const readRealStateByCategoryController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  const readStatesByCategory = await readRealStateByCategoryService(Number(id));
  return res.status(200).json(readStatesByCategory);
};

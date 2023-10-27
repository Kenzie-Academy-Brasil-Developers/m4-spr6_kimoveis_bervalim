import { NextFunction, Request, Response } from "express";
import Category from "../entities/Category.entity";
import { categoryRepo } from "../repositories";
import AppError from "../errors/AppError.errors";

export const verifyIfCategoryNameIsUnique = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { name } = req.body;

  const category: Category | null = await categoryRepo.findOneBy({
    name: name,
  });

  if (category) throw new AppError("Category already exists", 409);

  return next();
};

export const verifyIfCategoryExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.body;
  const category: Category | null = await categoryRepo.findOneBy({
    id: Number(id),
  });

  if (!category) throw new AppError("Category not found", 404);

  return next();
};

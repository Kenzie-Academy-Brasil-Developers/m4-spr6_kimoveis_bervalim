import Category from "../entities/Category.entity";
import AppError from "../errors/AppError.errors";
import {
  TcategoryRepo,
  TcreateCategoryRequest,
  TreadAllCategories,
} from "../interfaces/category.interfaces";
import { categoryRepo } from "../repositories";

export const createCategoryService = async (
  bodyRequest: TcreateCategoryRequest
): Promise<Category> => {
  return await categoryRepo.save(bodyRequest);
};

export const readAllCategoriesService =
  async (): Promise<TreadAllCategories> => {
    return await categoryRepo.find();
  };

export const readRealStateByCategoryService = async (
  id: number
): Promise<Category> => {
  const category: Category | null = await categoryRepo.findOne({
    where: {
      id: id,
    },
    relations: {
      RealEstate: true,
    },
  });

  if (!category) throw new AppError("Category not found", 404);

  return category;
};

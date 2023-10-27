import { NextFunction, Request, Response } from "express";
import User from "../entities/User.entity";
import { userRepo } from "../repositories";
import AppError from "../errors/AppError.errors";

export const verifyUniqueUserEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email } = req.body;

  const findUserEmail: User | null = await userRepo.findOneBy({ email: email });

  if (findUserEmail) throw new AppError("Email already exists", 409);

  return next();
};

export const verifyUserIdExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;

  const findUserId: User | null = await userRepo.findOneBy({ id: Number(id) });

  if (!findUserId) throw new AppError("User not found", 404);

  res.locals = { ...res.locals, findUserId };

  return next();
};

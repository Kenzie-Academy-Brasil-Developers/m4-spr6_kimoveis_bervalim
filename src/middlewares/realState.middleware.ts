import { NextFunction, Request, Response } from "express";
import { adressRepo } from "../repositories";
import AppError from "../errors/AppError.errors";
import Address from "../entities/Address.entity";

export const verifyIfRealStateAdressExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { address } = req.body;
  const adressExists: Address | null = await adressRepo.findOne({
    where: {
      street: address.street,
      zipCode: address.zipCode,
      number: address.number,
      city: address.city,
      state: address.state,
    },
  });

  if (adressExists) throw new AppError("Address already exists", 409);

  return next();
};

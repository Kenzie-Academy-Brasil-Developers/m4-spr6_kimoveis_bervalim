import { Request, Response } from "express";
import {
  createRealEstateService,
  readAllRealEstates,
} from "../services/realEstate.service";

export const createRealEstateController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const newRealEstate = await createRealEstateService(req.body);
  return res.status(201).json(newRealEstate);
};

export const readAllRealEstatesController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const realEstates = await readAllRealEstates();
  return res.status(200).json(realEstates);
};

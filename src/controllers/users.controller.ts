import { Request, Response } from "express";
import { TuserResponse } from "../interfaces/users.interface";
import { createUserService } from "../services/users.service";

export const createUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const newUser: TuserResponse = await createUserService(req.body);
  return res.status(201).json(newUser);
};

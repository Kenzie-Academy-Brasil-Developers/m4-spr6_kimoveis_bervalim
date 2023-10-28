import { Request, Response } from "express";
import {
  TuserResponse,
  TusersReadResponseSchema,
} from "../interfaces/users.interface";
import {
  createUserService,
  deleteUserService,
  readAllUsersService,
  updateUserService,
} from "../services/users.service";

export const createUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const newUser: TuserResponse = await createUserService(req.body);
  return res.status(201).json(newUser);
};

export const readAllUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const users = await readAllUsersService();
  return res.status(200).json(users);
};

export const updateUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { findUserId } = res.locals;
  const updatedUser = await updateUserService(req.body, findUserId);
  return res.status(200).json(updatedUser);
};

export const deleteUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { findUserId } = res.locals;
  await deleteUserService(findUserId);
  return res.status(204).json();
};

import { Request, Response } from "express";
import { TuserLoginResponse } from "../interfaces/users.interface";
import { userLoginService } from "../services/session.service";

export const userLoginController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const token: TuserLoginResponse = await userLoginService(req.body);
  return res.status(200).json(token);
};

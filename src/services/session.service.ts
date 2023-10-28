import "dotenv/config";
import { compare } from "bcryptjs";
import User from "../entities/User.entity";
import AppError from "../errors/AppError.errors";
import { TuserLogin, TuserLoginResponse } from "../interfaces/users.interface";
import { userRepo } from "../repositories";
import { sign } from "jsonwebtoken";

export const userLoginService = async (
  bodyRequest: TuserLogin
): Promise<TuserLoginResponse> => {
  const { email } = bodyRequest;

  const user: User | null = await userRepo.findOneBy({ email: email });

  if (!user) throw new AppError("Invalid credentials", 401);

  const comparePasswords = await compare(bodyRequest.password, user.password);

  if (!comparePasswords) throw new AppError("Invalid credentials", 401);

  const token: string = sign(
    { email: user.email, admin: user.admin },
    process.env.SECRET_KEY!,
    { subject: user.id.toString(), expiresIn: process.env.EXPIRES_IN! }
  );

  return { token };
};

import User from "../entities/User.entity";
import {
  TcreateUserRequest,
  TuserResponse,
} from "../interfaces/users.interface";
import { userRepo } from "../repositories";
import { createUserResponseSchema } from "../schemas/users.schema";

export const createUserService = async (
  bodyRequest: TcreateUserRequest
): Promise<TuserResponse> => {
  const newUser: User = userRepo.create(bodyRequest);

  await userRepo.save(newUser);

  return createUserResponseSchema.parse(newUser);
};

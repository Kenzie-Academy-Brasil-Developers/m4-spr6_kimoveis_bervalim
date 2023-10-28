import User from "../entities/User.entity";
import {
  TUserBodyUpdate,
  TcreateUserRequest,
  TuserResponse,
  TusersReadResponseSchema,
} from "../interfaces/users.interface";
import { userRepo } from "../repositories";
import {
  createUserResponseSchema,
  updateUserNoAdminSchema,
  usersListResponseSchema,
} from "../schemas/users.schema";

export const createUserService = async (
  bodyRequest: TcreateUserRequest
): Promise<TuserResponse> => {
  const newUser: User = userRepo.create(bodyRequest);

  await userRepo.save(newUser);

  return createUserResponseSchema.parse(newUser);
};

export const readAllUsersService =
  async (): Promise<TusersReadResponseSchema> => {
    const users: User[] = await userRepo.find();

    return usersListResponseSchema.parse(users);
  };

export const updateUserService = async (
  bodyRequest: TUserBodyUpdate,
  user: User
): Promise<TuserResponse> => {
  // pegar o que já tem do usuário e depois passar os dados atualizados
  const updatedUser: User = userRepo.create({ ...user, ...bodyRequest });

  await userRepo.save(updatedUser);

  return createUserResponseSchema.parse(updatedUser);
};

export const deleteUserService = async (user: User): Promise<void> => {
  await userRepo.softRemove(user);
};

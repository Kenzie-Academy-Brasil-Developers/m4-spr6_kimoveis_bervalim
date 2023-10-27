import { z } from "zod";
import {
  createUserRequestSchema,
  createUserResponseSchema,
  userLoginSchema,
  userWithoutAdminSchema,
} from "../schemas/users.schema";
import { DeepPartial, Repository } from "typeorm";
import User from "../entities/User.entity";

export type TcreateUserRequest = z.infer<typeof createUserRequestSchema>;
export type TupdateUserRequest = z.infer<typeof userWithoutAdminSchema>;
export type TUserBodyUpdate = DeepPartial<TupdateUserRequest>;
export type TuserResponseSchema = z.infer<typeof createUserResponseSchema>;
export type TusersReadResponseSchema = TuserResponseSchema[];
export type TuserLogin = z.infer<typeof userLoginSchema>;
export type TuserLoginResponse = { token: string };
export type TuserRepo = Repository<User>;

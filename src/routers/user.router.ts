import { Router } from "express";
import {
  validateBody,
  verifyAdmin,
  verifyPermission,
  verifyToken,
} from "../middlewares/globals.middleware";
import {
  createUserRequestSchema,
  updateUserNoAdminSchema,
} from "../schemas/users.schema";
import {
  verifyUniqueUserEmail,
  verifyUserIdExists,
} from "../middlewares/users.middleware";
import {
  createUserController,
  deleteUserController,
  readAllUsersController,
  updateUserController,
} from "../controllers/users.controller";

export const userRouter: Router = Router();

userRouter.post(
  "/",
  validateBody(createUserRequestSchema),
  verifyUniqueUserEmail,
  createUserController
);
userRouter.get("/", verifyToken, verifyAdmin, readAllUsersController);
userRouter.patch(
  "/:id",
  validateBody(updateUserNoAdminSchema),
  verifyToken,
  verifyUserIdExists,
  verifyPermission,
  updateUserController
);
userRouter.delete(
  "/:id",
  verifyToken,
  verifyUserIdExists,
  verifyPermission,
  deleteUserController
);

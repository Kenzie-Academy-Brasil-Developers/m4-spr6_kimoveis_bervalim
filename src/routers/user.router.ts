import { Router } from "express";
import { validateBody } from "../middlewares/globals.middleware";
import { createUserRequestSchema } from "../schemas/users.schema";
import { verifyUniqueUserEmail } from "../middlewares/users.middleware";
import { createUserController } from "../controllers/users.controller";

export const userRouter: Router = Router();
userRouter.post(
  "/",
  validateBody(createUserRequestSchema),
  verifyUniqueUserEmail,
  createUserController
);

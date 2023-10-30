import { Router } from "express";
import { userRouter } from "./user.router";
import { sessionRouter } from "./session.router";
import { categoryRouter } from "./category.router";
import { realEstateRouter } from "./realEstate.router";

export const allRoutes: Router = Router();
allRoutes.use("/users", userRouter);
allRoutes.use("/login", sessionRouter);
allRoutes.use("/categories", categoryRouter);
allRoutes.use("/realEstate", realEstateRouter);

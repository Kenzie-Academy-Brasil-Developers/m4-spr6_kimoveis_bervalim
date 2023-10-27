import { NextFunction, Request, Response } from "express";
import RealEstate from "../entities/RealEstate.entity";
import { realStateRepo, scheduleRepo } from "../repositories";
import AppError from "../errors/AppError.errors";
import Schedule from "../entities/Schedule.entity";

export const verifyRealStateExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { realEstateId } = req.body;

  const realState: RealEstate | null = await realStateRepo.findOneBy({
    id: Number(realEstateId),
  });

  if (!realState) throw new AppError("RealEstate not found", 404);

  return next();
};

export const verifyRealStateScheduleExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { date, hour, realEstateId } = req.body;

  const schedule: Schedule | null = await scheduleRepo.findOne({
    where: {
      realEstate: {
        id: Number(realEstateId),
      },
      date: date,
      hour: hour,
    },
  });

  if (schedule)
    throw new AppError(
      "Schedule to this real estate at this date and time already exists",
      409
    );

  return next();
};

export const verifyUserRealStateScheduleExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  let { sub } = res.locals.decoded;

  sub = Number(sub);

  const { date, hour } = req.body;

  const schedule: Schedule | null = await scheduleRepo.findOne({
    where: {
      user: {
        id: sub,
      },
      date: date,
      hour: hour,
    },
  });

  if (schedule)
    throw new AppError(
      "User schedule to this real estate at this date and time already exists",
      409
    );

  return next();
};

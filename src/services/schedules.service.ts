import RealEstate from "../entities/RealEstate.entity";
import User from "../entities/User.entity";
import AppError from "../errors/AppError.errors";
import { TcreateScheduleRequest } from "../interfaces/schedules.interface";
import { realStateRepo, scheduleRepo, userRepo } from "../repositories";

export const createSchedulesService = async (
  bodyRequest: TcreateScheduleRequest,
  userId: number
): Promise<void> => {
  const newDate = new Date(bodyRequest.date).getDay();
  if (newDate === 0 || newDate === 6)
    throw new AppError("Invalid date, work days are monday to friday", 400);

  const time = Number(bodyRequest.hour.split(":")[0]);
  if (time < 8 || time > 18)
    throw new AppError("Invalid hour, available times are 8AM to 18PM", 400);

  const realEstate: RealEstate | null = await realStateRepo.findOneBy({
    id: bodyRequest.realEstateId,
  });

  const user: User | null = await userRepo.findOneBy({
    id: userId,
  });

  await scheduleRepo.save({
    ...bodyRequest,
    realEstate: realEstate!,
    user: user!,
  });
};

export const readAllSchedulesByRealEstateService = async (
  id: number
): Promise<RealEstate> => {
  const realEstate: RealEstate | null = await realStateRepo.findOne({
    where: {
      id: id,
    },
    relations: {
      schedules: {
        user: true,
      },
      address: true,
      category: true,
    },
  });

  if (!realEstate) throw new AppError("RealEstate not found", 404);

  return realEstate;
};

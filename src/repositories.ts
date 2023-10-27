import { Repository } from "typeorm";
import User from "./entities/User.entity";
import { AppDataSource } from "./data-source";
import Category from "./entities/Category.entity";
import Address from "./entities/Address.entity";
import RealEstate from "./entities/RealEstate.entity";
import Schedule from "./entities/Schedule.entity";
import { TuserRepo } from "./interfaces/users.interface";
import { TcategoryRepo } from "./interfaces/category.interfaces";

export const userRepo: TuserRepo = AppDataSource.getRepository(User);
export const categoryRepo: TcategoryRepo =
  AppDataSource.getRepository(Category);
export const adressRepo: Repository<Address> =
  AppDataSource.getRepository(Address);
export const realStateRepo: Repository<RealEstate> =
  AppDataSource.getRepository(RealEstate);
export const scheduleRepo: Repository<Schedule> =
  AppDataSource.getRepository(Schedule);

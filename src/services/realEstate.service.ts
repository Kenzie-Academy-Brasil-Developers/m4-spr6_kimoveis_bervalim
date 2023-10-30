import Address from "../entities/Address.entity";
import Category from "../entities/Category.entity";
import RealEstate from "../entities/RealEstate.entity";
import AppError from "../errors/AppError.errors";
import { TcreateRealStateRequest } from "../interfaces/realState.interface";
import { adressRepo, categoryRepo, realStateRepo } from "../repositories";

export const createRealEstateService = async (
  bodyRequest: TcreateRealStateRequest
): Promise<RealEstate> => {
  const category: Category | null = await categoryRepo.findOneBy({
    id: bodyRequest.categoryId,
  });

  if (!category) throw new AppError("Category not found", 404);

  const address: Address = await adressRepo.save(bodyRequest.address);

  const realEstate: RealEstate = await realStateRepo.save({
    ...bodyRequest,
    category: category!,
    address,
  });

  return realEstate;
};

export const readAllRealEstates = async (): Promise<RealEstate[]> => {
  return await realStateRepo.find({
    relations: {
      address: true,
    },
  });
};

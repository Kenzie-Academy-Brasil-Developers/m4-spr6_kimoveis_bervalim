import { z } from "zod";
import { createRealStateRequestSchema } from "../schemas/realState.schema";
import { Repository } from "typeorm";
import RealEstate from "../entities/RealEstate.entity";
import Address from "../entities/Address.entity";

export type TcreateRealStateRequest = z.infer<
  typeof createRealStateRequestSchema
>;
export type TrealStateRepo = Repository<RealEstate>;
export type TadressRepo = Repository<Address>;

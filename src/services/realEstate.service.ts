import Address from "../entities/Address.entity";
import Category from "../entities/Category.entity";
import RealEstate from "../entities/RealEstate.entity";
import AppError from "../errors/AppError.errors";
import { TcreateRealStateRequest } from "../interfaces/realState.interface";
import { adressRepo, categoryRepo, realStateRepo } from "../repositories";

export const createRealEstateService = async (
  bodyRequest: TcreateRealStateRequest
): Promise<RealEstate> => {
  // verificar se a categoria existe
  // O id do category está vindo do corpo da requisição
  // Quermos verificar se a categoria informada existe ou não no banco de dados
  // Verificar se a categoria existe
  const category: Category | null = await categoryRepo.findOneBy({
    id: bodyRequest.categoryId,
  });

  if (!category) throw new AppError("Category not found", 404);
  // Salvando  o endereço:
  // A criação do endereço está atrelada com a do realEstate
  // Queremos salvar o nosso endereço na tabela de endereços
  // Salvaremos em nossa tabela de endereços o que for informadad no corpo da requisição
  //NO momento em que salvamos o endereço, ela passa a existir
  const address: Address = await adressRepo.save(bodyRequest.address);

  // Salvando o iḿovel na tabela de imoveis
  // Juntaremos tudo que está no corpo da requisição com a query que encontrou a categoria no banco de dados
  // Que é a mesma que foi passada no corpo da requisição
  // E com o adress que foi salvo
  // Fazemos um sp

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

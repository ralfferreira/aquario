import { ItemAchadoEPerdido } from '@/domain/achados-e-perdidos/entities/ItemAchadoEPerdido';
import { IItensAchadosEPerdidosRepository } from '@/domain/achados-e-perdidos/repositories/IItensAchadosEPerdidosRepository';

interface BuscarItemAchadoEPerdidoPorIdUseCaseRequest {
  id: string;
}

interface BuscarItemAchadoEPerdidoPorIdUseCaseResponse {
  item: ItemAchadoEPerdido | null;
}

export class BuscarItemAchadoEPerdidoPorIdUseCase {
  constructor(private itensRepository: IItensAchadosEPerdidosRepository) {}

  async execute({
    id,
  }: BuscarItemAchadoEPerdidoPorIdUseCaseRequest): Promise<BuscarItemAchadoEPerdidoPorIdUseCaseResponse> {
    const item = await this.itensRepository.findById(id);

    return { item };
  }
}

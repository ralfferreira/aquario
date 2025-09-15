import { ItemAchadoEPerdido } from '@/domain/achados-e-perdidos/entities/ItemAchadoEPerdido';
import { IItensAchadosEPerdidosRepository } from '@/domain/achados-e-perdidos/repositories/IItensAchadosEPerdidosRepository';

interface ListarItensAchadosEPerdidosUseCaseResponse {
  itens: ItemAchadoEPerdido[];
}

export class ListarItensAchadosEPerdidosUseCase {
  constructor(private itensRepository: IItensAchadosEPerdidosRepository) {}

  async execute(): Promise<ListarItensAchadosEPerdidosUseCaseResponse> {
    const itens = await this.itensRepository.findMany();

    return { itens };
  }
}

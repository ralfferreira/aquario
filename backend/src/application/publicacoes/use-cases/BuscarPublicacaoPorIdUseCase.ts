import { Publicacao } from '@/domain/publicacoes/entities/Publicacao';
import { IPublicacoesRepository } from '@/domain/publicacoes/repositories/IPublicacoesRepository';

interface BuscarPublicacaoPorIdUseCaseRequest {
  id: string;
}

interface BuscarPublicacaoPorIdUseCaseResponse {
  publicacao: Publicacao | null;
}

export class BuscarPublicacaoPorIdUseCase {
  constructor(private publicacoesRepository: IPublicacoesRepository) {}

  async execute({
    id,
  }: BuscarPublicacaoPorIdUseCaseRequest): Promise<BuscarPublicacaoPorIdUseCaseResponse> {
    const publicacao = await this.publicacoesRepository.findById(id);

    return { publicacao };
  }
}

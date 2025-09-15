import { Publicacao } from '@/domain/publicacoes/entities/Publicacao';
import { IPublicacoesRepository } from '@/domain/publicacoes/repositories/IPublicacoesRepository';

interface ListarPublicacoesUseCaseResponse {
  publicacoes: Publicacao[];
}

export class ListarPublicacoesUseCase {
  constructor(private publicacoesRepository: IPublicacoesRepository) {}

  async execute(): Promise<ListarPublicacoesUseCaseResponse> {
    const publicacoes = await this.publicacoesRepository.findMany();

    return { publicacoes };
  }
}

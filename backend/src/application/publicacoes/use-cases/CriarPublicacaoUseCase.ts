import { Publicacao } from '@/domain/publicacoes/entities/Publicacao';
import { IPublicacoesRepository } from '@/domain/publicacoes/repositories/IPublicacoesRepository';

interface CriarPublicacaoUseCaseRequest {
  titulo: string;
  conteudo: string;
  autorId: string;
  centroId: string;
}

type CriarPublicacaoUseCaseResponse = void;

export class CriarPublicacaoUseCase {
  constructor(private publicacoesRepository: IPublicacoesRepository) {}

  async execute({
    titulo,
    conteudo,
    autorId,
    centroId,
  }: CriarPublicacaoUseCaseRequest): Promise<CriarPublicacaoUseCaseResponse> {
    const publicacao = Publicacao.create({
      titulo,
      conteudo,
      autorId,
      centroId,
    });

    await this.publicacoesRepository.create(publicacao);
  }
}

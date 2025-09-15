import { Publicacao } from '@/domain/publicacoes/entities/Publicacao';
import { IPublicacoesRepository } from '@/domain/publicacoes/repositories/IPublicacoesRepository';
import { IUsuariosRepository } from '@/domain/usuarios/repositories/IUsuariosRepository';
import { ICentrosRepository } from '@/domain/centros/repositories/ICentrosRepository';

interface CriarPublicacaoUseCaseRequest {
  titulo: string;
  conteudo: string;
  autorId: string;
  centroId: string;
}

type CriarPublicacaoUseCaseResponse = void;

export class CriarPublicacaoUseCase {
  constructor(
    private publicacoesRepository: IPublicacoesRepository,
    private usuariosRepository: IUsuariosRepository,
    private centrosRepository: ICentrosRepository,
  ) {}

  async execute({
    titulo,
    conteudo,
    autorId,
    centroId,
  }: CriarPublicacaoUseCaseRequest): Promise<CriarPublicacaoUseCaseResponse> {
    const autor = await this.usuariosRepository.findById(autorId);
    if (!autor) {
      throw new Error('Autor não encontrado.');
    }

    const centro = await this.centrosRepository.findById(centroId);
    if (!centro) {
      throw new Error('Centro não encontrado.');
    }

    const publicacao = Publicacao.create({
      autorId,
      centroId,
      titulo,
      conteudo,
    });

    await this.publicacoesRepository.create(publicacao);
  }
}

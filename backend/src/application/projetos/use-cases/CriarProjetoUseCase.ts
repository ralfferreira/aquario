import { Projeto } from '@/domain/projetos/entities/Projeto';
import { IProjetosRepository } from '@/domain/projetos/repositories/IProjetosRepository';
import { IUsuariosRepository } from '@/domain/usuarios/repositories/IUsuariosRepository';
import { ICentrosRepository } from '@/domain/centros/repositories/ICentrosRepository';
import { TipoProjeto } from '@prisma/client';

interface CriarProjetoUseCaseRequest {
  titulo: string;
  descricao: string;
  tipo: TipoProjeto;
  criadorId: string;
  centroId: string;
  tags: string[];
  urlFoto?: string;
  url?: string;
  membroIds?: string[];
}

type CriarProjetoUseCaseResponse = void;

export class CriarProjetoUseCase {
  constructor(
    private projetosRepository: IProjetosRepository,
    private usuariosRepository: IUsuariosRepository,
    private centrosRepository: ICentrosRepository,
  ) {}

  async execute({
    titulo,
    descricao,
    tipo,
    criadorId,
    centroId,
    tags,
    urlFoto,
    url,
    membroIds,
  }: CriarProjetoUseCaseRequest): Promise<CriarProjetoUseCaseResponse> {
    const criador = await this.usuariosRepository.findById(criadorId);
    if (!criador) {
      throw new Error('Criador não encontrado.');
    }

    const centro = await this.centrosRepository.findById(centroId);
    if (!centro) {
      throw new Error('Centro não encontrado.');
    }

    const projeto = Projeto.create({
      titulo,
      descricao,
      tipo,
      criadorId,
      centroId,
      tags,
      urlFoto,
      url,
      membros: membroIds ?? [],
    });

    await this.projetosRepository.create(projeto);
  }
}

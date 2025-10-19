import { Entidade } from '@/domain/entidades/entities/Entidade';
import { IEntidadesRepository } from '@/domain/entidades/repositories/IEntidadesRepository';
import {
  IMembroEntidadeRepository,
  MembroComUsuario,
} from '@/domain/entidades/repositories/IMembroEntidadeRepository';

interface BuscarEntidadePorIdUseCaseRequest {
  id: string;
}

interface BuscarEntidadePorIdUseCaseResponse {
  entidade: Entidade | null;
  membros: MembroComUsuario[];
}

export class BuscarEntidadePorIdUseCase {
  constructor(
    private entidadesRepository: IEntidadesRepository,
    private membroEntidadeRepository: IMembroEntidadeRepository
  ) {}

  async execute({
    id,
  }: BuscarEntidadePorIdUseCaseRequest): Promise<BuscarEntidadePorIdUseCaseResponse> {
    const entidade = await this.entidadesRepository.findById(id);
    const membros = await this.membroEntidadeRepository.findManyByEntidadeId(id);

    return { entidade, membros };
  }
}

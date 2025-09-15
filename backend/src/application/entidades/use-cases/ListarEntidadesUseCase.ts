import { Entidade } from '@/domain/entidades/entities/Entidade';
import { IEntidadesRepository } from '@/domain/entidades/repositories/IEntidadesRepository';

interface ListarEntidadesUseCaseResponse {
  entidades: Entidade[];
}

export class ListarEntidadesUseCase {
  constructor(private entidadesRepository: IEntidadesRepository) {}

  async execute(): Promise<ListarEntidadesUseCaseResponse> {
    const entidades = await this.entidadesRepository.findMany();
    return { entidades };
  }
}

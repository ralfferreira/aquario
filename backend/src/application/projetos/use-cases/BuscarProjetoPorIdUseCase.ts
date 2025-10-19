import { Projeto } from '@/domain/projetos/entities/Projeto';
import { IProjetosRepository } from '@/domain/projetos/repositories/IProjetosRepository';

interface BuscarProjetoPorIdUseCaseRequest {
  id: string;
}

interface BuscarProjetoPorIdUseCaseResponse {
  projeto: Projeto | null;
}

export class BuscarProjetoPorIdUseCase {
  constructor(private projetosRepository: IProjetosRepository) {}

  async execute({
    id,
  }: BuscarProjetoPorIdUseCaseRequest): Promise<BuscarProjetoPorIdUseCaseResponse> {
    const projeto = await this.projetosRepository.findById(id);
    return { projeto };
  }
}

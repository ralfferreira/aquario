import { Projeto } from '@/domain/projetos/entities/Projeto';
import { IProjetosRepository } from '@/domain/projetos/repositories/IProjetosRepository';

type ListarProjetosUseCaseResponse = Projeto[];

export class ListarProjetosUseCase {
  constructor(private projetosRepository: IProjetosRepository) {}

  async execute(): Promise<ListarProjetosUseCaseResponse> {
    const projetos = await this.projetosRepository.findMany();
    return projetos;
  }
}

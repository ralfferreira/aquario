import { IProjetosRepository } from '@/domain/projetos/repositories/IProjetosRepository';

interface DeletarProjetoUseCaseRequest {
  projetoId: string;
  criadorId: string;
}

type DeletarProjetoUseCaseResponse = void;

export class DeletarProjetoUseCase {
  constructor(private projetosRepository: IProjetosRepository) {}

  async execute({
    projetoId,
    criadorId,
  }: DeletarProjetoUseCaseRequest): Promise<DeletarProjetoUseCaseResponse> {
    const projeto = await this.projetosRepository.findById(projetoId);

    if (!projeto) {
      throw new Error('Projeto não encontrado.');
    }

    if (projeto.criadorId !== criadorId) {
      throw new Error('Ação não autorizada.');
    }

    await this.projetosRepository.delete(projetoId);
  }
}

import { IVagasRepository } from '@/domain/vagas/repositories/IVagasRepository';

interface DeletarVagaUseCaseRequest {
  vagaId: string;
  publicadorId: string;
}

type DeletarVagaUseCaseResponse = void;

export class DeletarVagaUseCase {
  constructor(private vagasRepository: IVagasRepository) {}

  async execute({
    vagaId,
    publicadorId,
  }: DeletarVagaUseCaseRequest): Promise<DeletarVagaUseCaseResponse> {
    const vaga = await this.vagasRepository.findById(vagaId);

    if (!vaga) {
      throw new Error('Vaga não encontrada.');
    }

    if (vaga.publicadorId !== publicadorId) {
      throw new Error('Ação não autorizada.');
    }

    await this.vagasRepository.delete(vagaId);
  }
}

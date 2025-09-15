import { Vaga } from '@/domain/vagas/entities/Vaga';
import { IVagasRepository } from '@/domain/vagas/repositories/IVagasRepository';

interface BuscarVagaPorIdUseCaseRequest {
  id: string;
}

interface BuscarVagaPorIdUseCaseResponse {
  vaga: Vaga | null;
}

export class BuscarVagaPorIdUseCase {
  constructor(private vagasRepository: IVagasRepository) {}

  async execute({ id }: BuscarVagaPorIdUseCaseRequest): Promise<BuscarVagaPorIdUseCaseResponse> {
    const vaga = await this.vagasRepository.findById(id);
    return { vaga };
  }
}

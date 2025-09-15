import { Vaga } from '@/domain/vagas/entities/Vaga';
import { IVagasRepository } from '@/domain/vagas/repositories/IVagasRepository';

type ListarVagasUseCaseResponse = Vaga[];

export class ListarVagasUseCase {
  constructor(private vagasRepository: IVagasRepository) {}

  async execute(): Promise<ListarVagasUseCaseResponse> {
    const vagas = await this.vagasRepository.findMany();
    return vagas;
  }
}

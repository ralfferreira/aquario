import { ICentrosRepository } from '@/domain/centros/repositories/ICentrosRepository';
import { Centro } from '@prisma/client';

type ListarCentrosUseCaseResponse = Centro[];

export class ListarCentrosUseCase {
  constructor(private centrosRepository: ICentrosRepository) {}

  async execute(): Promise<ListarCentrosUseCaseResponse> {
    const centros = await this.centrosRepository.findMany();
    return centros;
  }
}

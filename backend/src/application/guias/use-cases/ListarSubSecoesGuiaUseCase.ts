import { SubSecaoGuia } from '@/domain/guias/entities/SubSecaoGuia';
import { ISubSecoesGuiaRepository } from '@/domain/guias/repositories/ISubSecoesGuiaRepository';

interface ListarSubSecoesGuiaUseCaseRequest {
  secaoId: string;
}

interface ListarSubSecoesGuiaUseCaseResponse {
  subSecoes: SubSecaoGuia[];
}

export class ListarSubSecoesGuiaUseCase {
  constructor(private subSecoesGuiaRepository: ISubSecoesGuiaRepository) {}

  async execute({
    secaoId,
  }: ListarSubSecoesGuiaUseCaseRequest): Promise<ListarSubSecoesGuiaUseCaseResponse> {
    const subSecoes = await this.subSecoesGuiaRepository.findBySecaoId(secaoId);

    return { subSecoes };
  }
}

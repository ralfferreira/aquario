import { SecaoGuia } from '@/domain/guias/entities/SecaoGuia';
import { ISecoesGuiaRepository } from '@/domain/guias/repositories/ISecoesGuiaRepository';

interface ListarSecoesGuiaUseCaseRequest {
  guiaId: string;
}

interface ListarSecoesGuiaUseCaseResponse {
  secoes: SecaoGuia[];
}

export class ListarSecoesGuiaUseCase {
  constructor(private secoesGuiaRepository: ISecoesGuiaRepository) {}

  async execute({
    guiaId,
  }: ListarSecoesGuiaUseCaseRequest): Promise<ListarSecoesGuiaUseCaseResponse> {
    const secoes = await this.secoesGuiaRepository.findByGuiaId(guiaId);

    return { secoes };
  }
}

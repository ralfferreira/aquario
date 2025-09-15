import { IPublicacoesRepository } from '@/domain/publicacoes/repositories/IPublicacoesRepository';

interface DeletarPublicacaoUseCaseRequest {
  id: string;
}

type DeletarPublicacaoUseCaseResponse = void;

export class DeletarPublicacaoUseCase {
  constructor(private publicacoesRepository: IPublicacoesRepository) {}

  async execute({
    id,
  }: DeletarPublicacaoUseCaseRequest): Promise<DeletarPublicacaoUseCaseResponse> {
    const publicacao = await this.publicacoesRepository.findById(id);

    if (!publicacao) {
      throw new Error('Publicação não encontrada.');
    }

    await this.publicacoesRepository.delete(id);
  }
}

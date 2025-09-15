import { IPublicacoesRepository } from '@/domain/publicacoes/repositories/IPublicacoesRepository';

interface DeletarPublicacaoUseCaseRequest {
  publicacaoId: string;
  autorId: string;
}

type DeletarPublicacaoUseCaseResponse = void;

export class DeletarPublicacaoUseCase {
  constructor(private publicacoesRepository: IPublicacoesRepository) {}

  async execute({
    publicacaoId,
    autorId,
  }: DeletarPublicacaoUseCaseRequest): Promise<DeletarPublicacaoUseCaseResponse> {
    const publicacao = await this.publicacoesRepository.findById(publicacaoId);

    if (!publicacao) {
      throw new Error('Publicação não encontrada.');
    }

    if (publicacao.autor.id !== autorId) {
      throw new Error('Ação não autorizada.');
    }

    await this.publicacoesRepository.delete(publicacaoId);
  }
}

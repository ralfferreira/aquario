import { IPublicacoesRepository } from '@/domain/publicacoes/repositories/IPublicacoesRepository';

interface EditarPublicacaoUseCaseRequest {
  publicacaoId: string;
  autorId: string;
  titulo: string;
  conteudo: string;
}

type EditarPublicacaoUseCaseResponse = void;

export class EditarPublicacaoUseCase {
  constructor(private publicacoesRepository: IPublicacoesRepository) {}

  async execute({
    publicacaoId,
    autorId,
    titulo,
    conteudo,
  }: EditarPublicacaoUseCaseRequest): Promise<EditarPublicacaoUseCaseResponse> {
    const publicacao = await this.publicacoesRepository.findById(publicacaoId);

    if (!publicacao) {
      throw new Error('Publicação não encontrada.');
    }

    if (publicacao.autor.id !== autorId) {
      throw new Error('Ação não autorizada.');
    }

    publicacao.titulo = titulo;
    publicacao.conteudo = conteudo;

    await this.publicacoesRepository.save(publicacao);
  }
}

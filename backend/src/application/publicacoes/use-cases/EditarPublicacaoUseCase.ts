import { Publicacao } from '@/domain/publicacoes/entities/Publicacao';
import { IPublicacoesRepository } from '@/domain/publicacoes/repositories/IPublicacoesRepository';

interface EditarPublicacaoUseCaseRequest {
  id: string;
  titulo: string;
  conteudo: string;
}

type EditarPublicacaoUseCaseResponse = void;

export class EditarPublicacaoUseCase {
  constructor(private publicacoesRepository: IPublicacoesRepository) {}

  async execute({
    id,
    titulo,
    conteudo,
  }: EditarPublicacaoUseCaseRequest): Promise<EditarPublicacaoUseCaseResponse> {
    const publicacao = await this.publicacoesRepository.findById(id);

    if (!publicacao) {
      throw new Error('Publicação não encontrada.');
    }

    publicacao.titulo = titulo;
    publicacao.conteudo = conteudo;

    await this.publicacoesRepository.save(publicacao);
  }
}

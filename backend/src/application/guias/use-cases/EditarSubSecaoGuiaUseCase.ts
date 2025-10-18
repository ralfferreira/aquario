import { ISubSecoesGuiaRepository } from '@/domain/guias/repositories/ISubSecoesGuiaRepository';
import { StatusGuia } from '@prisma/client';

interface EditarSubSecaoGuiaUseCaseRequest {
  id: string;
  titulo?: string;
  slug?: string;
  ordem?: number;
  conteudo?: string;
  status?: StatusGuia;
}

type EditarSubSecaoGuiaUseCaseResponse = void;

export class EditarSubSecaoGuiaUseCase {
  constructor(private subSecoesGuiaRepository: ISubSecoesGuiaRepository) {}

  async execute({
    id,
    titulo,
    slug,
    ordem,
    conteudo,
    status,
  }: EditarSubSecaoGuiaUseCaseRequest): Promise<EditarSubSecaoGuiaUseCaseResponse> {
    const subSecaoGuia = await this.subSecoesGuiaRepository.findById(id);

    if (!subSecaoGuia) {
      throw new Error('Subseção não encontrada.');
    }

    if (titulo !== undefined) subSecaoGuia.titulo = titulo;
    if (slug !== undefined) subSecaoGuia.slug = slug;
    if (ordem !== undefined) subSecaoGuia.ordem = ordem;
    if (conteudo !== undefined) subSecaoGuia.conteudo = conteudo;
    if (status !== undefined) subSecaoGuia.status = status;

    await this.subSecoesGuiaRepository.save(subSecaoGuia);
  }
}

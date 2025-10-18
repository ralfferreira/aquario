import { SecaoGuia } from "@/domain/guias/entities/SecaoGuia";
import { ISecoesGuiaRepository } from "@/domain/guias/repositories/ISecoesGuiaRepository";
import { StatusGuia } from "@prisma/client";

interface EditarSecaoGuiaUseCaseRequest {
  id: string;
  titulo?: string;
  slug?: string;
  ordem?: number;
  conteudo?: string;
  status?: StatusGuia;
}

type EditarSecaoGuiaUseCaseResponse = void;

export class EditarSecaoGuiaUseCase {
  constructor(private secoesGuiaRepository: ISecoesGuiaRepository) {}

  async execute({
    id,
    titulo,
    slug,
    ordem,
    conteudo,
    status,
  }: EditarSecaoGuiaUseCaseRequest): Promise<EditarSecaoGuiaUseCaseResponse> {
    const secaoGuia = await this.secoesGuiaRepository.findById(id);

    if (!secaoGuia) {
      throw new Error("Seção não encontrada.");
    }

    if (titulo !== undefined) secaoGuia.titulo = titulo;
    if (slug !== undefined) secaoGuia.slug = slug;
    if (ordem !== undefined) secaoGuia.ordem = ordem;
    if (conteudo !== undefined) secaoGuia.conteudo = conteudo;
    if (status !== undefined) secaoGuia.status = status;

    await this.secoesGuiaRepository.save(secaoGuia);
  }
}

import { SecaoGuia } from "@/domain/guias/entities/SecaoGuia";
import { ISecoesGuiaRepository } from "@/domain/guias/repositories/ISecoesGuiaRepository";
import { IGuiasRepository } from "@/domain/guias/repositories/IGuiasRepository";
import { StatusGuia } from "@prisma/client";

interface CriarSecaoGuiaUseCaseRequest {
  guiaId: string;
  titulo: string;
  slug: string;
  ordem: number;
  conteudo?: string;
  status?: StatusGuia;
}

type CriarSecaoGuiaUseCaseResponse = void;

export class CriarSecaoGuiaUseCase {
  constructor(
    private secoesGuiaRepository: ISecoesGuiaRepository,
    private guiasRepository: IGuiasRepository
  ) {}

  async execute({
    guiaId,
    titulo,
    slug,
    ordem,
    conteudo,
    status = StatusGuia.RASCUNHO,
  }: CriarSecaoGuiaUseCaseRequest): Promise<CriarSecaoGuiaUseCaseResponse> {
    const guia = await this.guiasRepository.findById(guiaId);
    if (!guia) {
      throw new Error("Guia não encontrada.");
    }

    const secaoGuia = SecaoGuia.create({
      guiaId,
      titulo,
      slug,
      ordem,
      conteudo,
      status,
    });

    await this.secoesGuiaRepository.create(secaoGuia);
  }
}

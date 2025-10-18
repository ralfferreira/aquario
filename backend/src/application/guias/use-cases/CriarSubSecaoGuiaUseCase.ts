import { SubSecaoGuia } from "@/domain/guias/entities/SubSecaoGuia";
import { ISubSecoesGuiaRepository } from "@/domain/guias/repositories/ISubSecoesGuiaRepository";
import { ISecoesGuiaRepository } from "@/domain/guias/repositories/ISecoesGuiaRepository";
import { StatusGuia } from "@prisma/client";

interface CriarSubSecaoGuiaUseCaseRequest {
  secaoId: string;
  titulo: string;
  slug: string;
  ordem: number;
  conteudo?: string;
  status?: StatusGuia;
}

type CriarSubSecaoGuiaUseCaseResponse = void;

export class CriarSubSecaoGuiaUseCase {
  constructor(
    private subSecoesGuiaRepository: ISubSecoesGuiaRepository,
    private secoesGuiaRepository: ISecoesGuiaRepository
  ) {}

  async execute({
    secaoId,
    titulo,
    slug,
    ordem,
    conteudo,
    status = StatusGuia.RASCUNHO,
  }: CriarSubSecaoGuiaUseCaseRequest): Promise<CriarSubSecaoGuiaUseCaseResponse> {
    const secaoGuia = await this.secoesGuiaRepository.findById(secaoId);
    if (!secaoGuia) {
      throw new Error("Seção não encontrada.");
    }

    const subSecaoGuia = SubSecaoGuia.create({
      secaoId,
      titulo,
      slug,
      ordem,
      conteudo,
      status,
    });

    await this.subSecoesGuiaRepository.create(subSecaoGuia);
  }
}

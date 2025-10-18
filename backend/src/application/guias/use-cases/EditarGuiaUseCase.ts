import { Guia } from "@/domain/guias/entities/Guia";
import { IGuiasRepository } from "@/domain/guias/repositories/IGuiasRepository";
import { ICursosRepository } from "@/domain/cursos/repositories/ICursosRepository";
import { StatusGuia } from "@prisma/client";

interface EditarGuiaUseCaseRequest {
  id: string;
  titulo?: string;
  slug?: string;
  descricao?: string;
  status?: StatusGuia;
  cursoId?: string;
  tags?: string[];
}

type EditarGuiaUseCaseResponse = void;

export class EditarGuiaUseCase {
  constructor(
    private guiasRepository: IGuiasRepository,
    private cursosRepository: ICursosRepository
  ) {}

  async execute({
    id,
    titulo,
    slug,
    descricao,
    status,
    cursoId,
    tags,
  }: EditarGuiaUseCaseRequest): Promise<EditarGuiaUseCaseResponse> {
    const guia = await this.guiasRepository.findById(id);

    if (!guia) {
      throw new Error("Guia não encontrada.");
    }

    if (cursoId) {
      const curso = await this.cursosRepository.findById(cursoId);
      if (!curso) {
        throw new Error("Curso não encontrado.");
      }
    }

    if (titulo !== undefined) guia.titulo = titulo;
    if (slug !== undefined) guia.slug = slug;
    if (descricao !== undefined) guia.descricao = descricao;
    if (status !== undefined) guia.status = status;
    if (cursoId !== undefined) guia.cursoId = cursoId;
    if (tags !== undefined) guia.tags = tags;

    await this.guiasRepository.save(guia);
  }
}

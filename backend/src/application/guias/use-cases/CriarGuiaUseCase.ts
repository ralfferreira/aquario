import { Guia } from '@/domain/guias/entities/Guia';
import { IGuiasRepository } from '@/domain/guias/repositories/IGuiasRepository';
import { ICursosRepository } from '@/domain/cursos/repositories/ICursosRepository';
import { StatusGuia } from '@prisma/client';

interface CriarGuiaUseCaseRequest {
  titulo: string;
  slug: string;
  descricao?: string;
  status?: StatusGuia;
  cursoId?: string;
  tags?: string[];
}

type CriarGuiaUseCaseResponse = void;

export class CriarGuiaUseCase {
  constructor(
    private guiasRepository: IGuiasRepository,
    private cursosRepository: ICursosRepository
  ) {}

  async execute({
    titulo,
    slug,
    descricao,
    status = StatusGuia.RASCUNHO,
    cursoId,
    tags = [],
  }: CriarGuiaUseCaseRequest): Promise<CriarGuiaUseCaseResponse> {
    if (cursoId) {
      const curso = await this.cursosRepository.findById(cursoId);
      if (!curso) {
        throw new Error('Curso não encontrado.');
      }
    }

    const guia = Guia.create({
      titulo,
      slug,
      descricao,
      status,
      cursoId,
      tags,
    });

    await this.guiasRepository.create(guia);
  }
}

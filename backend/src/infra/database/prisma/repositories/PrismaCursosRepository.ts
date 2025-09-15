import { ICursosRepository } from '@/domain/cursos/repositories/ICursosRepository';
import { prisma } from '..';
import { Curso } from '@prisma/client';

export class PrismaCursosRepository implements ICursosRepository {
  async findById(id: string): Promise<Curso | null> {
    const curso = await prisma.curso.findUnique({
      where: { id },
    });

    return curso;
  }
}

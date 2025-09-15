import { ICursosRepository } from '@/domain/cursos/repositories/ICursosRepository';
import { prisma } from '..';
import { Curso } from '@prisma/client';

export class PrismaCursosRepository implements ICursosRepository {
  async findByCentroId(centroId: string): Promise<Curso[]> {
    const cursos = await prisma.curso.findMany({
      where: {
        centroId,
      },
      orderBy: {
        nome: 'asc',
      },
    });

    return cursos;
  }

  async findById(id: string): Promise<Curso | null> {
    const curso = await prisma.curso.findUnique({
      where: { id },
    });

    return curso;
  }
}

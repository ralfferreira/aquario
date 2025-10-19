import { ICursosRepository } from '@/domain/cursos/repositories/ICursosRepository';
import { prisma } from '..';
import { Curso } from '@prisma/client';
import { logger } from '@/infra/logger';

const log = logger.child('repository:cursos');

export class PrismaCursosRepository implements ICursosRepository {
  async findByCentroId(centroId: string): Promise<Curso[]> {
    log.debug('Listando cursos por centro', { centroId });

    const cursos = await prisma.curso.findMany({
      where: {
        centroId,
      },
      orderBy: {
        nome: 'asc',
      },
    });

    log.info('Cursos carregados para centro', { centroId, quantidade: cursos.length });
    return cursos;
  }

  async findById(id: string): Promise<Curso | null> {
    log.debug('Buscando curso por ID', { id });

    const curso = await prisma.curso.findUnique({
      where: { id },
    });

    if (!curso) {
      log.warn('Curso não encontrado', { id });
    }

    return curso;
  }
}

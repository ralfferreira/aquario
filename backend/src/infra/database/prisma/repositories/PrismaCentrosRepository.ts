import { ICentrosRepository } from '@/domain/centros/repositories/ICentrosRepository';
import { prisma } from '..';
import { Centro } from '@prisma/client';
import { logger } from '@/infra/logger';

const log = logger.child('repository:centros');

export class PrismaCentrosRepository implements ICentrosRepository {
  async findMany(): Promise<Centro[]> {
    log.debug('Listando centros');

    const centros = await prisma.centro.findMany({
      orderBy: {
        sigla: 'asc',
      },
    });
    log.info('Centros carregados', { quantidade: centros.length });
    return centros;
  }

  async findById(id: string): Promise<Centro | null> {
    log.debug('Buscando centro por ID', { id });

    const centro = await prisma.centro.findUnique({
      where: { id },
    });

    if (!centro) {
      log.warn('Centro não encontrado', { id });
    }

    return centro;
  }
}

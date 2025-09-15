import { ICentrosRepository } from '@/domain/centros/repositories/ICentrosRepository';
import { prisma } from '..';
import { Centro } from '@prisma/client';

export class PrismaCentrosRepository implements ICentrosRepository {
  async findMany(): Promise<Centro[]> {
    const centros = await prisma.centro.findMany({
      orderBy: {
        sigla: 'asc',
      },
    });
    return centros;
  }

  async findById(id: string): Promise<Centro | null> {
    const centro = await prisma.centro.findUnique({
      where: { id },
    });

    return centro;
  }
}

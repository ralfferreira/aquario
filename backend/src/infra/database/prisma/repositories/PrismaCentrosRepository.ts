import { ICentrosRepository } from '@/domain/centros/repositories/ICentrosRepository';
import { prisma } from '..';
import { Centro } from '@prisma/client';

export class PrismaCentrosRepository implements ICentrosRepository {
  async findById(id: string): Promise<Centro | null> {
    const centro = await prisma.centro.findUnique({
      where: { id },
    });

    return centro;
  }
}

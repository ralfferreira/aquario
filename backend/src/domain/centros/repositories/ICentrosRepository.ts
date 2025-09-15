import { Centro } from '@prisma/client';

export interface ICentrosRepository {
  findById(id: string): Promise<Centro | null>;
}

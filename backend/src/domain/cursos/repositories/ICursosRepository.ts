import { Curso } from '@prisma/client';

export interface ICursosRepository {
  findById(id: string): Promise<Curso | null>;
  findByCentroId(centroId: string): Promise<Curso[]>;
}

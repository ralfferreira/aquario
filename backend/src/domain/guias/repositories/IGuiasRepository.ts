import { Guia } from '../entities/Guia';

export interface IGuiasRepository {
  create(guia: Guia): Promise<void>;
  findMany(): Promise<Guia[]>;
  findById(id: string): Promise<Guia | null>;
  findBySlug(slug: string): Promise<Guia | null>;
  findByCursoId(cursoId: string): Promise<Guia[]>;
  save(guia: Guia): Promise<void>;
  delete(id: string): Promise<void>;
}

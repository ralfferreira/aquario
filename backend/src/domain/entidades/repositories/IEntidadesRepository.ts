import { Entidade } from '../entities/Entidade';

export interface IEntidadesRepository {
  findMany(): Promise<Entidade[]>;
  findById(id: string): Promise<Entidade | null>;
}

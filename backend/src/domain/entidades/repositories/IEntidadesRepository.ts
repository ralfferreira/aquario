import { Entidade } from '../entities/Entidade';

export interface IEntidadesRepository {
  findMany(): Promise<Entidade[]>;
}

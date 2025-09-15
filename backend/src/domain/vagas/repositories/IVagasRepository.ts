import { Vaga } from '../entities/Vaga';

export interface IVagasRepository {
  create(vaga: Vaga): Promise<void>;
  findMany(): Promise<Vaga[]>;
  findById(id: string): Promise<Vaga | null>;
  save(vaga: Vaga): Promise<void>;
  delete(id: string): Promise<void>;
}

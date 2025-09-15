import { Projeto } from '../entities/Projeto';

export interface IProjetosRepository {
  create(projeto: Projeto): Promise<void>;
  findMany(): Promise<Projeto[]>;
  findById(id: string): Promise<Projeto | null>;
  save(projeto: Projeto): Promise<void>;
  delete(id: string): Promise<void>;
}

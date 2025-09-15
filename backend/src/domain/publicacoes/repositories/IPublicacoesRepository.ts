import { Publicacao } from '../entities/Publicacao';

export interface IPublicacoesRepository {
  create(publicacao: Publicacao): Promise<void>;
  findMany(): Promise<Publicacao[]>;
  findById(id: string): Promise<Publicacao | null>;
  save(publicacao: Publicacao): Promise<void>;
  delete(id: string): Promise<void>;
}

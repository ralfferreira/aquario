import { SubSecaoGuia } from '../entities/SubSecaoGuia';

export interface ISubSecoesGuiaRepository {
  create(subSecaoGuia: SubSecaoGuia): Promise<void>;
  findMany(): Promise<SubSecaoGuia[]>;
  findBySecaoId(secaoId: string): Promise<SubSecaoGuia[]>;
  findById(id: string): Promise<SubSecaoGuia | null>;
  save(subSecaoGuia: SubSecaoGuia): Promise<void>;
  delete(id: string): Promise<void>;
}

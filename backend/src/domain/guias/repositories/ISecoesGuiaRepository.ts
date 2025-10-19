import { SecaoGuia } from '../entities/SecaoGuia';

export interface ISecoesGuiaRepository {
  create(secaoGuia: SecaoGuia): Promise<void>;
  findMany(): Promise<SecaoGuia[]>;
  findByGuiaId(guiaId: string): Promise<SecaoGuia[]>;
  findById(id: string): Promise<SecaoGuia | null>;
  save(secaoGuia: SecaoGuia): Promise<void>;
  delete(id: string): Promise<void>;
}

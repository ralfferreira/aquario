import { ItemAchadoEPerdido } from '../entities/ItemAchadoEPerdido';

export interface IItensAchadosEPerdidosRepository {
  create(item: ItemAchadoEPerdido): Promise<void>;
  findMany(): Promise<ItemAchadoEPerdido[]>;
  findById(id: string): Promise<ItemAchadoEPerdido | null>;
  save(item: ItemAchadoEPerdido): Promise<void>;
  delete(id: string): Promise<void>;
}

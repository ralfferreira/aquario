import { Usuario } from '../entities/Usuario';

export interface IUsuariosRepository {
  create(usuario: Usuario): Promise<void>;
  findById(id: string): Promise<Usuario | null>;
  findByEmail(email: string): Promise<Usuario | null>;
  findMany(): Promise<Usuario[]>;
}

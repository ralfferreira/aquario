import { Usuario } from '../entities/Usuario';

export interface IUsuariosRepository {
  findById(id: string): Promise<Usuario | null>;
  findByEmail(email: string): Promise<Usuario | null>;
}

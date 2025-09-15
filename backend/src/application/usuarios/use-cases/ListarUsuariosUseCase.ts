import { Usuario } from '@/domain/usuarios/entities/Usuario';
import { IUsuariosRepository } from '@/domain/usuarios/repositories/IUsuariosRepository';

interface ListarUsuariosUseCaseResponse {
  usuarios: Usuario[];
}

export class ListarUsuariosUseCase {
  constructor(private usuariosRepository: IUsuariosRepository) {}

  async execute(): Promise<ListarUsuariosUseCaseResponse> {
    const usuarios = await this.usuariosRepository.findMany();

    return { usuarios };
  }
}

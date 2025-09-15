import { Usuario } from '@/domain/usuarios/entities/Usuario';
import { IUsuariosRepository } from '@/domain/usuarios/repositories/IUsuariosRepository';

interface BuscarUsuarioPorIdUseCaseRequest {
  id: string;
}

interface BuscarUsuarioPorIdUseCaseResponse {
  usuario: Usuario | null;
}

export class BuscarUsuarioPorIdUseCase {
  constructor(private usuariosRepository: IUsuariosRepository) {}

  async execute({ id }: BuscarUsuarioPorIdUseCaseRequest): Promise<BuscarUsuarioPorIdUseCaseResponse> {
    const usuario = await this.usuariosRepository.findById(id);

    return { usuario };
  }
}

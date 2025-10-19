import { compare } from 'bcryptjs';
import { IUsuariosRepository } from '@/domain/usuarios/repositories/IUsuariosRepository';
import { Usuario } from '@/domain/usuarios/entities/Usuario';

interface AuthenticateUseCaseRequest {
  email: string;
  senha: string;
}

interface AuthenticateUseCaseResponse {
  usuario: Usuario;
}

export class AuthenticateUseCase {
  constructor(private usuariosRepository: IUsuariosRepository) {}

  async execute({
    email,
    senha,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const normalizedEmail = email.trim().toLowerCase();

    const usuario = await this.usuariosRepository.findByEmail(normalizedEmail);

    if (!usuario) {
      throw new Error('E-mail ou senha inválidos.');
    }

    const senhaCorresponde = await compare(senha, usuario.props.senhaHash);

    if (!senhaCorresponde) {
      throw new Error('E-mail ou senha inválidos.');
    }

    return { usuario };
  }
}

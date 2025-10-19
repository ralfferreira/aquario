import { hash } from 'bcryptjs';
import { IUsuariosRepository } from '@/domain/usuarios/repositories/IUsuariosRepository';
import { Usuario } from '@/domain/usuarios/entities/Usuario';
import { PapelUsuario, PapelPlataforma } from '@prisma/client';
import { ICentrosRepository } from '@/domain/centros/repositories/ICentrosRepository';
import { ICursosRepository } from '@/domain/cursos/repositories/ICursosRepository';

interface RegisterUseCaseRequest {
  nome: string;
  email: string;
  senha: string;
  papel: PapelUsuario;
  centroId: string;
  bio?: string;
  urlFotoPerfil?: string;
  cursoId?: string;
  periodo?: number;
}

type RegisterUseCaseResponse = void;

export class RegisterUseCase {
  constructor(
    private usuariosRepository: IUsuariosRepository,
    private centrosRepository: ICentrosRepository,
    private cursosRepository: ICursosRepository
  ) {}

  async execute({
    nome,
    email,
    senha,
    papel,
    centroId,
    bio,
    urlFotoPerfil,
    cursoId,
    periodo,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const normalizedEmail = email.trim().toLowerCase();

    if (papel === 'DISCENTE' && (!cursoId || !periodo)) {
      throw new Error('Discentes devem fornecer curso e período.');
    }

    const usuarioComMesmoEmail = await this.usuariosRepository.findByEmail(normalizedEmail);
    if (usuarioComMesmoEmail) {
      throw new Error('Este e-mail já está em uso.');
    }

    const centro = await this.centrosRepository.findById(centroId);
    if (!centro) {
      throw new Error('Centro não encontrado.');
    }

    let curso = null;
    if (papel === 'DISCENTE' && cursoId) {
      curso = await this.cursosRepository.findById(cursoId);
      if (!curso) {
        throw new Error('Curso não encontrado.');
      }
    }

    const senhaHash = await hash(senha, 10);

    const usuario = Usuario.create({
      nome,
      email: normalizedEmail,
      senhaHash,
      papel,
      permissoes: [],
      papelPlataforma: PapelPlataforma.USER,
      centro,
      curso,
      bio,
      urlFotoPerfil,
      periodo,
    });

    await this.usuariosRepository.create(usuario);
  }
}

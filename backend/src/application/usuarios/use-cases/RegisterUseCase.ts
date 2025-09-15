import { hash } from 'bcryptjs';
import { IUsuariosRepository } from '@/domain/usuarios/repositories/IUsuariosRepository';
import { Usuario } from '@/domain/usuarios/entities/Usuario';
import { PapelUsuario } from '@prisma/client';
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
    private cursosRepository: ICursosRepository,
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
    if (papel === 'DISCENTE' && (!cursoId || !periodo)) {
      throw new Error('Discentes devem fornecer curso e período.');
    }

    const usuarioComMesmoEmail = await this.usuariosRepository.findByEmail(email);
    if (usuarioComMesmoEmail) {
      throw new Error('Este e-mail já está em uso.');
    }

    const centro = await this.centrosRepository.findById(centroId);
    if (!centro) {
      throw new Error('Centro não encontrado.');
    }

    if (cursoId) {
      const curso = await this.cursosRepository.findById(cursoId);
      if (!curso) {
        throw new Error('Curso não encontrado.');
      }
    }

    const senhaHash = await hash(senha, 10);

    await this.usuariosRepository.create(
      Usuario.create({
        nome,
        email,
        senhaHash,
        papel,
        permissoes: [],
        centroId,
        bio,
        urlFotoPerfil,
        cursoId,
        periodo,
      }),
    );
  }
}

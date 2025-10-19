import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { AuthenticateUseCase } from '../AuthenticateUseCase';
import { RegisterUseCase } from '../RegisterUseCase';
import {
  InMemoryUsuariosRepository,
  InMemoryCentrosRepository,
  InMemoryCursosRepository,
} from './in-memory-repositories';
import { Centro, Curso, PapelUsuario } from '@prisma/client';

let usuariosRepository: InMemoryUsuariosRepository;
let authenticateUseCase: AuthenticateUseCase;
let registerUseCase: RegisterUseCase;
let centro: Centro;
let curso: Curso;

describe('AuthenticateUseCase', () => {
  beforeEach(() => {
    usuariosRepository = new InMemoryUsuariosRepository();

    centro = {
      id: 'centro-1',
      nome: 'Centro de Informática',
      sigla: 'CI',
      descricao: null,
      campusId: 'campus-1',
    };

    curso = {
      id: 'curso-1',
      nome: 'Ciência da Computação',
      centroId: centro.id,
    };

    const centrosRepository = new InMemoryCentrosRepository([centro]);
    const cursosRepository = new InMemoryCursosRepository([curso]);

    authenticateUseCase = new AuthenticateUseCase(usuariosRepository);
    registerUseCase = new RegisterUseCase(usuariosRepository, centrosRepository, cursosRepository);
  });

  it('should authenticate with a case-insensitive email match', async () => {
    await registerUseCase.execute({
      nome: 'Usuário Autenticado',
      email: 'usuario.autenticado@example.com',
      senha: 'SenhaForte123',
      papel: PapelUsuario.DISCENTE,
      centroId: centro.id,
      cursoId: curso.id,
      periodo: 5,
    });

    const { usuario } = await authenticateUseCase.execute({
      email: 'USUARIO.AUTENTICADO@EXAMPLE.COM',
      senha: 'SenhaForte123',
    });

    assert.equal(usuario.props.email, 'usuario.autenticado@example.com');
    assert.equal(usuario.props.papelPlataforma, 'USER');
  });

  it('should throw an error when the password does not match', async () => {
    await registerUseCase.execute({
      nome: 'Usuário com Senha',
      email: 'senha.errada@example.com',
      senha: 'SenhaCorreta123',
      papel: PapelUsuario.DOCENTE,
      centroId: centro.id,
    });

    await assert.rejects(
      authenticateUseCase.execute({
        email: 'senha.errada@example.com',
        senha: 'senhaIncorreta',
      }),
      {
        message: 'E-mail ou senha inválidos.',
      }
    );
  });
});

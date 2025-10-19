import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { compare } from 'bcryptjs';
import { RegisterUseCase } from '../RegisterUseCase';
import {
  InMemoryUsuariosRepository,
  InMemoryCentrosRepository,
  InMemoryCursosRepository,
} from './in-memory-repositories';
import { Centro, Curso, PapelUsuario } from '@prisma/client';

describe('RegisterUseCase', () => {
  let usuariosRepository: InMemoryUsuariosRepository;
  let centrosRepository: InMemoryCentrosRepository;
  let cursosRepository: InMemoryCursosRepository;
  let registerUseCase: RegisterUseCase;
  let centro: Centro;
  let curso: Curso;

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

    centrosRepository = new InMemoryCentrosRepository([centro]);
    cursosRepository = new InMemoryCursosRepository([curso]);

    registerUseCase = new RegisterUseCase(usuariosRepository, centrosRepository, cursosRepository);
  });

  it('should hash the password, normalize the email and assign the USER platform role by default', async () => {
    await registerUseCase.execute({
      nome: 'Novo Usuário',
      email: ' Novo.Usuario@Email.com ',
      senha: 'SenhaForte123',
      papel: PapelUsuario.DISCENTE,
      centroId: centro.id,
      cursoId: curso.id,
      periodo: 3,
    });

    assert.equal(usuariosRepository.items.length, 1);
    const usuario = usuariosRepository.items[0];

    assert.equal(usuario.props.email, 'novo.usuario@email.com');
    assert.ok(await compare('SenhaForte123', usuario.props.senhaHash));
    assert.equal(usuario.props.papelPlataforma, 'USER');
    assert.equal(usuario.props.centro.id, centro.id);
    assert.equal(usuario.props.curso?.id, curso.id);
  });

  it('should reject duplicate e-mails ignoring casing', async () => {
    await registerUseCase.execute({
      nome: 'Usuário Primário',
      email: 'duplicado@example.com',
      senha: 'SenhaForte123',
      papel: PapelUsuario.DOCENTE,
      centroId: centro.id,
    });

    await assert.rejects(
      registerUseCase.execute({
        nome: 'Usuário Secundário',
        email: 'Duplicado@Example.com',
        senha: 'OutraSenha123',
        papel: PapelUsuario.DOCENTE,
        centroId: centro.id,
      }),
      {
        message: 'Este e-mail já está em uso.',
      }
    );
  });
});

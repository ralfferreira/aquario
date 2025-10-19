import { Usuario } from '@/domain/usuarios/entities/Usuario';
import { IUsuariosRepository } from '@/domain/usuarios/repositories/IUsuariosRepository';
import { prisma } from '..';

export class PrismaUsuariosRepository implements IUsuariosRepository {
  async findMany(): Promise<Usuario[]> {
    const usuarios = await prisma.usuario.findMany({
      include: {
        centro: true,
        curso: true,
      },
      orderBy: {
        nome: 'asc',
      },
    });

    return usuarios
      .filter(usuario => usuario.centro)
      .map(usuario =>
        Usuario.create(
          {
            nome: usuario.nome,
            email: usuario.email,
            senhaHash: usuario.senhaHash,
            papel: usuario.papel,
            permissoes: usuario.permissoes,
            centro: usuario.centro!,
            curso: usuario.curso,
            bio: usuario.bio,
            urlFotoPerfil: usuario.urlFotoPerfil,
            periodo: usuario.periodo,
            papelPlataforma: usuario.papelPlataforma,
          },
          usuario.id
        )
      );
  }

  async create(usuario: Usuario): Promise<void> {
    await prisma.usuario.create({
      data: {
        id: usuario.id,
        nome: usuario.props.nome,
        email: usuario.props.email,
        senhaHash: usuario.props.senhaHash,
        papel: usuario.props.papel,
        permissoes: usuario.props.permissoes,
        papelPlataforma: usuario.props.papelPlataforma,
        centroId: usuario.props.centro.id,
        bio: usuario.props.bio,
        urlFotoPerfil: usuario.props.urlFotoPerfil,
        cursoId: usuario.props.curso?.id,
        periodo: usuario.props.periodo,
      },
    });
  }

  async findById(id: string): Promise<Usuario | null> {
    const usuario = await prisma.usuario.findUnique({
      where: { id },
      include: {
        centro: true,
        curso: true,
      },
    });

    if (!usuario || !usuario.centro) {
      return null;
    }

    return Usuario.create(
      {
        nome: usuario.nome,
        email: usuario.email,
        senhaHash: usuario.senhaHash,
        papel: usuario.papel,
        permissoes: usuario.permissoes,
        papelPlataforma: usuario.papelPlataforma,
        centro: usuario.centro,
        curso: usuario.curso,
        bio: usuario.bio,
        urlFotoPerfil: usuario.urlFotoPerfil,
        periodo: usuario.periodo,
      },
      usuario.id
    );
  }

  async findByEmail(email: string): Promise<Usuario | null> {
    const normalizedEmail = email.trim().toLowerCase();

    const usuario = await prisma.usuario.findUnique({
      where: { email: normalizedEmail },
      include: {
        centro: true,
        curso: true,
      },
    });

    if (!usuario || !usuario.centro) {
      return null;
    }

    return Usuario.create(
      {
        nome: usuario.nome,
        email: usuario.email,
        senhaHash: usuario.senhaHash,
        papel: usuario.papel,
        permissoes: usuario.permissoes,
        papelPlataforma: usuario.papelPlataforma,
        centro: usuario.centro,
        curso: usuario.curso,
        bio: usuario.bio,
        urlFotoPerfil: usuario.urlFotoPerfil,
        periodo: usuario.periodo,
      },
      usuario.id
    );
  }
}

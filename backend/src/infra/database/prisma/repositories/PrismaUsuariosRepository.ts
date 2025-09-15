import { Usuario } from '@/domain/usuarios/entities/Usuario';
import { IUsuariosRepository } from '@/domain/usuarios/repositories/IUsuariosRepository';
import { prisma } from '..';

export class PrismaUsuariosRepository implements IUsuariosRepository {
  async create(usuario: Usuario): Promise<void> {
    await prisma.usuario.create({
      data: {
        id: usuario.id,
        nome: usuario.props.nome,
        email: usuario.props.email,
        senhaHash: usuario.props.senhaHash,
        papel: usuario.props.papel,
        permissoes: usuario.props.permissoes,
        centroId: usuario.props.centroId,
        bio: usuario.props.bio,
        urlFotoPerfil: usuario.props.urlFotoPerfil,
        cursoId: usuario.props.cursoId,
        periodo: usuario.props.periodo,
      },
    });
  }

  async findById(id: string): Promise<Usuario | null> {
    const usuario = await prisma.usuario.findUnique({
      where: { id },
    });

    if (!usuario || !usuario.centroId) {
      return null;
    }

    return Usuario.create(
      {
        nome: usuario.nome,
        email: usuario.email,
        senhaHash: usuario.senhaHash,
        papel: usuario.papel,
        permissoes: usuario.permissoes,
        centroId: usuario.centroId,
        bio: usuario.bio,
        urlFotoPerfil: usuario.urlFotoPerfil,
        cursoId: usuario.cursoId,
        periodo: usuario.periodo,
      },
      usuario.id,
    );
  }

  async findByEmail(email: string): Promise<Usuario | null> {
    const usuario = await prisma.usuario.findUnique({
      where: { email },
    });

    if (!usuario || !usuario.centroId) {
      return null;
    }

    return Usuario.create(
      {
        nome: usuario.nome,
        email: usuario.email,
        senhaHash: usuario.senhaHash,
        papel: usuario.papel,
        permissoes: usuario.permissoes,
        centroId: usuario.centroId,
        bio: usuario.bio,
        urlFotoPerfil: usuario.urlFotoPerfil,
        cursoId: usuario.cursoId,
        periodo: usuario.periodo,
      },
      usuario.id,
    );
  }
}

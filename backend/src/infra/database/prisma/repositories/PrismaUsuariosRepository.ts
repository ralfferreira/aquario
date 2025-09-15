import { Usuario } from '@/domain/usuarios/entities/Usuario';
import { IUsuariosRepository } from '@/domain/usuarios/repositories/IUsuariosRepository';
import { prisma } from '..';

export class PrismaUsuariosRepository implements IUsuariosRepository {
  async findById(id: string): Promise<Usuario | null> {
    const usuario = await prisma.usuario.findUnique({
      where: { id },
    });

    if (!usuario) {
      return null;
    }

    return Usuario.create(
      {
        nome: usuario.nome,
        email: usuario.email,
      },
      usuario.id,
    );
  }

  async findByEmail(email: string): Promise<Usuario | null> {
    const usuario = await prisma.usuario.findUnique({
      where: { email },
    });

    if (!usuario) {
      return null;
    }

    return Usuario.create(
      {
        nome: usuario.nome,
        email: usuario.email,
      },
      usuario.id,
    );
  }
}

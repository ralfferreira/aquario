import { Usuario } from '@/domain/usuarios/entities/Usuario';
import { IUsuariosRepository } from '@/domain/usuarios/repositories/IUsuariosRepository';
import { ICentrosRepository } from '@/domain/centros/repositories/ICentrosRepository';
import { ICursosRepository } from '@/domain/cursos/repositories/ICursosRepository';
import { Centro, Curso } from '@prisma/client';

export class InMemoryUsuariosRepository implements IUsuariosRepository {
  public items: Usuario[] = [];

  async create(usuario: Usuario): Promise<void> {
    this.items.push(usuario);
  }

  async findById(id: string): Promise<Usuario | null> {
    const usuario = this.items.find(item => item.id === id);
    return usuario ?? null;
  }

  async findByEmail(email: string): Promise<Usuario | null> {
    const normalizedEmail = email.trim().toLowerCase();
    const usuario = this.items.find(item => item.email === normalizedEmail);
    return usuario ?? null;
  }

  async findMany(): Promise<Usuario[]> {
    return this.items;
  }
}

export class InMemoryCentrosRepository implements ICentrosRepository {
  constructor(private centros: Centro[] = []) {}

  async findById(id: string): Promise<Centro | null> {
    return this.centros.find(centro => centro.id === id) ?? null;
  }

  async findMany(): Promise<Centro[]> {
    return this.centros;
  }
}

export class InMemoryCursosRepository implements ICursosRepository {
  constructor(private cursos: Curso[] = []) {}

  async findById(id: string): Promise<Curso | null> {
    return this.cursos.find(curso => curso.id === id) ?? null;
  }

  async findByCentroId(centroId: string): Promise<Curso[]> {
    return this.cursos.filter(curso => curso.centroId === centroId);
  }
}

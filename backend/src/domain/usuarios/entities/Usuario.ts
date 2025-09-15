import { Entity } from '@/core/entities/Entity';

import { PapelUsuario } from '@prisma/client';

interface UsuarioProps {
  nome: string;
  email: string;
  senhaHash: string;
  papel: PapelUsuario;
  permissoes: string[];
  centroId: string;
  bio?: string | null;
  urlFotoPerfil?: string | null;
  periodo?: number | null;
  cursoId?: string | null;
}

export class Usuario extends Entity<UsuarioProps> {
  get email() {
    return this.props.email;
  }

  static create(props: UsuarioProps, id?: string) {
    const usuario = new Usuario(props, id);
    return usuario;
  }
}

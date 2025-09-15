import { Entity } from '@/core/entities/Entity';

interface UsuarioProps {
  nome: string;
  email: string;
  // Outras propriedades podem ser adicionadas conforme necessário
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

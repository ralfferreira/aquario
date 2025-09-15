import { Entity } from '@/core/entities/Entity';

export interface PublicacaoAutor {
  id: string;
  nome: string;
  urlFotoPerfil?: string | null;
}

interface PublicacaoProps {
  titulo: string;
  conteudo: string;
  autor: PublicacaoAutor;
  centroId: string;
  criadoEm?: Date;
  atualizadoEm?: Date;
}

export class Publicacao extends Entity<PublicacaoProps> {
  get autor() {
    return this.props.autor;
  }

  get titulo() {
    return this.props.titulo;
  }

  set titulo(titulo: string) {
    this.props.titulo = titulo;
    this.touch();
  }

  get conteudo() {
    return this.props.conteudo;
  }

  set conteudo(conteudo: string) {
    this.props.conteudo = conteudo;
    this.touch();
  }

  private touch() {
    this.props.atualizadoEm = new Date();
  }

  static create(props: PublicacaoProps, id?: string) {
    const publicacao = new Publicacao(
      {
        ...props,
        criadoEm: props.criadoEm ?? new Date(),
        atualizadoEm: props.atualizadoEm ?? new Date(),
      },
      id,
    );

    return publicacao;
  }
}

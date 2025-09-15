import { Entity } from '@/core/entities/Entity';
import { TipoProjeto } from '@prisma/client';

export interface ProjetoProps {
  titulo: string;
  descricao: string;
  tipo: TipoProjeto;
  criadorId: string;
  membros?: any[];
  tags: string[];
  urlFoto?: string | null;
  url?: string | null;
  criadoEm?: Date;
  atualizadoEm?: Date;
  centroId: string;
}

export class Projeto extends Entity<ProjetoProps> {
  get titulo() {
    return this.props.titulo;
  }

  get descricao() {
    return this.props.descricao;
  }

  get tipo() {
    return this.props.tipo;
  }

  get criadorId() {
    return this.props.criadorId;
  }

  get urlFoto() {
    return this.props.urlFoto;
  }

  get url() {
    return this.props.url;
  }

  get centroId() {
    return this.props.centroId;
  }

  get tags() {
    return this.props.tags;
  }

  set titulo(titulo: string) {
    this.props.titulo = titulo;
    this.touch();
  }

  set descricao(descricao: string) {
    this.props.descricao = descricao;
    this.touch();
  }

  set tags(tags: string[]) {
    this.props.tags = tags;
    this.touch();
  }

  set url(url: string | null | undefined) {
    this.props.url = url;
    this.touch();
  }

  set urlFoto(urlFoto: string | null | undefined) {
    this.props.urlFoto = urlFoto;
    this.touch();
  }

  private touch() {
    this.props.atualizadoEm = new Date();
  }

  static create(props: ProjetoProps, id?: string) {
    const projeto = new Projeto(props, id);
    return projeto;
  }
}

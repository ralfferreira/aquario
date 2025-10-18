import { Entity } from "@/core/entities/Entity";
import { StatusGuia } from "@prisma/client";

export interface GuiaProps {
  titulo: string;
  slug: string;
  descricao?: string | null;
  status: StatusGuia;
  cursoId?: string | null;
  tags: string[];
  criadoEm?: Date;
  atualizadoEm?: Date;
}

export class Guia extends Entity<GuiaProps> {
  get titulo() {
    return this.props.titulo;
  }

  get slug() {
    return this.props.slug;
  }

  get descricao() {
    return this.props.descricao;
  }

  get status() {
    return this.props.status;
  }

  get cursoId() {
    return this.props.cursoId;
  }

  get tags() {
    return this.props.tags;
  }

  get criadoEm() {
    return this.props.criadoEm;
  }

  get atualizadoEm() {
    return this.props.atualizadoEm;
  }

  set titulo(titulo: string) {
    this.props.titulo = titulo;
    this.touch();
  }

  set slug(slug: string) {
    this.props.slug = slug;
    this.touch();
  }

  set descricao(descricao: string | null | undefined) {
    this.props.descricao = descricao;
    this.touch();
  }

  set status(status: StatusGuia) {
    this.props.status = status;
    this.touch();
  }

  set cursoId(cursoId: string | null | undefined) {
    this.props.cursoId = cursoId;
    this.touch();
  }

  set tags(tags: string[]) {
    this.props.tags = tags;
    this.touch();
  }

  private touch() {
    this.props.atualizadoEm = new Date();
  }

  static create(props: GuiaProps, id?: string) {
    const guia = new Guia(
      {
        ...props,
        criadoEm: props.criadoEm ?? new Date(),
        atualizadoEm: props.atualizadoEm ?? new Date(),
      },
      id
    );

    return guia;
  }
}

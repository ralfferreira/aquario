import { Entity } from "@/core/entities/Entity";
import { StatusGuia } from "@prisma/client";

export interface SubSecaoGuiaProps {
  secaoId: string;
  titulo: string;
  slug: string;
  ordem: number;
  conteudo?: string | null;
  status: StatusGuia;
  criadoEm?: Date;
  atualizadoEm?: Date;
}

export class SubSecaoGuia extends Entity<SubSecaoGuiaProps> {
  get secaoId() {
    return this.props.secaoId;
  }

  get titulo() {
    return this.props.titulo;
  }

  get slug() {
    return this.props.slug;
  }

  get ordem() {
    return this.props.ordem;
  }

  get conteudo() {
    return this.props.conteudo;
  }

  get status() {
    return this.props.status;
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

  set ordem(ordem: number) {
    this.props.ordem = ordem;
    this.touch();
  }

  set conteudo(conteudo: string | null | undefined) {
    this.props.conteudo = conteudo;
    this.touch();
  }

  set status(status: StatusGuia) {
    this.props.status = status;
    this.touch();
  }

  private touch() {
    this.props.atualizadoEm = new Date();
  }

  static create(props: SubSecaoGuiaProps, id?: string) {
    const subSecaoGuia = new SubSecaoGuia(
      {
        ...props,
        criadoEm: props.criadoEm ?? new Date(),
        atualizadoEm: props.atualizadoEm ?? new Date(),
      },
      id
    );

    return subSecaoGuia;
  }
}

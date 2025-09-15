import { Entity } from '@/core/entities/Entity';
import { TipoVaga } from '@prisma/client';

export interface VagaProps {
  titulo: string;
  descricao: string;
  tipoVaga: TipoVaga;
  publicadorId: string;
  centroId: string;
  eAtiva?: boolean;
  criadoEm?: Date;
  atualizadoEm?: Date;
}

export class Vaga extends Entity<VagaProps> {
  get titulo() {
    return this.props.titulo;
  }

  get descricao() {
    return this.props.descricao;
  }

  get tipoVaga() {
    return this.props.tipoVaga;
  }

  get publicadorId() {
    return this.props.publicadorId;
  }

  get centroId() {
    return this.props.centroId;
  }

  get eAtiva(): boolean {
    return this.props.eAtiva ?? true;
  }

  set titulo(titulo: string) {
    this.props.titulo = titulo;
    this.touch();
  }

  set descricao(descricao: string) {
    this.props.descricao = descricao;
    this.touch();
  }

  set tipoVaga(tipoVaga: TipoVaga) {
    this.props.tipoVaga = tipoVaga;
    this.touch();
  }

  set eAtiva(eAtiva: boolean) {
    this.props.eAtiva = eAtiva;
    this.touch();
  }

  get criadoEm() {
    return this.props.criadoEm;
  }

  get atualizadoEm() {
    return this.props.atualizadoEm;
  }

  private touch() {
    this.props.atualizadoEm = new Date();
  }

  static create(props: VagaProps, id?: string) {
    const vaga = new Vaga(
      {
        ...props,
        eAtiva: props.eAtiva ?? true,
      },
      id,
    );
    return vaga;
  }
}

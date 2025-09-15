import { Entity } from '@/core/entities/Entity';
import { StatusItemAchadoEPerdido as StatusItem } from '@prisma/client';

interface ItemAchadoEPerdidoProps {
  titulo: string;
  descricao: string;
  status: StatusItem;
  autorId: string;
  criadoEm?: Date;
  atualizadoEm?: Date;
}

export class ItemAchadoEPerdido extends Entity<ItemAchadoEPerdidoProps> {
  get status() {
    return this.props.status;
  }

  set status(status: StatusItem) {
    this.props.status = status;
    this.touch();
  }

  private touch() {
    this.props.atualizadoEm = new Date();
  }

  static create(props: ItemAchadoEPerdidoProps, id?: string) {
    const item = new ItemAchadoEPerdido(
      {
        ...props,
        criadoEm: props.criadoEm ?? new Date(),
        atualizadoEm: props.atualizadoEm ?? new Date(),
      },
      id,
    );

    return item;
  }
}

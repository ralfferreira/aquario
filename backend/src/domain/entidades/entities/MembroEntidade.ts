import { Entity } from '@/core/entities/Entity';
import { PapelMembro } from '@prisma/client';

export interface MembroEntidadeProps {
  usuarioId: string;
  entidadeId: string;
  papel: PapelMembro;
}

export class MembroEntidade extends Entity<MembroEntidadeProps> {
  static create(props: MembroEntidadeProps, id?: string) {
    return new MembroEntidade(props, id);
  }
}

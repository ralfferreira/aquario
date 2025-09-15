import { MembroEntidade } from '../entities/MembroEntidade';

export interface MembroComUsuario {
  id: string;
  papel: string;
  usuario: {
    id: string;
    nome: string;
    urlFotoPerfil?: string | null;
    papel: 'DOCENTE' | 'DISCENTE';
    curso?: { nome: string } | null;
    periodo?: number | null;
  };
}

export interface IMembroEntidadeRepository {
  findManyByEntidadeId(entidadeId: string): Promise<MembroComUsuario[]>;
}

import { Guia, Secao, SubSecao } from "../../types";

export type GuiasDataProvider = {
  getByCurso(cursoSlug: string): Promise<Guia[]>;
  getSecoes(guiaSlug: string, cursoSlug?: string): Promise<Secao[]>;
  getSubSecoes(secaoSlug: string, cursoSlug?: string): Promise<SubSecao[]>;
  getCentros(): Promise<Array<{ id: string; nome: string; sigla: string }>>;
  getCursos(
    centroSigla: string
  ): Promise<Array<{ id: string; nome: string; centroId: string; realId: string }>>;
};

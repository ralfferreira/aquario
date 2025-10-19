import { Guia, Secao, SubSecao } from "../types";
import { GuiasDataProvider } from "./providers/guias-provider.interface";
import { BackendGuiasProvider } from "./providers/backend-guias-provider";
import { LocalFileGuiasProvider } from "./providers/local-file-guias-provider";
import { DATA_PROVIDER_CONFIG } from "../config/env";

// Provider factory
function createProvider(): GuiasDataProvider {
  switch (DATA_PROVIDER_CONFIG.PROVIDER) {
    case DATA_PROVIDER_CONFIG.PROVIDERS.LOCAL:
      return new LocalFileGuiasProvider();
    case DATA_PROVIDER_CONFIG.PROVIDERS.BACKEND:
    default:
      return new BackendGuiasProvider();
  }
}

const provider = createProvider();

export const guiasService = {
  getByCurso: async (cursoSlug: string): Promise<Guia[]> => {
    return await provider.getByCurso(cursoSlug);
  },

  getSecoes: async (guiaSlug: string): Promise<Secao[]> => {
    return await provider.getSecoes(guiaSlug);
  },

  getSubSecoes: async (secaoSlug: string): Promise<SubSecao[]> => {
    return await provider.getSubSecoes(secaoSlug);
  },

  getCentros: async (): Promise<Array<{ id: string; nome: string; sigla: string }>> => {
    return await provider.getCentros();
  },

  getCursos: async (
    centroSigla: string
  ): Promise<Array<{ id: string; nome: string; centroId: string }>> => {
    return await provider.getCursos(centroSigla);
  },
};

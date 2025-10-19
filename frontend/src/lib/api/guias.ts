import { Guia, Secao, SubSecao } from "../types";
import { API_URL, ENDPOINTS } from "../constants";

export const guiasService = {
  getByCurso: async (cursoId: string): Promise<Guia[]> => {
    const response = await fetch(`${API_URL}${ENDPOINTS.GUIAS(cursoId)}`);
    if (!response.ok) {
      throw new Error("Failed to fetch guias");
    }
    return response.json();
  },

  getSecoes: async (guiaId: string): Promise<Secao[]> => {
    const response = await fetch(`${API_URL}${ENDPOINTS.SECOES(guiaId)}`);
    if (!response.ok) {
      throw new Error("Failed to fetch secoes");
    }
    return response.json();
  },

  getSubSecoes: async (secaoId: string): Promise<SubSecao[]> => {
    const response = await fetch(`${API_URL}${ENDPOINTS.SUBSECOES(secaoId)}`);
    if (!response.ok) {
      throw new Error("Failed to fetch subSecoes");
    }
    return response.json();
  },
};

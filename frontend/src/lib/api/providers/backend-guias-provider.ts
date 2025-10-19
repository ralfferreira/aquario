import { Guia, Secao, SubSecao } from "../../types";
import { API_URL, ENDPOINTS } from "../../config/constants";
import { GuiasDataProvider } from "./guias-provider.interface";

export class BackendGuiasProvider implements GuiasDataProvider {
  async getByCurso(cursoSlug: string): Promise<Guia[]> {
    // For backend provider, we need to map curso slug to curso ID
    // This is a simplified version - in practice you'd need to fetch cursos first
    const response = await fetch(`${API_URL}${ENDPOINTS.GUIAS(cursoSlug)}`);
    if (!response.ok) {
      throw new Error("Failed to fetch guias");
    }
    return response.json();
  }

  async getSecoes(guiaId: string): Promise<Secao[]> {
    const response = await fetch(`${API_URL}${ENDPOINTS.SECOES(guiaId)}`);
    if (!response.ok) {
      throw new Error("Failed to fetch secoes");
    }
    return response.json();
  }

  async getSubSecoes(secaoId: string): Promise<SubSecao[]> {
    const response = await fetch(`${API_URL}${ENDPOINTS.SUBSECOES(secaoId)}`);
    if (!response.ok) {
      throw new Error("Failed to fetch subSecoes");
    }
    return response.json();
  }

  async getCentros(): Promise<Array<{ id: string; nome: string; sigla: string }>> {
    const response = await fetch(`${API_URL}${ENDPOINTS.CENTROS}`);
    if (!response.ok) {
      throw new Error("Failed to fetch centros");
    }
    return response.json();
  }

  getCursos(centroSigla: string): Promise<Array<{ id: string; nome: string; centroId: string }>> {
    // This would need to be implemented based on your backend API
    // For now, returning mock data
    const mockCursos = {
      CI: [
        { id: "ciencia-da-computacao", nome: "Ciência da Computação", centroId: "ci" },
        { id: "engenharia-da-computacao", nome: "Engenharia da Computação", centroId: "ci" },
        {
          id: "ciencias-de-dados-e-inteligencia-artificial",
          nome: "Ciências de Dados e Inteligência Artificial",
          centroId: "ci",
        },
      ],
    };
    return Promise.resolve(mockCursos[centroSigla as keyof typeof mockCursos] || []);
  }
}

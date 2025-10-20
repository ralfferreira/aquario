import { Guia, Secao, SubSecao } from "../../types";
import { API_URL, ENDPOINTS } from "../../config/constants";
import { GuiasDataProvider } from "./guias-provider.interface";

export class BackendGuiasProvider implements GuiasDataProvider {
  async getByCurso(cursoSlug: string): Promise<Guia[]> {
    // First, get all courses to find the course ID by slug
    const cursos = await this.getCursos("CI"); // Assuming all courses are under CI center

    const curso = cursos.find(c => c.id === cursoSlug);
    if (!curso) {
      throw new Error(`Course slug '${cursoSlug}' not found`);
    }

    // Use the real course ID for the API call
    const response = await fetch(`${API_URL}${ENDPOINTS.GUIAS((curso as any).realId)}`);
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

  async getCursos(
    centroSigla: string
  ): Promise<Array<{ id: string; nome: string; centroId: string }>> {
    // First get the centro ID by sigla
    const centrosResponse = await fetch(`${API_URL}${ENDPOINTS.CENTROS}`);
    if (!centrosResponse.ok) {
      throw new Error("Failed to fetch centros");
    }
    const centros = await centrosResponse.json();
    const centro = centros.find((c: any) => c.sigla === centroSigla);

    if (!centro) {
      throw new Error(`Centro with sigla '${centroSigla}' not found`);
    }

    // Then get cursos for this centro
    const cursosResponse = await fetch(`${API_URL}${ENDPOINTS.CURSOS(centro.id)}`);
    if (!cursosResponse.ok) {
      throw new Error("Failed to fetch cursos");
    }
    const cursos = await cursosResponse.json();

    // Map the real course data to include slug-based IDs for frontend compatibility
    return cursos.map((curso: any) => ({
      id: this.nomeToSlug(curso.nome), // Convert nome to slug for frontend compatibility
      nome: curso.nome,
      centroId: curso.centroId,
      realId: curso.id, // Keep the real ID for API calls
    }));
  }

  private nomeToSlug(nome: string): string {
    return nome
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Remove accents
      .replace(/[^a-z0-9\s-]/g, "") // Remove special chars
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .replace(/-+/g, "-") // Replace multiple hyphens with single
      .trim();
  }
}

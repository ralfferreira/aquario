import { Curso } from "../types";
import { API_URL, ENDPOINTS } from "../config/constants";

export const cursosService = {
  getByCentro: async (centroId: string): Promise<Curso[]> => {
    const response = await fetch(`${API_URL}${ENDPOINTS.CURSOS(centroId)}`);
    if (!response.ok) {
      throw new Error("Failed to fetch cursos");
    }
    return response.json();
  },
};

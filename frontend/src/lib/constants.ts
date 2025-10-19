export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export const ENDPOINTS = {
  CENTROS: "/centros",
  CURSOS: (centroId: string) => `/centros/${centroId}/cursos`,
  GUIAS: (cursoId: string) => `/guias?cursoId=${cursoId}`,
  SECOES: (guiaId: string) => `/guias/${guiaId}/secoes?guiaId=${guiaId}`,
  SUBSECOES: (secaoId: string) => `/guias/secoes/${secaoId}/subsecoes?secaoId=${secaoId}`,
} as const;

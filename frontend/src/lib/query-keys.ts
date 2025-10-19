export const queryKeys = {
  guias: {
    all: ["guias"] as const,
    byCurso: (cursoId: string) => ["guias", "curso", cursoId] as const,
    secoes: (guiaId: string) => ["guias", "secoes", guiaId] as const,
    subSecoes: (secaoId: string) => ["guias", "subSecoes", secaoId] as const,
  },
  cursos: {
    all: ["cursos"] as const,
    byCentro: (centroId: string) => ["cursos", "centro", centroId] as const,
  },
  centros: {
    all: ["centros"] as const,
  },
} as const;

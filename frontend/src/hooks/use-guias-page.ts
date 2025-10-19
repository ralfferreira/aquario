import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useGuias } from "./use-guias";
import { useCursos } from "./use-cursos";
import { useCentros } from "./use-centros";
import { guiasService } from "../lib/api";
import { queryKeys } from "../lib/query-keys";
import { GuiaTree, Secao, SubSecao } from "../lib/types";

export const useGuiasPage = (cursoSlug: string) => {
  // Map curso slug to name
  const cursoSlugToNome = useMemo(
    () => ({
      "ciencia-da-computacao": "Ciência da Computação",
      "engenharia-da-computacao": "Engenharia da Computação",
      "ciencias-de-dados-e-inteligencia-artificial": "Ciências de Dados e Inteligência Artificial",
    }),
    []
  );

  // Get centros first
  const { data: centros, isLoading: centrosLoading, error: centrosError } = useCentros();

  // Find CI centro
  const ci = centros?.find(c => c.sigla === "CI");

  // Get cursos for CI
  const { data: cursos, isLoading: cursosLoading, error: cursosError } = useCursos(ci?.id || "");

  // Find the specific curso
  const curso = cursos?.find(
    c => c.nome === cursoSlugToNome[cursoSlug as keyof typeof cursoSlugToNome]
  );

  // Get guias for the curso
  const { data: guias, isLoading: guiasLoading, error: guiasError } = useGuias(curso?.id || "");

  // Fetch all sections for all guias using useQueries
  const secoesQueries = useQuery({
    queryKey: queryKeys.guias.secoes(curso?.id || "none"),
    queryFn: async () => {
      if (!guias) {
        return {};
      }

      const secoesMap: Record<string, Secao[]> = {};
      for (const guia of guias) {
        const secoes = await guiasService.getSecoes(guia.id);
        secoesMap[guia.id] = secoes;
      }
      return secoesMap;
    },
    enabled: !!guias && guias.length > 0,
  });

  // Fetch all subsections for all sections
  const subSecoesQueries = useQuery({
    queryKey: queryKeys.guias.subSecoes(curso?.id || "none"),
    queryFn: async () => {
      if (!secoesQueries.data) {
        return {};
      }

      const subSecoesMap: Record<string, SubSecao[]> = {};
      for (const guiaId in secoesQueries.data) {
        const secoes = secoesQueries.data[guiaId];
        for (const secao of secoes) {
          const subSecoes = await guiasService.getSubSecoes(secao.id);
          subSecoesMap[secao.id] = subSecoes;
        }
      }
      return subSecoesMap;
    },
    enabled: !!secoesQueries.data,
  });

  // Build the complete guia tree with ALL data
  const guiaTree: GuiaTree[] = useMemo(() => {
    if (!guias || !secoesQueries.data || !subSecoesQueries.data) {
      return [];
    }

    return guias.map(guia => {
      const secoes = secoesQueries.data[guia.id] || [];

      return {
        titulo: guia.titulo,
        slug: guia.slug,
        secoes: secoes.map(secao => {
          const subSecoes = subSecoesQueries.data[secao.id] || [];

          return {
            titulo: secao.titulo,
            slug: secao.slug,
            subsecoes: subSecoes.map(sub => ({
              titulo: sub.titulo,
              slug: sub.slug,
            })),
          };
        }),
      };
    });
  }, [guias, secoesQueries.data, subSecoesQueries.data]);

  // Determine loading and error states
  const isLoading =
    centrosLoading ||
    cursosLoading ||
    guiasLoading ||
    secoesQueries.isLoading ||
    subSecoesQueries.isLoading;

  const error =
    centrosError || cursosError || guiasError || secoesQueries.error || subSecoesQueries.error;

  return {
    guiaTree,
    curso,
    isLoading,
    error,
    cursoSlugToNome,
    secoesData: secoesQueries.data,
    subSecoesData: subSecoesQueries.data,
  };
};

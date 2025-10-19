import { useQuery } from "@tanstack/react-query";
import { guiasService } from "../lib/api";
import { queryKeys } from "../lib/query-keys";

export const useGuias = (cursoId: string) => {
  return useQuery({
    queryKey: queryKeys.guias.byCurso(cursoId),
    queryFn: () => guiasService.getByCurso(cursoId),
    enabled: !!cursoId,
  });
};

export const useSecoes = (guiaId: string) => {
  return useQuery({
    queryKey: queryKeys.guias.secoes(guiaId),
    queryFn: () => guiasService.getSecoes(guiaId),
    enabled: !!guiaId,
  });
};

export const useSubSecoes = (secaoId: string) => {
  return useQuery({
    queryKey: queryKeys.guias.subSecoes(secaoId),
    queryFn: () => guiasService.getSubSecoes(secaoId),
    enabled: !!secaoId,
  });
};

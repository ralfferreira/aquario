import { useQuery } from "@tanstack/react-query";
import { cursosService } from "../lib/api";
import { queryKeys } from "../lib/query-keys";

export const useCursos = (centroId: string) => {
  return useQuery({
    queryKey: queryKeys.cursos.byCentro(centroId),
    queryFn: () => cursosService.getByCentro(centroId),
    enabled: !!centroId,
  });
};

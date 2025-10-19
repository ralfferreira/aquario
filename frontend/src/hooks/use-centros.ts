import { useQuery } from "@tanstack/react-query";
import { centrosService } from "../lib/api";
import { queryKeys } from "../lib/query-keys";

export const useCentros = () => {
  return useQuery({
    queryKey: queryKeys.centros.all,
    queryFn: centrosService.getAll,
  });
};

import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
export function useCustomQuery<T>(
  queryKey: string[],
  queryFn: () => Promise<T>,
  options?: Omit<UseQueryOptions<T, Error>, "queryKey" | "queryFn">
) {
  const query = useQuery<T, Error>({
    queryKey,
    queryFn,
    ...options,
  });

  return {
    isLoading: query.isPending,
    isError: query.isError,
    data: query.data,
    error: query.error,
    isSuccess: query.isSuccess,
  };
}

export default useCustomQuery;

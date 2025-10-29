import { useMutation } from '@tanstack/react-query'

export function useCustomMutation<T, TVariables>(
  mutationFn: (variables: TVariables) => Promise<T>
) {
  const { mutate, mutateAsync, isPending, isError, error, isSuccess, data } = useMutation({
    mutationFn
  })

  return {
    mutate,
    mutateAsync,
    isPending,
    isError,
    error,
    isSuccess,
    data
  }
}

export default useCustomMutation;

import { useQuery } from '@tanstack/react-query'
export function useBubbleScore() {
  return useQuery({
    queryKey: ['score'],
    queryFn: async () => {
      const r = await fetch('/score')
      return r.json() as Promise<{ date: string; score: number }>
    },
    refetchInterval: 60_000,
    staleTime: 60_000,
    retry: false
  })
}

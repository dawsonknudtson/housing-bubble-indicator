import { useQuery } from '@tanstack/react-query'

export function useBubbleScore(year?: number) {
  return useQuery({
    queryKey: ['score', year],
    queryFn: async () => {
      const url = year ? `/score?year=${year}` : '/score'
      const r = await fetch(url)
      return r.json() as Promise<{ date: string; score: number }>
    },
    refetchInterval: 60_000,
    staleTime: 60_000,
    retry: false
  })
}

export function useAvailableYears() {
  return useQuery({
    queryKey: ['years'],
    queryFn: async () => {
      const r = await fetch('/years')
      return r.json() as Promise<{ years: number[] }>
    },
    staleTime: 300_000,
    retry: false
  })
}

import { listCountries } from '@/api/list-countries'
import { useQuery } from '@tanstack/react-query'

export function useListCountries() {
  return useQuery({
    queryKey: ['list-countries'],
    queryFn: listCountries,
  })
}

import { QueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: 1,
    },
    mutations: {
      onError: error => {
        if (error.message === 'NEXT_REDIRECT') return
        toast.error(error.message)
      },
    },
  },
})

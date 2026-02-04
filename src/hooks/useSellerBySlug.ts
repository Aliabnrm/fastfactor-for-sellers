import { useQuery } from '@tanstack/react-query'
import { getSellerBySlug } from '@/services/sellers/seller'

export const useSellerBySlug = slug => {
  return useQuery({
    retry: 1,
    enabled: !!slug,
    staleTime: 1000 * 60 * 2,
    queryKey: ['seller', slug],
    queryFn: () => getSellerBySlug(slug),
  })
}

export default useSellerBySlug

import { useAuth } from './useAuth'
import { useQuery } from '@tanstack/react-query'
import { fetchSellerProfile } from '@/services/sellers/seller'

const useSellerProfile = () => {
  const { user } = useAuth()

  const { data, isLoading, isError, refetch } = useQuery({
    enabled: !!user,
    staleTime: 1000 * 60 * 5,
    queryKey: ['seller-profile', user?.id],
    queryFn: () => fetchSellerProfile(user.id),
  })

  return {
    user,
    refetch,
    isError,
    isLoading,
    sellerProfile: data,
  }
}

export default useSellerProfile

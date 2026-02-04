import { useQuery } from '@tanstack/react-query'
import { fetchSellerOrders } from '@/services/orders/order'

export const useOrder = () => {
  const query = useQuery({
    retry: 1,
    staleTime: 1000 * 60,
    refetchOnWindowFocus: true,
    queryFn: fetchSellerOrders,
    queryKey: ['seller-orders'],
  })

  return {
    error: query.error,
    orders: query.data ?? [],
    revalidate: query.refetch,
    isLoading: query.isLoading,
  }
}

export default useOrder

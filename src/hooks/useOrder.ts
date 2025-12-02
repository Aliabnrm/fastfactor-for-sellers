import { useQuery } from '@tanstack/react-query'
import { fetchSellerOrders } from '@/services/orders/order'

export const useOrder = () => {
  const query = useQuery({
    queryKey: ['seller-orders'],
    queryFn: fetchSellerOrders,
    staleTime: 1000 * 60,
    retry: 1,
    refetchOnWindowFocus: true,
  })

  return {
    orders: query.data ?? [],
    isLoading: query.isLoading,
    error: query.error,
    revalidate: query.refetch,
  }
}

export default useOrder

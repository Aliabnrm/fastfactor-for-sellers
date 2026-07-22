import { useToast } from '@/hooks/use-toast'
import { OrderStatus } from '@/types/order.types'
import { useQueryClient } from '@tanstack/react-query'
import { useUpdateOrderState } from '@/services/orders/order.hooks'

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  const mutation = useUpdateOrderState()

  const updateStatus = (orderId: string, newStatus: OrderStatus) => {
    mutation.mutate(
      {
        orderId,
        status: newStatus,
      },
      {
        onSuccess: () => {
          toast({
            title: 'وضعیت به‌روزرسانی شد',
            description: `سفارش با موفقیت به وضعیت ${newStatus} تغییر یافت.`,
          })

          queryClient.invalidateQueries({
            queryKey: ['orders'],
          })

          queryClient.invalidateQueries({
            queryKey: ['orders', orderId],
          })
        },
        onError: () => {
          toast({
            title: 'خطا در بروزرسانی وضعیت',
            description: 'مشکلی پیش آمد، لطفاً دوباره تلاش کنید.',
            variant: 'destructive',
          })
        },
      },
    )
  }

  return {
    updateStatus,
    isLoading: mutation.isPending,
  }
}

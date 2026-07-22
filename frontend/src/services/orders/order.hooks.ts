import api from '@/services/useApiClient'
import { CreateOrderDto, OrderStatus } from '@/schema/order.schema'
import { useMutation, useQuery } from '@tanstack/react-query'
import { getMyOrdersApi, getMyOrderByIdApi, createOrderApi, updateOrderStatusApi } from './order.api'

export const useMyOrders = () => {
  return useQuery({
    queryKey: ['orders'],
    queryFn: () => getMyOrdersApi(api),
  })
}

export const useMyOrder = (orderId: string) => {
  return useQuery({
    enabled: !!orderId,
    queryKey: ['orders', orderId],
    queryFn: () => getMyOrderByIdApi(api, orderId),
  })
}

export const useCreateOrder = () => {
  return useMutation({
    mutationFn: ({ slug, body }: { slug: string; body: CreateOrderDto }) =>
      createOrderApi(api, slug, body),
  })
}

export const useUpdateOrderState = () => {
  return useMutation({
    mutationFn: ({
      orderId,
      status,
    }: {
      orderId: string
      status: OrderStatus
    }) => updateOrderStatusApi(api, orderId, status),
  })
}
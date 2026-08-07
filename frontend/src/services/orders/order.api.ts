import { CreateOrderDto, CreateOrderSchema, OrderSchema, OrdersSchema, OrderStatus } from '@/schema/order.schema'
import type { AxiosInstance } from 'axios'
import { encodePathSegment } from '@/lib/sanitization'

export const getMyOrdersApi = async (api: AxiosInstance) => {
  const res = await api.get('/order')

  return OrdersSchema.parse(res.data.data)
}

export const getMyOrderByIdApi = async (
  api: AxiosInstance,
  orderId: string,
) => {
  const res = await api.get(`/order/${encodePathSegment(orderId)}`)

  return OrderSchema.parse(res.data.data)
}

export const createOrderApi = async (
  api: AxiosInstance,
  slug: string,
  body: CreateOrderDto,
) => {
  const parsedBody = CreateOrderSchema.parse(body)
  const res = await api.post(`/order/${encodePathSegment(slug)}`, parsedBody)

  return OrderSchema.parse(res.data.data)
}


export const updateOrderStatusApi = async (
  api: AxiosInstance,
  orderId: string,
  status: OrderStatus,
) => {
  const res = await api.patch(`/order/${encodePathSegment(orderId)}/status`, {
    status,
  })

  return OrderSchema.parse(res.data.data)
}

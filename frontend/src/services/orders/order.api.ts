import { CreateOrderDto, OrderSchema, OrdersSchema } from '@/schema/order.schema'
import type { AxiosInstance } from 'axios'

export const getMyOrdersApi = async (api: AxiosInstance) => {
  const res = await api.get('/order')

  return OrdersSchema.parse(res.data.data)
}

export const getMyOrderByIdApi = async (
  api: AxiosInstance,
  orderId: string,
) => {
  const res = await api.get(`/order/${orderId}`)

  return OrderSchema.parse(res.data.data)
}

export const createOrderApi = async (
  api: AxiosInstance,
  slug: string,
  body: CreateOrderDto,
) => {
  const res = await api.post(`/order/${slug}`, body)

  return OrderSchema.parse(res.data.data)
}

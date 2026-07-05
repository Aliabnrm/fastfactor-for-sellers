export type StatusCardKey =
  | 'totalOrders'
  | 'pendingOrders'
  | 'verifiedOrders'
  | 'deliveredOrders'

export type StatusCardConfig = {
  label: string
  bgColor: string
  textColor: string
  key: StatusCardKey
  icon: React.ElementType
}

export type OrderStatus = 'pending' | 'confirmed' | 'delivered' | 'rejected'
export interface Order {
  id: string
  address: string
  seller_id: string
  created_at: string
  card_last_4: string
  receipt_url: string
  status: OrderStatus
  postal_code: string
  total_price: number
  product_name: string
  customer_name: string
  customer_phone: string
  product_image_url: string | null
}


import { supabase } from '@/lib/supabase'
import { Order } from '@/types/checkout'

export const fetchSellerOrders = async (): Promise<Order[]> => {
  const { data: sessionData } = await supabase.auth.getSession()

  const user = sessionData?.session?.user
  if (!user) {
    throw new Error('کاربر لاگین نیست')
  }

  const { data, error } = await supabase
    .from('orders')
    .select(
      `
      id,
      created_at,
      customer_name,
      customer_phone,
      address,
      postal_code,
      product_name,
      total_price,
      receipt_url,
      card_last_4,
      status
    `,
    )
    .eq('seller_id', user.id)
    .order('created_at', { ascending: false })

  if (error) {
    throw new Error(error.message)
  }

  return data as Order[]
}

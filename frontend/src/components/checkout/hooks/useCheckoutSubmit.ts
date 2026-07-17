import { useState } from 'react'
import type { CheckoutData } from '@/schema/checkoutSchema'
import { useCreateOrder } from '@/services/orders/order.hooks'

export const useCheckoutSubmit = (
  sellerShopInfo: any,
  setResult: (order: any) => void,
  toast: any,
) => {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const createOrder = useCreateOrder()

  const handleCheckoutSubmit = async (data: CheckoutData) => {
    if (!sellerShopInfo) return

    try {
      setIsSubmitting(true)

      const productPrice = Number(data.price)

      const shipping = sellerShopInfo.shipping_cost ?? 0

      const total = productPrice + shipping

      const body = {
        customer_name: data.customerName,
        customer_phone: data.phoneNumber,

        address: data.address,
        postal_code: data.postalCode,

        product_name: data.product,
        product_price: productPrice,
        total_price: total,

        card_last_4: data.cardLastDigits,

        receipt_url: undefined,
        product_image_url: undefined,
      }

      const order = await createOrder.mutateAsync({
        slug: sellerShopInfo.slug,
        body,
      })

      setResult(order)

      toast({
        title: 'ثبت موفق',
        description: 'سفارش با موفقیت ثبت شد.',
      })
    } catch (err: any) {
      toast({
        title: 'خطا',
        description: err?.response?.data?.message ?? err.message,
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    handleCheckoutSubmit,
    isSubmitting,
  }
}

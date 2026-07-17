import { z } from 'zod'

const phonePattern = /^09[0-9]{9}$/
const postalCodePattern = /^\d{10}$/
const cardDigitsPattern = /^\d{4}$/

export const CreateOrderSchema = z.object({
  customer_name: z.string().trim().min(2, 'نام مشتری الزامی است.'),
  customer_phone: z.string()
    .min(1, 'شماره موبایل الزامی است.')
    .length(11, 'شماره موبایل باید ۱۱ رقم باشد.')
    .regex(phonePattern, 'شماره موبایل معتبر نیست (مثال: 0912xxxxxxx)'),
  
  address: z.string().trim().min(10, 'آدرس را کامل وارد کنید.'),
  postal_code: z
      .string()
      .min(1, 'کد پستی الزامی است.')
      .length(10, 'کد پستی باید ۱۰ رقم باشد.')
    .regex(postalCodePattern, 'کد پستی باید ۱۰ رقم عددی باشد.'),
  
  product_name: z.string().trim().min(1, 'نام محصول الزامی است.'),
  product_price: z.number().nonnegative(),
  total_price: z.number().nonnegative(),
  card_last_4: z
      .string()
      .min(1, '۴ رقم آخر کارت الزامی است.')
      .length(4, '۴ رقم آخر کارت باید ۴ رقم باشد.')
      .regex(cardDigitsPattern, '۴ رقم آخر کارت باید ۴ رقم عددی باشد.'),

  receipt_url: z.string().url().optional(),
  product_image_url: z.string().url().optional(),
})

export type CreateOrderDto = z.infer<typeof CreateOrderSchema>

export const OrderStatusSchema = z.enum([
  'pending',
  'confirmed',
  'delivered',
  'rejected',
])

export const OrderSchema = z.object({
  id: z.string(),
  store_id: z.string(),

  customer_name: z.string(),
  customer_phone: z.string(),

  address: z.string(),
  postal_code: z.string(),

  product_name: z.string(),
  product_image_url: z.string().nullable(),

  product_price: z.string(),
  total_price: z.string(),

  receipt_url: z.string().nullable(),
  card_last_4: z.string().nullable(),

  status: OrderStatusSchema,

  created_at: z.string(),
  updated_at: z.string(),
})

export const OrdersSchema = z.array(OrderSchema)

export type Order = z.infer<typeof OrderSchema>
export type OrderStatus = z.infer<typeof OrderStatusSchema>

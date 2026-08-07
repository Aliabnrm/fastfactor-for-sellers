import { z } from 'zod'
import { hasSafeUrlProtocol, sanitizeString } from '@/lib/sanitization'

const phonePattern = /^09[0-9]{9}$/
const postalCodePattern = /^\d{10}$/
const cardDigitsPattern = /^\d{4}$/
const sanitizedStringSchema = z.string().transform(sanitizeString)
const safeUrlSchema = sanitizedStringSchema
  .pipe(z.string().url().max(2048))
  .refine(hasSafeUrlProtocol)

export const CreateOrderSchema = z.object({
  customer_name: sanitizedStringSchema.pipe(
    z.string().min(2, 'نام مشتری الزامی است.'),
  ),
  customer_phone: sanitizedStringSchema.pipe(
    z
      .string()
      .min(1, 'شماره موبایل الزامی است.')
      .length(11, 'شماره موبایل باید ۱۱ رقم باشد.')
      .regex(phonePattern, 'شماره موبایل معتبر نیست (مثال: 0912xxxxxxx)'),
  ),

  address: sanitizedStringSchema.pipe(
    z.string().min(10, 'آدرس را کامل وارد کنید.'),
  ),
  postal_code: sanitizedStringSchema.pipe(
    z
      .string()
      .min(1, 'کد پستی الزامی است.')
      .length(10, 'کد پستی باید ۱۰ رقم باشد.')
      .regex(postalCodePattern, 'کد پستی باید ۱۰ رقم عددی باشد.'),
  ),

  product_name: sanitizedStringSchema.pipe(
    z.string().min(1, 'نام محصول الزامی است.'),
  ),
  product_price: z.number().nonnegative(),
  total_price: z.number().nonnegative(),
  card_last_4: sanitizedStringSchema.pipe(
    z
      .string()
      .min(1, '۴ رقم آخر کارت الزامی است.')
      .length(4, '۴ رقم آخر کارت باید ۴ رقم باشد.')
      .regex(cardDigitsPattern, '۴ رقم آخر کارت باید ۴ رقم عددی باشد.'),
  ),

  receipt_url: safeUrlSchema.optional(),
  product_image_url: safeUrlSchema.optional(),
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

  customer_name: sanitizedStringSchema,
  customer_phone: sanitizedStringSchema,

  address: sanitizedStringSchema,
  postal_code: sanitizedStringSchema,

  product_name: sanitizedStringSchema,
  product_image_url: safeUrlSchema.nullable(),

  product_price: z.string(),
  total_price: z.string(),

  receipt_url: safeUrlSchema.nullable(),
  card_last_4: sanitizedStringSchema.nullable(),

  status: OrderStatusSchema,

  created_at: z.string(),
  updated_at: z.string(),
})

export const OrdersSchema = z.array(OrderSchema)

export type Order = z.infer<typeof OrderSchema>
export type OrderStatus = z.infer<typeof OrderStatusSchema>

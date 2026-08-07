import { z } from 'zod'
import { sanitizeString } from '@/lib/sanitization'

export interface CheckoutData {
  product: string
  price: number | ''
  productPhoto?: File | null
  customerName: string
  phoneNumber: string
  address: string
  postalCode: string
  cardLastDigits: string
  paymentProof: File | null
}

const phonePattern = /^09[0-9]{9}$/
const postalCodePattern = /^\d{10}$/
const cardDigitsPattern = /^\d{4}$/
const sanitizedStringSchema: z.ZodType<string> = z
  .string()
  .transform(sanitizeString)
const allowedPaymentProofTypes = new Set(['image/jpeg', 'image/png', 'image/webp'])
const allowedPaymentProofExtensions = new Set(['jpg', 'jpeg', 'png', 'webp'])
const maxPaymentProofSize = 5 * 1024 * 1024

const isValidPaymentProof = (file: unknown) => {
  if (typeof File === 'undefined' || !(file instanceof File)) {
    return false
  }

  const extension = file.name.split('.').pop()?.toLowerCase() ?? ''

  return (
    allowedPaymentProofTypes.has(file.type) &&
    allowedPaymentProofExtensions.has(extension) &&
    file.size <= maxPaymentProofSize
  )
}

export const checkoutSchema = z.object({
  product: sanitizedStringSchema.pipe(
    z.string().min(3, 'نام محصول حداقل باید ۳ کاراکتر باشد.'),
  ),

  price: z.coerce.number().min(1000, 'مبلغ محصول معتبر نیست'),

  productPhoto: z.any().nullable().optional(),

  customerName: sanitizedStringSchema.pipe(
    z.string().min(2, 'نام و نام خانوادگی را وارد کنید.'),
  ),

  phoneNumber: sanitizedStringSchema.pipe(
    z
      .string()
      .min(1, 'شماره موبایل الزامی است.')
      .length(11, 'شماره موبایل باید ۱۱ رقم باشد.')
      .regex(phonePattern, 'شماره موبایل معتبر نیست (مثال: 0912xxxxxxx)'),
  ),

  address: sanitizedStringSchema.pipe(
    z.string().min(10, 'آدرس کامل و دقیق الزامی است.'),
  ),

  postalCode: sanitizedStringSchema.pipe(
    z
      .string()
      .min(1, 'کد پستی الزامی است.')
      .length(10, 'کد پستی باید ۱۰ رقم باشد.')
      .regex(postalCodePattern, 'کد پستی باید ۱۰ رقم عددی باشد.'),
  ),

  cardLastDigits: sanitizedStringSchema.pipe(
    z
      .string()
      .min(1, '۴ رقم آخر کارت الزامی است.')
      .length(4, '۴ رقم آخر کارت باید ۴ رقم باشد.')
      .regex(cardDigitsPattern, '۴ رقم آخر کارت باید ۴ رقم عددی باشد.'),
  ),

  paymentProof: z
    .any()
    .refine(file => file !== null, 'تصویر فیش واریزی الزامی است.')
    .refine(isValidPaymentProof, 'فرمت یا حجم تصویر فیش واریزی معتبر نیست.'),
}) as unknown as z.ZodType<CheckoutData>

import { z } from "zod";

const phonePattern = /^09[0-9]{9}$/;
const postalCodePattern = /^\d{10}$/;
const cardDigitsPattern = /^\d{4}$/;

export const checkoutSchema = z.object({
  product: z.string().min(3, "نام محصول حداقل باید ۳ کاراکتر باشد."),

  productPhoto: z.any().nullable().optional(),

  customerName: z.string().min(2, "نام و نام خانوادگی را وارد کنید."),

  phoneNumber: z
    .string()
    .min(1, "شماره موبایل الزامی است.")
    .length(11, "شماره موبایل باید ۱۱ رقم باشد.")
    .regex(phonePattern, "شماره موبایل معتبر نیست (مثال: 0912xxxxxxx)"),

  address: z.string().min(10, "آدرس کامل و دقیق الزامی است."),

  postalCode: z
    .string()
    .min(1, "کد پستی الزامی است.")
    .length(10, "کد پستی باید ۱۰ رقم باشد.")
    .regex(postalCodePattern, "کد پستی باید ۱۰ رقم عددی باشد."),

  cardLastDigits: z
    .string()
    .min(1, "۴ رقم آخر کارت الزامی است.")
    .length(4, "۴ رقم آخر کارت باید ۴ رقم باشد.")
    .regex(cardDigitsPattern, "۴ رقم آخر کارت باید ۴ رقم عددی باشد."),

  paymentProof: z
    .any()
    .refine((file) => file !== null, "تصویر فیش واریزی الزامی است."),
});

export type CheckoutData = z.infer<typeof checkoutSchema>;

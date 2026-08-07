import { z } from "zod";
import {
  optionalSafeUrlSchema,
  sanitizedStringSchema,
} from "../../utils/sanitization.js";

export const orderParamsSchema = z.object({
  orderId: z.string().uuid(),
});

export const createOrderParamsSchema = z.object({
  slug: sanitizedStringSchema.pipe(
    z.string().min(3).max(50).regex(/^[a-z0-9-]+$/, {
      message: "Slug can only contain lowercase letters, numbers and hyphens",
    }),
  ),
});

export const createOrderSchema = z.object({
  customer_name: sanitizedStringSchema.pipe(
    z.string().min(2, "نام مشتری الزامی است."),
  ),
  customer_phone: sanitizedStringSchema
    .pipe(
      z.string()
        .length(11, "شماره موبایل باید ۱۱ رقم باشد.")
        .regex(/^09[0-9]{9}$/, "شماره موبایل معتبر نیست (مثال: 0912xxxxxxx)"),
    ),
  address: sanitizedStringSchema.pipe(
    z.string().min(10, "آدرس را کامل وارد کنید."),
  ),
  postal_code: sanitizedStringSchema
    .pipe(
      z.string()
        .length(10, "کد پستی باید ۱۰ رقم باشد.")
        .regex(/^\d{10}$/, "کد پستی باید ۱۰ رقم عددی باشد."),
    ),
  product_name: sanitizedStringSchema.pipe(
    z.string().min(1, "نام محصول الزامی است."),
  ),
  product_price: z.coerce.number().nonnegative(),
  total_price: z.coerce.number().nonnegative(),
  receipt_url: optionalSafeUrlSchema,
  card_last_4: z.preprocess((value) => {
    if (value === "" || value === null) {
      return undefined;
    }

    return value;
  }, sanitizedStringSchema.pipe(
    z.string()
      .length(4, "۴ رقم آخر کارت باید ۴ رقم باشد.")
      .regex(/^\d{4}$/, "۴ رقم آخر کارت باید ۴ رقم عددی باشد."),
  ).optional()),
  product_image_url: optionalSafeUrlSchema,
});

export const updateOrderStatusSchema = z.object({
  status: z.enum(["pending", "confirmed", "delivered", "rejected"]),
});

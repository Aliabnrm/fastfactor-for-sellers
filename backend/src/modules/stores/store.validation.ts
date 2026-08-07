import { z } from "zod";
import { sanitizedStringSchema } from "../../utils/sanitization.js";

export const createStoreSchema = z.object({
  shop_name: sanitizedStringSchema.pipe(
    z.string().min(3, "Shop name must be at least 3 characters").max(100),
  ),

  slug: sanitizedStringSchema.pipe(
    z.string().min(3).max(50).regex(/^[a-z0-9-]+$/, {
      message: "Slug can only contain lowercase letters, numbers and hyphens",
    }),
  ),

  card_owner: sanitizedStringSchema.pipe(z.string().min(3).max(100)),

  card_number: sanitizedStringSchema.pipe(
    z.string().regex(/^\d{16}$/, {
      message: "Card number must be exactly 16 digits",
    }),
  ),

  shipping_cost: z
    .number({
      error: "Shipping cost must be a number",
    })
    .min(0, {
      message: "Shipping cost cannot be negative",
    }),
});

export const updateStoreSchema = createStoreSchema.partial();

export const storeSlugParamsSchema = z.object({
  slug: sanitizedStringSchema.pipe(
    z.string().min(3).max(50).regex(/^[a-z0-9-]+$/, {
      message: "Slug can only contain lowercase letters, numbers and hyphens",
    }),
  ),
});

export type CreateStoreInput = z.infer<typeof createStoreSchema>;

export type UpdateStoreInput = z.infer<typeof updateStoreSchema>;

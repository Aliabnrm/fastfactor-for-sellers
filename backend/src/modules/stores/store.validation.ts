import { z } from "zod";

export const createStoreSchema = z.object({
  shop_name: z
    .string()
    .trim()
    .min(3, "Shop name must be at least 3 characters")
    .max(100),

  slug: z
    .string()
    .trim()
    .min(3)
    .max(50)
    .regex(/^[a-z0-9-]+$/, {
      message: "Slug can only contain lowercase letters, numbers and hyphens",
    }),

  card_owner: z.string().trim().min(3).max(100),

  card_number: z
    .string()
    .trim()
    .regex(/^\d{16}$/, {
      message: "Card number must be exactly 16 digits",
    }),

  shipping_cost: z
    .number({
      error: "Shipping cost must be a number",
    })
    .min(0, {
      message: "Shipping cost cannot be negative",
    }),
});

export const updateStoreSchema = createStoreSchema.partial();

export type CreateStoreInput = z.infer<typeof createStoreSchema>;

export type UpdateStoreInput = z.infer<typeof updateStoreSchema>;

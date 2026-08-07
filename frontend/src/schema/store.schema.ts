import { z } from 'zod'
import { sanitizeString } from '@/lib/sanitization'

const sanitizedStringSchema = z.string().transform(sanitizeString)
const slugSchema = sanitizedStringSchema.pipe(
  z
    .string()
    .min(3)
    .max(50)
    .regex(/^[a-z0-9-]+$/),
)

// ======================== STORE  ======================== //
export const StoreSchema = z.object({
  id: z.string(),
  owner_id: z.string(),
  updated_at: z.string(),
  created_at: z.string(),
  is_onboarded: z.boolean(),
  shipping_cost: z.coerce.number(),
  slug: slugSchema.nullable(),
  shop_name: sanitizedStringSchema.nullable(),
  card_owner: sanitizedStringSchema.nullable(),
  card_number: sanitizedStringSchema.nullable(),
})

export const PublicStoreSchema = z.object({
  id: z.string(),
  shop_name: sanitizedStringSchema,
  slug: slugSchema,
  shipping_cost: z.coerce.number(),
})

export type PublicStore = z.infer<typeof PublicStoreSchema>

// ======================== ONBOARDING ======================== //
export const OnboardingSchema = z.object({
  shop_name: sanitizedStringSchema.pipe(z.string().min(3).max(100)),
  card_owner: sanitizedStringSchema.pipe(z.string().min(3).max(100)),
  shipping_cost: z.number().min(0),
  card_number: sanitizedStringSchema.pipe(z.string().regex(/^\d{16}$/)),
  slug: slugSchema,
})

// ======================== UPDATE ======================== //
export const UpdateStoreSchema = OnboardingSchema.partial()

// --------------------------- CHECK SLUG --------------------------- //
export const CheckSlugResponseSchema = z.object({
  available: z.boolean(),
})

export type CheckSlugResponse = z.infer<typeof CheckSlugResponseSchema>

export type Store = z.infer<typeof StoreSchema>
export type OnboardingDTO = z.infer<typeof OnboardingSchema>
export type UpdateStoreDTO = z.infer<typeof UpdateStoreSchema>

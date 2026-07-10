import { z } from 'zod'

// ======================== STORE  ======================== //
export const StoreSchema = z.object({
  id: z.string(),
  owner_id: z.string(),
  updated_at: z.string(),
  created_at: z.string(),
  is_onboarded: z.boolean(),
  shipping_cost: z.number(),
  slug: z.string().nullable(),
  shop_name: z.string().nullable(),
  card_owner: z.string().nullable(),
  card_number: z.string().nullable(),
})

// ======================== ONBOARDING ======================== //
export const OnboardingSchema = z.object({
  shop_name: z.string().min(3),
  card_owner: z.string().min(3),
  shipping_cost: z.number().min(0),
  card_number: z.string().regex(/^\d{16}$/),
  slug: z
    .string()
    .min(3)
    .regex(/^[a-z0-9-]+$/),

})

// ======================== UPDATE ======================== //
export const UpdateStoreSchema = OnboardingSchema.partial()


// --------------------------- CHECK SLUG --------------------------- //
export const CheckSlugResponseSchema = z.object({
  available: z.boolean(),
})

export type CheckSlugResponse = z.infer<
  typeof CheckSlugResponseSchema
>

export type Store = z.infer<typeof StoreSchema>
export type OnboardingDTO = z.infer<typeof OnboardingSchema>
export type UpdateStoreDTO = z.infer<typeof UpdateStoreSchema>

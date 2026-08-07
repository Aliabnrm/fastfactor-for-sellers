import {
  StoreSchema,
  OnboardingDTO,
  UpdateStoreDTO,
  OnboardingSchema,
  UpdateStoreSchema,
  CheckSlugResponseSchema,
} from '@/schema/store.schema'
import type { AxiosInstance } from 'axios'
import { encodePathSegment } from '@/lib/sanitization'

// ----------------------- POST /store/onboarding ---------------------- //
export const createStoreApi = async (
  api: AxiosInstance,
  body: OnboardingDTO,
) => {
  const parsedBody = OnboardingSchema.parse(body)

  const res = await api.post('/store/onboarding', parsedBody)

  return StoreSchema.parse(res.data.data)
}

// --------------------------- GET /store/me --------------------------- //
export const getMyStoreApi = async (api: AxiosInstance) => {
  const res = await api.get('/store/me')

  return StoreSchema.parse(res.data.data)
}

// --------------------------- PATCH /store/me --------------------------- //
export const updateMyStoreApi = async (
  api: AxiosInstance,
  body: UpdateStoreDTO,
) => {
  const parsedBody = UpdateStoreSchema.parse(body)

  const res = await api.patch('/store/me', parsedBody)

  return StoreSchema.parse(res.data.data)
}

// --------------------------- GET /store/:slug --------------------------- //
export const getStoreBySlugApi = async (api: AxiosInstance, slug: string) => {
  const res = await api.get(`/store/${encodePathSegment(slug)}`)

  return res.data.data
}


// --------------------------- GET /store/check-slug --------------------------- //
export const checkSlugApi = async (api: AxiosInstance, slug: string) => {
  const res = await api.get(`/store/check-slug/${encodePathSegment(slug)}`)
  return CheckSlugResponseSchema.parse(res.data.data)
}

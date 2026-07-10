import {
  StoreSchema,
  OnboardingDTO,
  UpdateStoreDTO,
  OnboardingSchema,
  UpdateStoreSchema,
  CheckSlugResponseSchema,
} from '@/schema/store.schema'
import type { AxiosInstance } from 'axios'

// ----------------------- POST /store/onboarding ---------------------- //
export const createStoreApi = async (
  api: AxiosInstance,
  body: OnboardingDTO,
) => {
  OnboardingSchema.parse(body)

  const res = await api.post('/store/onboarding', body)

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
  UpdateStoreSchema.parse(body)

  const res = await api.patch('/store/me', body)

  return StoreSchema.parse(res.data.data)
}

// --------------------------- GET /store/:slug --------------------------- //
export const getStoreBySlugApi = async (api: AxiosInstance, slug: string) => {
  const res = await api.get(`/store/${slug}`)

  return StoreSchema.parse(res.data.data)
}

// --------------------------- GET /store/check-slug --------------------------- //
export const checkSlugApi = async (api: AxiosInstance, slug: string) => {
  const res = await api.get(`/store/check-slug/${slug}`)
  return CheckSlugResponseSchema.parse(res.data.data)
}

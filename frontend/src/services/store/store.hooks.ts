import {
  checkSlugApi,
  getMyStoreApi,
  createStoreApi,
  updateMyStoreApi,
  getStoreBySlugApi,
} from './store.api'
import api from '../useApiClient'
import { useMutation, useQuery } from '@tanstack/react-query'
import { OnboardingDTO, UpdateStoreDTO } from '@/schema/store.schema'

// --------------------------- GET MY STORE --------------------------- //
export const useMyStore = () => {
  return useQuery({
    retry: false,
    queryKey: ['my-store'],
    queryFn: () => getMyStoreApi(api),
  })
}

// --------------------------- GET STORE BY SLUG --------------------------- //
export const useStore = (slug: string) => {
  return useQuery({
    enabled: !!slug,
    queryKey: ['store', slug],
    queryFn: () => getStoreBySlugApi(api, slug),
  })
}

// --------------------------- CREATE STORE --------------------------- //
export const useCreateStore = () => {
  return useMutation({
    mutationFn: (data: OnboardingDTO) => createStoreApi(api, data),
  })
}

// --------------------------- UPDATE STORE --------------------------- //
export const useUpdateStore = () => {
  return useMutation({
    mutationFn: (data: UpdateStoreDTO) => updateMyStoreApi(api, data),
  })
}

// --------------------------- CHECK SLUG --------------------------- //
export const useCheckSlug = (slug: string) => {
  return useQuery({
    enabled: slug.trim().length >= 3,
    queryKey: ['check-slug', slug],
    queryFn: () => checkSlugApi(api, slug),
  })
}

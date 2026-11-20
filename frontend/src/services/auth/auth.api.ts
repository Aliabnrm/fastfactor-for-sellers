import {
  AuthResponseSchema,
  RefreshDTO,
  RefreshResponseSchema,
  RefreshSchema,
  SigninDTO,
  SigninSchema,
  SignupDTO,
  SignupSchema,
  UserSchema,
} from '@/schema/auth.schema'
import type { AxiosInstance, AxiosRequestConfig } from 'axios'

export const loginApi = async (api: AxiosInstance, body: SigninDTO) => {
  const parsedBody = SigninSchema.parse(body)

  const res = await api.post('/auth/login', parsedBody)

  return AuthResponseSchema.parse(res.data)
}

export const registerApi = async (api: AxiosInstance, body: SignupDTO) => {
  const parsedBody = SignupSchema.parse(body)

  const res = await api.post('/auth/register', parsedBody)

  return AuthResponseSchema.parse(res.data)
}

export const refreshApi = async (
  api: AxiosInstance,
  config?: AxiosRequestConfig,
) => {
  const res = await api.post('/auth/refresh', undefined, config)

  return RefreshResponseSchema.parse(res.data)
}

export const logoutApi = async (api: AxiosInstance) => {
  await api.post('/auth/logout')
}

// GET /auth/me
export const getMeApi = async (api: AxiosInstance) => {
  const res = await api.get('/auth/me')

  return UserSchema.parse(res.data)
}

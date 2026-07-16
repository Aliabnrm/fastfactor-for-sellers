import api from '../useApiClient.ts'
import { useMutation } from '@tanstack/react-query'
import { loginApi, refreshApi, registerApi } from './auth.api'
import { SigninDTO, SignupDTO } from '@/schema/auth.schema.ts'

export const useLogin = () => {
  return useMutation({
    mutationFn: (data: SigninDTO) => loginApi(api, data),
  })
}

export const useRegister = () => {
  return useMutation({
    mutationFn: (data: SignupDTO) => registerApi(api, data),
  })
}

export const useRefreshToken = () => {
  return useMutation({
    mutationFn: () => refreshApi(api),
  })
}
import axios from 'axios'
import { tokenStore } from '@/lib/auth/tokenStore'
import { API_BASE_PATH } from '../entities/baseUrl'
import { RefreshResponseSchema } from '@/schema/auth.schema'
import { getBackendUrl } from '@/lib/sanitization'
import type { AxiosError, InternalAxiosRequestConfig } from 'axios'

const backendUrl = getBackendUrl(import.meta.env.VITE_API_URL, import.meta.env.DEV)

const api = axios.create({
  baseURL: `${backendUrl}${API_BASE_PATH}`,
  withCredentials: true,
})

let isRefreshing = false

let failedQueue: {
  resolve: (token: string) => void
  reject: (error: unknown) => void
}[] = []

const processQueue = (error: unknown, token?: string) => {
  failedQueue.forEach(promise => {
    if (error) {
      promise.reject(error)
    } else {
      promise.resolve(token!)
    }
  })

  failedQueue = []
}

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = tokenStore.get()

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

api.interceptors.response.use(
  response => response,

  async (error: AxiosError) => {
    const originalRequest: any = error.config

    const isAuthEndpoint = originalRequest.url?.includes('/auth')

    if (
      error.response?.status !== 401 ||
      originalRequest?._retry ||
      isAuthEndpoint
    ) {
      return Promise.reject(error)
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({
          resolve: token => {
            originalRequest.headers.Authorization = `Bearer ${token}`

            resolve(api(originalRequest))
          },
          reject,
        })
      })
    }

    originalRequest._retry = true
    isRefreshing = true

    const refreshClient = axios.create({
      baseURL: `${backendUrl}${API_BASE_PATH}`,
      withCredentials: true,
    })

    try {
      const response = await refreshClient.post('/auth/refresh')

      const newAccessToken = RefreshResponseSchema.parse(response.data).accessToken

      tokenStore.set(newAccessToken)

      processQueue(null, newAccessToken)

      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`

      return api(originalRequest)
    } catch (refreshError) {
      processQueue(refreshError)

      tokenStore.clear()

      window.location.href = '/sign-in'

      return Promise.reject(refreshError)
    } finally {
      isRefreshing = false
    }
  },
)

export default api

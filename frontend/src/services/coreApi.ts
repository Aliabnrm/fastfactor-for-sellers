import axios from 'axios'
import { API_BASE_PATH } from '@/entities/baseUrl'
import { getSafeBackendUrl } from '@/lib/sanitization'

const backendUrl = getSafeBackendUrl(import.meta.env.VITE_API_URL)

export const coreApi = axios.create({
  baseURL: `${backendUrl}${API_BASE_PATH}`,
  headers: {
    'Content-Type': 'application/json',
    Accept: '*/*',
  },
  withCredentials: true,
})

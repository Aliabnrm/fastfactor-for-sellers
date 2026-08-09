import axios from 'axios'
import { API_BASE_PATH } from '@/entities/baseUrl'
import { getBackendUrl } from '@/lib/sanitization'

const backendUrl = getBackendUrl(import.meta.env.VITE_API_URL, import.meta.env.DEV)

export const coreApi = axios.create({
  baseURL: `${backendUrl}${API_BASE_PATH}`,
  headers: {
    'Content-Type': 'application/json',
    Accept: '*/*',
  },
  withCredentials: true,
})

const isUnsafeControlChar = (value: string) => {
  const code = value.charCodeAt(0)

  return code <= 8 || code === 11 || code === 12 || (code >= 14 && code <= 31) || code === 127
}

export const sanitizeString = (value: string) => {
  return Array.from(value.normalize('NFC'))
    .filter(char => !isUnsafeControlChar(char))
    .join('')
    .trim()
}

export const encodePathSegment = (value: string) => {
  return encodeURIComponent(sanitizeString(value))
}

export const sanitizeLogValue = (value: string) => {
  return sanitizeString(value).slice(0, 200)
}

export const hasSafeUrlProtocol = (value: string) => {
  try {
    const { protocol } = new URL(value)

    return protocol === 'http:' || protocol === 'https:'
  } catch {
    return false
  }
}

const getLocalBackendUrl = () => 'http://localhost:4000'

export const getSafeBackendUrl = (value: string | undefined) => {
  const backendUrl = sanitizeString(value ?? '')

  if (hasSafeUrlProtocol(backendUrl)) {
    return backendUrl.replace(/\/+$/, '')
  }

  throw new Error('VITE_API_URL must be set to the backend origin')
}

export const getBackendUrl = (value: string | undefined, isDevelopment = false) => {
  try {
    return getSafeBackendUrl(value)
  } catch (error) {
    if (isDevelopment) {
      return getLocalBackendUrl()
    }

    throw error
  }
}

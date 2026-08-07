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

export const getSafeBackendUrl = (value: string | undefined) => {
  const fallbackUrl = 'http://localhost:4000'
  const backendUrl = sanitizeString(value ?? fallbackUrl)

  return hasSafeUrlProtocol(backendUrl) ? backendUrl : fallbackUrl
}

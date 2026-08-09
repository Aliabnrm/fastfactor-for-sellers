const value = process.env.VITE_API_URL

if (!value) {
  throw new Error('Missing VITE_API_URL')
}

let url

try {
  url = new URL(value)
} catch {
  throw new Error('VITE_API_URL must be a valid URL')
}

if (!['http:', 'https:'].includes(url.protocol)) {
  throw new Error('VITE_API_URL must use http or https')
}

if (url.pathname !== '/' && url.pathname !== '') {
  throw new Error('VITE_API_URL must be the backend origin only, without /api/v1')
}

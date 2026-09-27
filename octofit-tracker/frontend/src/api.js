const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const localApiBaseUrl = 'http://localhost:8000'

export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : localApiBaseUrl

export const API_ROOT_URL = `${API_BASE_URL}/api`

export function unwrapCollection(payload) {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.items)) return payload.items
  if (Array.isArray(payload?.data)) return payload.data
  if (Array.isArray(payload?.results)) return payload.results
  if (Array.isArray(payload?.docs)) return payload.docs
  if (Array.isArray(payload?.data?.items)) return payload.data.items
  if (Array.isArray(payload?.data?.results)) return payload.data.results
  if (Array.isArray(payload?.data?.docs)) return payload.data.docs
  return []
}

export async function fetchCollection(resource) {
  const response = await fetch(`${API_ROOT_URL}/${resource}/`)
  const payload = await response.json().catch(() => null)

  if (!response.ok) {
    throw new Error(payload?.error || `Unable to load ${resource}`)
  }

  return unwrapCollection(payload)
}
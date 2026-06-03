import { cookies } from 'next/headers'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || ''

interface FetchOptions extends RequestInit {
  params?: Record<string, string | number | boolean | undefined>
}

export const apiServer = {
  async request<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
    let url = `${BASE_URL}${endpoint}`
    if (options.params) {
      const searchParams = new URLSearchParams()
      Object.entries(options.params).forEach(([key, val]) => {
        if (val !== undefined && val !== null) {
          searchParams.append(key, String(val))
        }
      })
      const queryString = searchParams.toString()
      if (queryString) url += `?${queryString}`
    }

    const headers = new Headers(options.headers)
    if (!headers.has('Content-Type')) {
      headers.set('Content-Type', 'application/json')
    }

    try {
      const cookieStore = await cookies()
      const token = cookieStore.get('auth_token')?.value
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
    } catch (e) {
      console.warn('Cannot access cookies in apiServer:', e)
    }

    const response = await fetch(url, {
      ...options,
      headers,
    })

    if (!response.ok) {
      let serverError: any = null
      try {
        serverError = await response.json()
      } catch (_) {}

      console.error(
        `❌ [API Server Error] ${response.status} - ${url}`,
        serverError,
      )
      throw new Error(
        serverError?.message || `System Error: ${response.status}`,
      )
    }

    const data = await response.json()

    if (data && data.success === false) {
      throw new Error(data.message || 'System Error: Failed to process request')
    }

    return data
  },

  get<T>(endpoint: string, options?: FetchOptions) {
    return this.request<T>(endpoint, { ...options, method: 'GET' })
  },

  post<T>(endpoint: string, body?: any, options?: FetchOptions) {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    })
  },

  put<T>(endpoint: string, body?: any, options?: FetchOptions) {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined,
    })
  },

  delete<T>(endpoint: string, options?: FetchOptions) {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' })
  },
}

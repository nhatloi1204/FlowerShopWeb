import axios from 'axios'
import { toast } from 'sonner'

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { 'Content-Type': 'application/json' },
})

// Request Interceptor: auto-attach JWT token from cookies to Authorization header
apiClient.interceptors.request.use(async config => {
  let token: string | undefined

  if (typeof window === 'undefined') {
    const { cookies } = await import('next/headers')
    const cookieStore = await cookies()
    token = cookieStore.get('auth_token')?.value
  } else {
    const { default: Cookies } = await import('js-cookie')
    token = Cookies.get('auth_token')
  }

  if (token && config.headers) {
    config.headers['Authorization'] = `Bearer ${token}`
  }

  return config
})

apiClient.interceptors.response.use(
  response => {
    // Case 1: API response has a success: false field (custom error from .NET backend)
    if (response.data && response.data.success === false) {
      const msg = response.data.message || 'Đã có lỗi xảy ra'
      toast.error(msg)
      throw new Error(msg)
    }
    return response.data
  },
  error => {
    // Case 2: Error response from server (e.g., 400, 401, 500)
    if (error.response) {
      if (typeof window !== 'undefined') {
        const serverMessage = error?.response?.data?.message
        toast.error(serverMessage || `Lỗi hệ thống: ${error.response.status}`)
      }
      throw error
    }

    // Case 3: If no response was received (e.g., network error, CORS issue)
    if (typeof window !== 'undefined') {
      toast.error(
        'Không thể kết nối đến máy chủ. Vui lòng kiểm tra lại mạng hoặc Backend!',
      )
    }
    throw new Error('NetworkError')
  },
)

export default apiClient

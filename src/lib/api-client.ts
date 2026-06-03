import axios from 'axios'
import { toast } from 'sonner'
import Cookies from 'js-cookie'

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { 'Content-Type': 'application/json' },
})

// Request Interceptor: auto-attach JWT token from cookies to Authorization header
apiClient.interceptors.request.use(config => {
  const token = Cookies.get('auth_token')

  if (token && config.headers) {
    config.headers['Authorization'] = `Bearer ${token}`
  }

  return config
})

apiClient.interceptors.response.use(
  response => {
    // Case 1: API response has a success: false field (custom error from .NET backend)
    if (response.data && response.data.success === false) {
      const msg =
        response.data.message || 'There was an error processing your request.'
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
        toast.error(serverMessage || `System Error: ${error.response.status}`)
      }
      throw error
    }

    // Case 3: If no response was received (e.g., network error, CORS issue)
    toast.error(
      'Cannot connect to the server. Please check your network connection or the backend!',
    )
    throw new Error('NetworkError')
  },
)

export default apiClient

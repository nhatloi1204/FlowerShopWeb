import apiClient from '@/lib/api-client'
import {
  LoginData,
  LoginRequest,
  LoginResponseSchema,
  RegisterRequest,
} from '@/validations/auth.schema'
import { toast } from 'sonner'

export const authService = {
  login: async (credentials: LoginRequest): Promise<LoginData> => {
    try {
      const response = await apiClient.post('/Auth/login', credentials)
      if (!response || !response.data) {
        throw new Error('NoResponseData')
      }

      const validated = LoginResponseSchema.parse(response.data)

      if (validated.success) {
        toast.success(validated.message || 'Login successful')
      }

      return validated.data
    } catch (error) {
      throw error
    }
  },

  register: async (registerData: RegisterRequest) => {
    try {
      const response = await apiClient.post('/Auth/register', registerData)

      const validated = LoginResponseSchema.parse(response.data)

      return {
        data: validated.data,
        serverMessage: validated.message || 'Login successful',
      }
    } catch (error) {
      throw error
    }
  },

  externalLogin: async (provider: string, accesstoken: string) => {
    try {
      const response = await apiClient.post(`/Auth/external-login/`, {
        provider,
        accesstoken,
      })
      if (!response || !response.data) {
        throw new Error('NoResponseData')
      }

      const validated = LoginResponseSchema.parse(response.data)

      if (validated.success) {
        toast.success(validated.message || 'Login successful')
      }
      return validated.data
    } catch (error) {
      throw error
    }
  },
}

import { create } from 'zustand'
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'
import { LoginData, JwtPayload } from '@/validations'

interface AuthState {
  isAuthenticated: boolean
  userType: 'Admin' | 'Customer' | null
  user: Omit<LoginData, 'token'> | null
  role: string
  permissions: string[]
  login: (data: LoginData) => 'Admin' | 'Customer'
  logout: () => void
}

export const useAuthStore = create<AuthState>(set => ({
  isAuthenticated: false,
  userType: null,
  user: null,
  role: '',
  permissions: [],

  login: data => {
    const { token, expiresAt, ...userData } = data
    const cookieExpires = new Date(expiresAt)

    const decodedToken = jwtDecode<JwtPayload>(token)
    const role = decodedToken.role

    const rawPermissions = decodedToken['permissions']
    const permissions: string[] = rawPermissions
      ? Array.isArray(rawPermissions)
        ? rawPermissions
        : [rawPermissions]
      : []

    const userType = role ? 'Admin' : 'Customer'

    Cookies.set('auth_token', token, { expires: cookieExpires, secure: true })
    Cookies.set('user_role', userType, { expires: cookieExpires, secure: true })

    set({
      isAuthenticated: true,
      userType,
      user: { ...userData, expiresAt: cookieExpires.toISOString() },
      role,
      permissions,
    })

    return userType
  },

  logout: () => {
    Cookies.remove('auth_token')
    Cookies.remove('user_role')
    set({
      isAuthenticated: false,
      userType: null,
      user: null,
      role: '',
      permissions: [],
    })
  },
}))

import { z } from 'zod'

// ------------- LOGIN SCHEMAS -------------
export const LoginRequestSchema = z.object({
  email: z.string().min(1, 'Vui lòng điền email').email('Email không hợp lệ'),
  password: z
    .string()
    .min(1, 'Vui lòng điền mật khẩu')
    .min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
})

export const LoginDataSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  token: z.string(),
  expiresAt: z.string(), // ISO date string
})

export const LoginResponseSchema = z.object({
  success: z.boolean(),
  message: z.string().nullable().optional(),
  data: LoginDataSchema,
})

export type LoginRequest = z.infer<typeof LoginRequestSchema>
export type LoginData = z.infer<typeof LoginDataSchema>
export type LoginResponse = z.infer<typeof LoginResponseSchema>

export interface JwtPayload {
  id: string
  email: string
  role: string
  permissions: string[]
}

// ------------- END OF LOGIN SCHEMAS -------------

// ------------- SIGNUP SCHEMAS -------------
export const RegisterRequestSchema = z
  .object({
    name: z.string().min(2, 'Tên phải có ít nhất 2 ký tự'),
    email: z.string().email('Email không hợp lệ'),
    password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
    passwordConfirm: z
      .string()
      .min(6, 'Xác nhận mật khẩu phải có ít nhất 6 ký tự'),
  })
  .refine(data => data.password === data.passwordConfirm, {
    message: 'Mật khẩu xác nhận không trùng khớp',
    path: ['passwordConfirm'],
  })

export type RegisterRequest = z.infer<typeof RegisterRequestSchema>

'use client'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import { ROUTES } from '@/constants/routes.constant'
import { GoogleAuthButton } from '../shared/google-auth-button'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { LoginRequest, LoginRequestSchema } from '@/validations'
import { authService } from '@/services'
import { useAuthStore } from '@/stores/useAuthStore'
import Link from 'next/link'
import { Spinner } from '../ui/spinner'

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const router = useRouter()
  const storeLogin = useAuthStore(state => state.login)
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>({
    resolver: zodResolver(LoginRequestSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (values: LoginRequest) => {
    setIsLoading(true)
    try {
      const loginData = await authService.login(values)
      const userType = storeLogin(loginData)

      if (userType === 'Admin') {
        router.push(ROUTES.ADMIN.DASHBOARD)
      } else {
        router.push(ROUTES.PUBLIC.HOME)
      }
    } catch (error) {
      console.error('Login error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card className='overflow-hidden p-0'>
        <CardContent className='grid p-0 md:grid-cols-2'>
          <form onSubmit={handleSubmit(onSubmit)} className='p-6 md:p-8'>
            <FieldGroup>
              <div className='flex flex-col items-center gap-2 text-center'>
                <h1 className='text-2xl font-bold'>Welcome back</h1>
                <p className='text-balance text-muted-foreground'>
                  Login to your account
                </p>
              </div>
              <Field>
                <div className='flex items-center justify-between w-full'>
                  <FieldLabel htmlFor='email' className='m-0'>
                    Email
                  </FieldLabel>
                  {errors.email && (
                    <span className='text-xs font-medium text-red-500 animate-in fade-in duration-200 block text-right'>
                      {errors.email.message}
                    </span>
                  )}
                </div>
                <Input
                  id='email'
                  type='text'
                  placeholder='m@example.com'
                  disabled={isLoading}
                  required
                  {...register('email')}
                  className={cn(
                    'transition-colors',
                    errors.email &&
                      'border-red-500 focus-visible:ring-red-500 text-red-900',
                  )}
                />
              </Field>
              <Field>
                <div className='flex items-center justify-between w-full'>
                  <FieldLabel htmlFor='password' className='m-0'>
                    Password
                  </FieldLabel>
                  {errors.password && (
                    <span className='text-xs font-medium text-red-500 animate-in fade-in duration-200 block text-right'>
                      {errors.password.message}
                    </span>
                  )}
                </div>

                <Input
                  id='password'
                  type='password'
                  required
                  disabled={isLoading}
                  {...register('password')}
                />
              </Field>
              <Field>
                <Button type='submit' className='w-full' disabled={isLoading}>
                  {isLoading ? (
                    <div className='flex items-center'>
                      <Spinner />
                      <span className='ml-2'>Logging in...</span>
                    </div>
                  ) : (
                    'Login'
                  )}
                </Button>
              </Field>

              <a
                href='#'
                className='mx-auto text-sm underline-offset-2 hover:underline'
              >
                Forgot your password?
              </a>
              <FieldSeparator className='*:data-[slot=field-separator-content]:bg-card'>
                Or continue with
              </FieldSeparator>
              <Field className='flex justify-center'>
                <Field className='flex justify-center'>
                  <GoogleAuthButton text='Log in with Google' />
                </Field>
              </Field>
              <FieldDescription className='text-center'>
                Don&apos;t have an account?{' '}
                <Link
                  href={ROUTES.AUTH.SIGNUP}
                  className='underline underline-offset-2 hover:text-primary'
                >
                  Sign up
                </Link>
              </FieldDescription>
            </FieldGroup>
          </form>
          <div className='relative hidden bg-muted md:block'>
            <Image
              src='/images/hoa-cam-tu-cau.jpg'
              alt='Image'
              width={800}
              height={600}
              className='absolute inset-0 h-full w-full object-cover'
              priority
            />
          </div>
        </CardContent>
      </Card>
      <FieldDescription className='px-6 text-center'>
        By clicking continue, you agree to our <a href='#'>Terms of Service</a>{' '}
        and <a href='#'>Privacy Policy</a>.
      </FieldDescription>
    </div>
  )
}

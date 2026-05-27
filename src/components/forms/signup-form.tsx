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
import { toast } from 'sonner'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

import { authService } from '@/services'
import { RegisterRequest, RegisterRequestSchema } from '@/validations'
import { useAuthStore } from '@/stores/useAuthStore'
import { ROUTES } from '@/constants/routes.constant'
import { GoogleAuthButton } from '../shared/google-auth-button'
import { Spinner } from '../ui/spinner'

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const storeLogin = useAuthStore(state => state.login)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterRequest>({
    resolver: zodResolver(RegisterRequestSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
    },
  })

  const onSubmit = async (values: RegisterRequest) => {
    setIsLoading(true)
    try {
      const res = await authService.register(values)

      toast.success('Sign up successful! Logging in...')

      setTimeout(() => {
        toast.success(res.serverMessage)
      }, 200)

      setTimeout(() => {
        const userType = storeLogin(res.data)

        if (userType === 'Admin') {
          router.push(ROUTES.ADMIN.DASHBOARD)
        } else {
          router.push(ROUTES.PUBLIC.HOME)
        }
      }, 0)
    } catch (error) {
      console.error('Signup error:', error)
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
                <h1 className='text-2xl font-bold'>Create your account</h1>
                <p className='text-sm text-balance text-muted-foreground'>
                  Enter your email below to create your account
                </p>
              </div>

              <Field>
                <div className='flex items-center justify-between w-full'>
                  <FieldLabel htmlFor='name' className='m-0'>
                    Full Name
                  </FieldLabel>
                  {errors.name && (
                    <span className='text-xs font-medium text-red-500 animate-in fade-in duration-200 block text-right'>
                      {errors.name.message}
                    </span>
                  )}
                </div>
                <Input
                  id='name'
                  type='text'
                  placeholder='John Doe'
                  disabled={isLoading}
                  {...register('name')}
                  className={cn(
                    'transition-colors',
                    errors.name &&
                      'border-red-500 focus-visible:ring-red-500 text-red-900',
                  )}
                />
              </Field>

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
                  {...register('email')}
                  className={cn(
                    'transition-colors',
                    errors.email &&
                      'border-red-500 focus-visible:ring-red-500 text-red-900',
                  )}
                />
                <FieldDescription>
                  We&apos;ll use this to contact you. We will not share your
                  email with anyone else.
                </FieldDescription>
              </Field>

              <Field>
                <Field className='grid grid-cols-2 gap-4'>
                  <Field>
                    <FieldLabel htmlFor='password'>Password</FieldLabel>
                    <Input
                      id='password'
                      type='password'
                      disabled={isLoading}
                      {...register('password')}
                      className={cn(
                        'transition-colors',
                        errors.password &&
                          'border-red-500 focus-visible:ring-red-500 text-red-900',
                      )}
                    />
                  </Field>

                  <Field>
                    <FieldLabel htmlFor='confirm-password'>
                      Confirm Password
                    </FieldLabel>
                    <Input
                      id='passwordConfirm'
                      type='password'
                      disabled={isLoading}
                      {...register('passwordConfirm')}
                      className={cn(
                        'transition-colors',
                        errors.passwordConfirm &&
                          'border-red-500 focus-visible:ring-red-500 text-red-900',
                      )}
                    />
                  </Field>
                </Field>
                {errors.password || errors.passwordConfirm ? (
                  <span className='text-xs font-medium text-red-500 animate-in fade-in duration-200 block mt-1'>
                    {errors.password?.message ||
                      errors.passwordConfirm?.message}
                  </span>
                ) : (
                  <FieldDescription>
                    Must be at least 6 characters long.
                  </FieldDescription>
                )}
              </Field>
              <Field>
                <Button type='submit' className='w-full' disabled={isLoading}>
                  {isLoading ? (
                    <div className='flex items-center'>
                      <Spinner />
                      <span className='ml-2'>Creating Account...</span>
                    </div>
                  ) : (
                    'Create Account'
                  )}
                </Button>
              </Field>
              <FieldSeparator className='*:data-[slot=field-separator-content]:bg-card'>
                Or continue with
              </FieldSeparator>
              <Field className='flex justify-center'>
                <Field className='flex justify-center'>
                  <GoogleAuthButton text='Sign up with Google' />
                </Field>
              </Field>
              <FieldDescription className='text-center'>
                Already have an account?{' '}
                <Link
                  href={ROUTES.AUTH.LOGIN}
                  className='underline underline-offset-2 hover:text-primary'
                >
                  Sign in
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

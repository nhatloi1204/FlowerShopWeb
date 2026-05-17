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

import { authService } from '@/services/auth.service'
import {
  RegisterRequest,
  RegisterRequestSchema,
} from '@/validations/auth.schema'
import { useAuthStore } from '@/store/useAuthStore'

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
          router.push('/admin/dashboard')
        } else {
          router.push('/')
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
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </Button>
              </Field>
              <FieldSeparator className='*:data-[slot=field-separator-content]:bg-card'>
                Or continue with
              </FieldSeparator>
              <Field className='flex justify-center'>
                <Button variant='outline' type='button'>
                  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
                    <path
                      d='M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z'
                      fill='currentColor'
                    />
                  </svg>
                  <span className='ml-2'>Sign up with Google</span>
                </Button>
              </Field>
              <FieldDescription className='text-center'>
                Already have an account?{' '}
                <Link
                  href='/login'
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

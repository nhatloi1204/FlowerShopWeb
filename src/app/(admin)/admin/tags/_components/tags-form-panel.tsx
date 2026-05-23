'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm, Resolver } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  tagFormSchema,
  type TagFormData,
  type ProductTagOutput,
} from '@/validations'
import { productTagService } from '@/services'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Loader2, Plus, Save, X } from 'lucide-react'
import { toast } from 'sonner'

interface TagFormPanelProps {
  activeTag?: ProductTagOutput
  variant?: 'card' | 'plain'
  showCloseButton?: boolean
}

export function TagFormPanel({
  activeTag,
  variant = 'card',
  showCloseButton = true,
}: TagFormPanelProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const isEditMode = !!activeTag

  const form = useForm<TagFormData>({
    resolver: zodResolver(tagFormSchema) as Resolver<TagFormData>,
    defaultValues: {
      name: '',
    },
  })

  useEffect(() => {
    if (activeTag) {
      form.reset({
        name: activeTag.name ?? '',
      })
    } else {
      form.reset({ name: '' })
    }
  }, [activeTag, form])

  const onSubmit = async (values: TagFormData) => {
    try {
      setLoading(true)
      if (isEditMode && activeTag) {
        await productTagService.update(activeTag.id, values)
        toast.success('Updated tag successfully!')
        handleCancel()
      } else {
        await productTagService.create(values)
        toast.success('Created tag successfully!')
        form.reset({ name: '' })
      }
      router.refresh()
      // eslint-disable-next-line
    } catch (err: any) {
      const errorMsg =
        err?.response?.data?.message ||
        'Something went wrong. Please try again.'
      toast.error(errorMsg)
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    router.replace('/admin/tags')
  }

  const content = (
    <>
      <div className='flex flex-row items-center justify-between space-y-0 pb-4'>
        <div className='text-sm font-bold uppercase tracking-wider text-muted-foreground'>
          {isEditMode ? 'Update Tag' : 'New Tag'}
        </div>
        {showCloseButton && (
          <Button
            type='button'
            size='icon'
            variant='ghost'
            onClick={handleCancel}
            className={
              isEditMode ? 'size-8' : 'size-8 opacity-0 pointer-events-none'
            }
            aria-hidden={!isEditMode}
            tabIndex={isEditMode ? 0 : -1}
          >
            <X className='size-4' />
          </Button>
        )}
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tag Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder='e.g. Hot Trend, New Arrival, Discount...'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='flex gap-2 pt-2'>
            {isEditMode && (
              <Button
                type='button'
                variant='outline'
                onClick={handleCancel}
                disabled={loading}
                className='w-1/3'
                aria-hidden={!isEditMode}
                tabIndex={isEditMode ? 0 : -1}
              >
                Cancel
              </Button>
            )}
            <Button type='submit' disabled={loading} className='flex-1'>
              {loading ? (
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              ) : isEditMode ? (
                <Save className='mr-2 h-4 w-4' />
              ) : (
                <Plus className='mr-2 h-4 w-4' />
              )}
              {isEditMode ? 'Save Changes' : 'Add Tag'}
            </Button>
          </div>
        </form>
      </Form>
    </>
  )

  if (variant === 'plain') {
    return <div className='space-y-4'>{content}</div>
  }

  return (
    <Card className='shadow-sm border-xl'>
      <CardHeader>{content}</CardHeader>

      <CardContent />
    </Card>
  )
}

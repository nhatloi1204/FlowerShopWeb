'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm, Resolver } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  categoryFormSchema,
  type CategoryFormData,
  type ProductCategoryOutput,
} from '@/validations'
import { productCategoryService } from '@/services'
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
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Loader2, Plus, Save, X } from 'lucide-react'
import { toast } from 'sonner'

interface CategoryFormPanelProps {
  activeCategory?: ProductCategoryOutput
  variant?: 'card' | 'plain'
  showCloseButton?: boolean
}

export function CategoryFormPanel({
  activeCategory,
  variant = 'card',
  showCloseButton = true,
}: CategoryFormPanelProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const isEditMode = !!activeCategory

  const form = useForm<CategoryFormData>({
    resolver: zodResolver(categoryFormSchema) as Resolver<CategoryFormData>,
    defaultValues: {
      name: '',
      description: '',
    },
  })

  useEffect(() => {
    if (activeCategory) {
      form.reset({
        name: activeCategory.name,
        description: activeCategory.description ?? '',
      })
    } else {
      form.reset({ name: '', description: '' })
    }
  }, [activeCategory, form])

  const onSubmit = async (values: CategoryFormData) => {
    try {
      setLoading(true)
      if (isEditMode && activeCategory) {
        await productCategoryService.update(activeCategory.id, values)
        toast.success('Updated category successfully!')
        handleCancel()
      } else {
        await productCategoryService.create(values)
        toast.success('Created category successfully!')
        form.reset({ name: '', description: '' })
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
    router.replace('/admin/categories')
  }

  const titleText = isEditMode ? 'Update Category' : 'New Category'

  const formContent = (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category Name</FormLabel>
              <FormControl>
                <Input
                  placeholder='e.g. Wedding Flowers, Birthday...'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='Enter a brief description for this category...'
                  className='min-h-24 resize-none'
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
            {isEditMode ? 'Save Changes' : 'Add Category'}
          </Button>
        </div>
      </form>
    </Form>
  )

  if (variant === 'plain') {
    return (
      <div className='space-y-4'>
        <div className='flex flex-row items-center justify-between space-y-0 pb-4'>
          <div className='text-sm font-bold uppercase tracking-wider text-muted-foreground'>
            {titleText}
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
        {formContent}
      </div>
    )
  }

  return (
    <Card className='shadow-sm border-xl'>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-4'>
        <CardTitle className='text-sm font-bold uppercase tracking-wider text-muted-foreground'>
          {titleText}
        </CardTitle>
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
      </CardHeader>
      <CardContent>{formContent}</CardContent>
    </Card>
  )
}

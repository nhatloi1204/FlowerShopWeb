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
import { productCategoryService } from '@/services/product-category.service'
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
  onRefresh?: () => Promise<void>
}

export function CategoryFormPanel({
  activeCategory,
  onRefresh,
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

      if (onRefresh) await onRefresh()
    } catch (err) {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    form.reset({ name: '', description: '' })
    router.push('/admin/categories')
  }

  return (
    <Card className='shadow-sm border-xl'>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-4'>
        <CardTitle className='text-sm font-bold uppercase tracking-wider text-muted-foreground'>
          {isEditMode ? 'Update Category' : 'New Category'}
        </CardTitle>
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
      </CardHeader>
      <CardContent>
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
              <Button
                type='button'
                variant='outline'
                onClick={handleCancel}
                disabled={loading || !isEditMode}
                className={
                  isEditMode ? 'w-1/3' : 'w-1/3 opacity-0 pointer-events-none'
                }
                aria-hidden={!isEditMode}
                tabIndex={isEditMode ? 0 : -1}
              >
                Cancel
              </Button>
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
      </CardContent>
    </Card>
  )
}

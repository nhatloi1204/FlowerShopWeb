'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useForm, type Resolver } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { ImageUploadManager, ManagedImage } from './image-upload-manager'
import { productService, mediaService } from '@/services'
import {
  ProductCategoryOutput,
  ProductFormData,
  ProductOutput,
  ProductStatus,
  productFormSchema,
} from '@/validations'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'
import { RichTextEditor } from './rich-text-editor'
import { FormSidebar } from './form-sidebar'
import { ROUTES } from '@/constants/routes.constant'

interface ProductFormProps {
  initialData?: ProductOutput | null
  globalCategories: ProductCategoryOutput[]
  onSuccess?: () => void
  onCancel?: () => void
}

const statusOptions: Array<{ value: ProductStatus; label: string }> = [
  { value: 'Available', label: 'Available' },
  { value: 'OutOfStock', label: 'Out Of Stock' },
  { value: 'Discontinued', label: 'Discontinued' },
]

export function ProductForm({
  initialData,
  globalCategories,
  onSuccess,
  onCancel,
}: ProductFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const isSubmitted = useRef(false)
  const uploadedInSession = useRef<string[]>([])

  const defaultCategoryIds = initialData?.categoryIds ?? []

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productFormSchema) as Resolver<ProductFormData>,
    defaultValues: {
      name: initialData?.name ?? '',
      price: initialData?.price ?? 0,
      stockQuantity: initialData?.stockQuantity ?? 0,
      status: initialData?.status ?? 'Available',
      description: initialData?.description ?? '',
      categoryIds: defaultCategoryIds,
    },
  })

  const { handleSubmit } = form
  const handleCancel =
    onCancel ?? (() => router.push(ROUTES.ADMIN.PRODUCTS.INDEX))

  const [managedImages, setManagedImages] = useState<ManagedImage[]>(() => {
    if (!initialData?.imageUrls) return []
    return initialData.imageUrls.map((url, index) => ({
      id: `existing-${index}`,
      url,
      isExisting: true,
    }))
  })

  const handleUpdateIndividualImage = (
    tempId: string,
    updatedData: Partial<ManagedImage> | null,
  ) => {
    setManagedImages(prev => {
      if (!updatedData) return prev.filter(img => img.id !== tempId)
      return prev.map(img =>
        img.id === tempId ? { ...img, ...updatedData } : img,
      )
    })
  }

  useEffect(() => {
    const currentUploadedInSession = uploadedInSession.current
    const currentIsSubmitted = isSubmitted.current
    return () => {
      if (!currentIsSubmitted && currentUploadedInSession.length > 0) {
        mediaService.deleteMulti(currentUploadedInSession)
      }
    }
  }, [])

  const handleTrackSession = (publicId: string, action: 'add' | 'remove') => {
    if (action === 'add') {
      uploadedInSession.current.push(publicId)
    } else {
      uploadedInSession.current = uploadedInSession.current.filter(
        id => id !== publicId,
      )
    }
  }

  const onSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      void handleSubmit(async values => {
        if (managedImages.some(img => img.isUploading)) {
          toast.warning('Please wait for all images to finish uploading.')
          return
        }

        try {
          setLoading(true)
          const payload = {
            ...values,
            price: Number(values.price),
            categoryIds: Array.isArray(values.categoryIds)
              ? values.categoryIds.map(id => parseInt(String(id), 10))
              : [],
            imageUrls: managedImages.map(img => img.url),
          }

          if (initialData) {
            await productService.updateProduct(initialData.id, payload)
            toast.success('Update product successfully!')
          } else {
            await productService.createProduct(payload)
            toast.success('Create product successfully!')
          }

          router.push(ROUTES.ADMIN.PRODUCTS.INDEX)
          router.refresh()
          isSubmitted.current = true
          if (onSuccess) onSuccess()
        } catch {
          toast.error('An error occurred while saving the product.')
        } finally {
          setLoading(false)
        }
      })(event)
    },
    [handleSubmit, managedImages, initialData, router, onSuccess],
  )

  return (
    <Form {...form}>
      <form
        onSubmit={onSubmit}
        className='grid grid-cols-1 gap-6 lg:grid-cols-3 items-start'
      >
        <div className='lg:col-span-2 space-y-6'>
          <Card>
            <CardHeader>
              <CardTitle className='text-sm font-semibold uppercase tracking-wider text-muted-foreground'>
                General Information
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-5'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter product name...' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='stockQuantity'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stock Quantity</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        placeholder='0'
                        value={field.value === 0 ? '' : (field.value ?? '')}
                        onChange={event => {
                          field.onChange(
                            event.target.value === ''
                              ? 0
                              : parseInt(event.target.value, 10),
                          )
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <RichTextEditor control={form.control} name='description' />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className='text-sm font-semibold uppercase tracking-wider text-muted-foreground'>
                Product Gallery
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ImageUploadManager
                value={managedImages}
                onChange={setManagedImages}
                onChangeAction={handleUpdateIndividualImage}
                onTrackUploadedSession={handleTrackSession}
              />
            </CardContent>
          </Card>
        </div>

        <div className='space-y-6'>
          <FormSidebar
            control={form.control}
            categories={globalCategories}
            statusOptions={statusOptions.map(({ value, label }) => ({
              value,
              label,
            }))}
          />

          <div className='flex items-center gap-3 pt-2'>
            <Button
              type='button'
              variant='outline'
              onClick={handleCancel}
              disabled={loading}
              className='w-1/3'
            >
              Cancel
            </Button>
            <Button type='submit' disabled={loading} className='flex-1'>
              {loading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
              {initialData ? 'Save Changes' : 'Create Product'}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  )
}

'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ProductForm } from '../_components/product-form'
import { productCategoryService, productTagService } from '@/services'
import type { ProductCategoryOutput, ProductTagOutput } from '@/validations'
import { ADMIN_TITLES, ROUTES } from '@/constants/routes.constant'
import { ProductFormSkeleton } from '../_components/product-form-skeleton'

export default function ProductCreatePage() {
  const router = useRouter()
  const [categories, setCategories] = useState<ProductCategoryOutput[]>([])
  const [tags, setTags] = useState<ProductTagOutput[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const [categoryData, tagData] = await Promise.all([
          productCategoryService.getAll(),
          productTagService.getAll(),
        ])
        setCategories(categoryData)
        setTags(tagData)
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  if (loading) {
    return (
      <div className='flex flex-1 flex-col gap-4 animate-pulse'>
        <ProductFormSkeleton />
      </div>
    )
  }

  return (
    <div className='flex flex-1 flex-col gap-4'>
      <div>
        <h1 className='text-lg font-semibold uppercase'>
          {ADMIN_TITLES[ROUTES.ADMIN.PRODUCTS.CREATE]}
        </h1>
        <p className='text-sm text-muted-foreground'>Add a new product.</p>
      </div>

      <ProductForm
        globalCategories={categories}
        globalTags={tags}
        onSuccess={() => {
          router.push(ROUTES.ADMIN.PRODUCTS.INDEX)
          router.refresh()
        }}
      />
    </div>
  )
}

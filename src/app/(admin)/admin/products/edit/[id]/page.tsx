'use client'

import * as React from 'react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ProductForm } from '../../_components/product-form'
import { ProductFormSkeleton } from '../../_components/product-form-skeleton'
import {
  productCategoryService,
  productService,
  productTagService,
} from '@/services'
import type {
  ProductCategoryOutput,
  ProductOutput,
  ProductTagOutput,
} from '@/validations'
import { ADMIN_TITLES, ROUTES } from '@/constants/routes.constant'

interface ProductEditPageProps {
  params: Promise<{ id: string }>
}

export default function ProductEditPage({ params }: ProductEditPageProps) {
  const router = useRouter()
  const unwrappedParams = React.use(params)
  const productId = parseInt(unwrappedParams.id)

  const [categories, setCategories] = useState<ProductCategoryOutput[]>([])
  const [tags, setTags] = useState<ProductTagOutput[]>([])
  const [product, setProduct] = useState<ProductOutput | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoryData, tagData, productData] = await Promise.all([
          productCategoryService.getAll(),
          productTagService.getAll(),
          productService.getProductById(productId),
        ])

        setCategories(categoryData)
        setTags(tagData)
        setProduct(productData)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [productId])

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
          {ADMIN_TITLES[ROUTES.ADMIN.PRODUCTS.EDIT]}
        </h1>
        <p className='text-sm text-muted-foreground'>Update product details.</p>
      </div>

      {product ? (
        <ProductForm
          initialData={product}
          globalCategories={categories}
          globalTags={tags}
          onSuccess={() => {
            router.push(ROUTES.ADMIN.PRODUCTS.INDEX)
            router.refresh()
          }}
          onCancel={() => router.push(ROUTES.ADMIN.PRODUCTS.INDEX)}
        />
      ) : (
        <div className='text-sm text-destructive'>Product not found.</div>
      )}
    </div>
  )
}

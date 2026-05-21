'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ProductForm } from '../_components/product-form'
import { productCategoryService } from '@/services'
import type { ProductCategoryOutput } from '@/validations'
import { ADMIN_TITLES, ROUTES } from '@/constants/routes.constant'

export default function ProductCreatePage() {
  const router = useRouter()
  const [categories, setCategories] = useState<ProductCategoryOutput[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await productCategoryService.getAll()
        setCategories(data)
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  return (
    <div className='flex flex-1 flex-col gap-4'>
      <div>
        <h1 className='text-lg font-semibold uppercase'>
          {ADMIN_TITLES[ROUTES.ADMIN.PRODUCTS.CREATE]}
        </h1>
        <p className='text-sm text-muted-foreground'>Add a new product.</p>
      </div>

      {loading ? (
        <div className='text-sm text-muted-foreground'>Loading form...</div>
      ) : (
        <ProductForm
          globalCategories={categories}
          onSuccess={() => {
            router.push(ROUTES.ADMIN.PRODUCTS.INDEX)
            router.refresh()
          }}
        />
      )}
    </div>
  )
}

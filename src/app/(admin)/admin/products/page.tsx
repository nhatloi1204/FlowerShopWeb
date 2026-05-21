'use client'

import { ProductCategoryOutput } from '@/validations/product-category.schema'
import { ProductsTableClient } from './_components/products-table-client'
import { productCategoryService } from '@/services'
import { useEffect, useState } from 'react'
import { ADMIN_TITLES, ROUTES } from '@/constants/routes.constant'

export default function ProductsPage() {
  const [categories, setCategories] = useState<ProductCategoryOutput[]>([])
  useEffect(() => {
    const fetchCategories = async () => {
      const data = await productCategoryService.getAll()
      setCategories(data)
    }

    fetchCategories()
  }, [])
  return (
    <div className='flex flex-1 flex-col gap-4'>
      <div>
        <h1 className='text-lg font-semibold uppercase'>
          {ADMIN_TITLES[ROUTES.ADMIN.PRODUCTS.INDEX]}
        </h1>
        <p className='text-sm text-muted-foreground'>
          Manage catalog items and pricing.
        </p>
      </div>

      <ProductsTableClient globalCategories={categories} />
    </div>
  )
}

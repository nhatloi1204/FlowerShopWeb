'use client'

import { useCallback, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { productCategoryService } from '@/services/product-category.service'
import { CategoriesTable } from './_components/categories-table'
import { CategoryFormPanel } from './_components/category-form-panel'
import { ProductCategoryOutput } from '@/validations/product-category.schema'
import { ADMIN_TITLES, ROUTES } from '@/constants/routes.constant'
import { useIsMobile } from '@/hooks/use-mobile'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { CategoriesSkeleton } from './_components/categories-skeleton'

export default function CategoriesPage() {
  const searchParams = useSearchParams()
  const editId = searchParams.get('editId')
  const router = useRouter()
  const isMobile = useIsMobile()
  const [isFormOpen, setIsFormOpen] = useState(false)

  const [categories, setCategories] = useState<ProductCategoryOutput[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchCategories = useCallback(async () => {
    try {
      setIsLoading(true)
      const data = await productCategoryService.getAll()
      setCategories(data)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    const executeFetch = async () => {
      try {
        await fetchCategories()
      } catch (err) {
        console.error('Failed to fetch categories:', err)
      }
    }

    executeFetch()
  }, [fetchCategories])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isMobile) {
        setIsFormOpen(false)
        return
      }

      setIsFormOpen(!!editId)
    }, 0)

    return () => clearTimeout(timer)
  }, [editId, isMobile])

  const activeCategory = editId
    ? categories.find(c => c.id === Number(editId))
    : undefined

  const handleOpenCreate = () => {
    if (editId) {
      router.push('/admin/categories')
    }
    setIsFormOpen(true)
  }

  const handleSheetChange = (open: boolean) => {
    setIsFormOpen(open)
    if (!open && editId) {
      router.push('/admin/categories')
    }
  }

  if (isLoading) {
    return <CategoriesSkeleton />
  }

  return (
    <div className='flex flex-1 flex-col gap-4'>
      <div>
        <h1 className='text-lg font-semibold uppercase'>
          {ADMIN_TITLES[ROUTES.ADMIN.CATEGORIES] || 'Product Categories'}
        </h1>
        <p className='text-sm text-muted-foreground'>
          Manage your flower categories, slugs, and descriptions.
        </p>
      </div>

      <div className='flex flex-col lg:flex-row gap-4 items-start w-full'>
        <div className='w-full lg:w-[60%] order-2 lg:order-1'>
          <CategoriesTable
            data={categories}
            currentEditingId={editId ? Number(editId) : undefined}
            onRefresh={fetchCategories}
          />
        </div>

        {!isMobile && (
          <div className='w-full lg:w-[40%] order-1 lg:order-2 sticky top-4 h-fit'>
            <CategoryFormPanel
              activeCategory={activeCategory}
              onRefresh={fetchCategories}
            />
          </div>
        )}
      </div>

      {isMobile && (
        <>
          <Sheet open={isFormOpen} onOpenChange={handleSheetChange}>
            <SheetContent side='bottom' className='rounded-t-2xl p-0'>
              <SheetHeader className='border-b'>
                <SheetTitle>Category</SheetTitle>
              </SheetHeader>
              <div className='p-4'>
                <CategoryFormPanel
                  activeCategory={activeCategory}
                  onRefresh={fetchCategories}
                />
              </div>
            </SheetContent>
          </Sheet>

          <Button
            type='button'
            size='icon'
            className='fixed bottom-6 right-6 z-40 rounded-full shadow-lg'
            onClick={handleOpenCreate}
            aria-label='Add category'
          >
            <Plus className='size-5' />
          </Button>
        </>
      )}
    </div>
  )
}

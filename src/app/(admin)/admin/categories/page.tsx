import { productCategoryService } from '@/services/product-category.service'
import { ADMIN_TITLES, ROUTES } from '@/constants/routes.constant'
import { CategoriesPageClient } from './_components/categories-page-client'

interface CategoriesPageProps {
  searchParams?: Promise<{
    editId?: string
  }>
}

export default async function CategoriesPage({
  searchParams,
}: CategoriesPageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined
  const categories = await productCategoryService.getAll()
  const editId = resolvedSearchParams?.editId
    ? Number(resolvedSearchParams.editId)
    : undefined
  const activeCategory = editId
    ? categories.find(category => category.id === editId)
    : undefined

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

      <CategoriesPageClient
        categories={categories}
        activeCategory={activeCategory}
        editId={editId}
      />
    </div>
  )
}

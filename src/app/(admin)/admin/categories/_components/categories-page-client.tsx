import type { ProductCategoryOutput } from '@/validations'
import { CategoriesTable } from './categories-table'
import { CategoryFormPanel } from './category-form-panel'
import { MobileCategorySheet } from './mobile-category-sheet'

interface CategoriesPageClientProps {
  categories: ProductCategoryOutput[]
  activeCategory?: ProductCategoryOutput
  editId?: number
}

export function CategoriesPageClient({
  categories,
  activeCategory,
  editId,
}: CategoriesPageClientProps) {
  return (
    <div className='flex flex-col lg:flex-row gap-4 items-start w-full'>
      <div className='w-full lg:w-[60%] order-2 lg:order-1'>
        <CategoriesTable data={categories} currentEditingId={editId} />
      </div>

      <div className='hidden lg:block w-full lg:w-[40%] order-1 lg:order-2 sticky top-4 h-fit'>
        <CategoryFormPanel activeCategory={activeCategory} />
      </div>

      <div className='lg:hidden w-full'>
        <MobileCategorySheet activeCategory={activeCategory} editId={editId} />
      </div>
    </div>
  )
}

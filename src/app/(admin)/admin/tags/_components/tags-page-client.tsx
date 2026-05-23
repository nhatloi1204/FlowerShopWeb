import type { ProductTagOutput } from '@/validations'
import { TagsTable } from './tag-table'
import { TagFormPanel } from './tags-form-panel'
import { MobileTagSheet } from './mobile-tag-sheet'

interface TagsPageClientProps {
  tags: ProductTagOutput[]
  activeTag?: ProductTagOutput
  editId?: number
}

export function TagsPageClient({
  tags,
  activeTag,
  editId,
}: TagsPageClientProps) {
  return (
    <div className='flex flex-col lg:flex-row gap-4 items-start w-full'>
      <div className='w-full lg:w-[60%] order-2 lg:order-1'>
        <TagsTable data={tags} currentEditingId={editId} />
      </div>

      <div className='hidden lg:block w-full lg:w-[40%] order-1 lg:order-2 sticky top-4 h-fit'>
        <TagFormPanel activeTag={activeTag} />
      </div>

      <div className='lg:hidden w-full'>
        <MobileTagSheet activeTag={activeTag} editId={editId} />
      </div>
    </div>
  )
}

import { productTagService } from '@/services/product-tag.service'
import { ADMIN_TITLES, ROUTES } from '@/constants/routes.constant'
import { TagsPageClient } from './_components/tags-page-client'

interface TagsPageProps {
  searchParams?: Promise<{
    editId?: string
  }>
}

export default async function TagsPage({ searchParams }: TagsPageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined
  const tags = await productTagService.getAll()
  const editId = resolvedSearchParams?.editId
    ? Number(resolvedSearchParams.editId)
    : undefined
  const activeTag = editId ? tags.find(tag => tag.id === editId) : undefined

  return (
    <div className='flex flex-1 flex-col gap-4'>
      <div>
        <h1 className='text-lg font-semibold uppercase'>
          {ADMIN_TITLES[ROUTES.ADMIN.TAGS] || 'Product Tags'}
        </h1>
        <p className='text-sm text-muted-foreground'>
          Manage your flower tags used for grouping, highlights, and filtering.
        </p>
      </div>

      <TagsPageClient tags={tags} activeTag={activeTag} editId={editId} />
    </div>
  )
}

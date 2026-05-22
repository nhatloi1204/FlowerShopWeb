'use client'

import { useCallback, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { productTagService } from '@/services'
import { TagsTable } from './_components/tag-table'
import { TagFormPanel } from './_components/tags-form-panel'
import { ProductTagOutput } from '@/validations'
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
import { TagsSkeleton } from './_components/tags-skeleton'

export default function TagsPage() {
  const searchParams = useSearchParams()
  const editId = searchParams.get('editId')
  const router = useRouter()
  const isMobile = useIsMobile()
  const [isFormOpen, setIsFormOpen] = useState(false)

  const [tags, setTags] = useState<ProductTagOutput[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchTags = useCallback(async () => {
    try {
      setIsLoading(true)
      const data = await productTagService.getAll()
      setTags(data)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    const executeFetch = async () => {
      try {
        await fetchTags()
      } catch (err) {
        console.error('Failed to fetch tags:', err)
      }
    }

    executeFetch()
  }, [fetchTags])

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

  const activeTag = editId ? tags.find(t => t.id === Number(editId)) : undefined

  const handleOpenCreate = () => {
    if (editId) {
      router.push('/admin/tags')
    }
    setIsFormOpen(true)
  }

  const handleSheetChange = (open: boolean) => {
    setIsFormOpen(open)
    if (!open && editId) {
      router.push('/admin/tags')
    }
  }

  if (isLoading) {
    return <TagsSkeleton />
  }

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

      <div className='flex flex-col lg:flex-row gap-4 items-start w-full'>
        <div className='w-full lg:w-[60%] order-2 lg:order-1'>
          <TagsTable
            data={tags}
            currentEditingId={editId ? Number(editId) : undefined}
            onRefresh={fetchTags}
          />
        </div>

        {!isMobile && (
          <div className='w-full lg:w-[40%] order-1 lg:order-2 sticky top-4 h-fit'>
            <TagFormPanel activeTag={activeTag} onRefresh={fetchTags} />
          </div>
        )}
      </div>

      {isMobile && (
        <>
          <Sheet open={isFormOpen} onOpenChange={handleSheetChange}>
            <SheetContent side='bottom' className='rounded-t-2xl p-0'>
              <SheetHeader className='border-b'>
                <SheetTitle>Tag Management</SheetTitle>
              </SheetHeader>
              <div className='p-4'>
                <TagFormPanel activeTag={activeTag} onRefresh={fetchTags} />
              </div>
            </SheetContent>
          </Sheet>

          <Button
            type='button'
            size='icon'
            className='fixed bottom-6 right-6 z-40 rounded-full shadow-lg'
            onClick={handleOpenCreate}
            aria-label='Add tag'
          >
            <Plus className='size-5' />
          </Button>
        </>
      )}
    </div>
  )
}

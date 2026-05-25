'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Plus } from 'lucide-react'
import type { ProductCategoryOutput } from '@/validations'
import { Button } from '@/components/ui/button'
import { CategoryFormPanel } from './category-form-panel'
import { useIsMobile } from '@/hooks/use-mobile'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'

interface MobileCategorySheetProps {
  activeCategory?: ProductCategoryOutput
  editId?: number
}

export function MobileCategorySheet({
  activeCategory,
  editId,
}: MobileCategorySheetProps) {
  const router = useRouter()
  const isMobile = useIsMobile()
  const [createOpen, setCreateOpen] = useState(false)

  const isEditing = !!editId
  const open = isMobile && (isEditing || createOpen)

  const handleOpenCreate = () => {
    if (editId) {
      router.replace('/admin/categories')
    }

    setCreateOpen(true)
  }

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      if (editId) {
        router.replace('/admin/categories')
      }
      setCreateOpen(false)
    }
  }

  if (!isMobile) return null

  return (
    <>
      <Sheet open={open} onOpenChange={handleOpenChange}>
        <SheetContent side='bottom' className='rounded-t-2xl p-0'>
          <SheetHeader className='border-b'>
            <SheetTitle>Category Management</SheetTitle>
          </SheetHeader>
          <div className='p-4'>
            <CategoryFormPanel
              activeCategory={activeCategory}
              variant='plain'
              showCloseButton={false}
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
  )
}

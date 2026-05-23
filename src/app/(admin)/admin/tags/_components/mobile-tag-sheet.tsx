'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Plus } from 'lucide-react'
import type { ProductTagOutput } from '@/validations'
import { Button } from '@/components/ui/button'
import { TagFormPanel } from './tags-form-panel'
import { useIsMobile } from '@/hooks/use-mobile'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'

interface MobileTagSheetProps {
  activeTag?: ProductTagOutput
  editId?: number
}

export function MobileTagSheet({ activeTag, editId }: MobileTagSheetProps) {
  const router = useRouter()
  const isMobile = useIsMobile()
  const [createOpen, setCreateOpen] = useState(false)

  const isEditing = !!editId
  const open = isMobile && (isEditing || createOpen)

  const handleOpenCreate = () => {
    if (editId) {
      router.replace('/admin/tags')
    }

    setCreateOpen(true)
  }

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      if (editId) {
        router.replace('/admin/tags')
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
            <SheetTitle>Tag Management</SheetTitle>
          </SheetHeader>
          <div className='p-4'>
            <TagFormPanel
              activeTag={activeTag}
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
        aria-label='Add tag'
      >
        <Plus className='size-5' />
      </Button>
    </>
  )
}

'use client'

import { useCallback, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { DataTable } from '@/components/ui/data-table'
import { Button } from '@/components/ui/button'
import { Edit2, Trash2 } from 'lucide-react'
import { ConfirmDeleteDialog } from '@/components/shared/confirm-delete-dialog'
import { productTagService } from '@/services/'
import { ProductTagOutput } from '@/validations'
import { DataTablePagination } from '@/components/ui/data-table-pagination'
import { toast } from 'sonner'

interface TagsTableProps {
  data: ProductTagOutput[]
  currentEditingId?: number
}

export function TagsTable({ data, currentEditingId }: TagsTableProps) {
  const router = useRouter()
  const [deleteId, setDeleteId] = useState<number | null>(null)

  const handleEditToggle = useCallback(
    (id: number) => {
      if (currentEditingId === id) {
        router.replace('/admin/tags')
        return
      }

      router.replace(`/admin/tags?editId=${id}`)
    },
    [currentEditingId, router],
  )

  const handleDelete = async () => {
    if (!deleteId) return
    try {
      const response = await productTagService.delete(deleteId)

      if (response?.success === false) {
        toast.error(response.message || 'Failed to delete tag.')
      } else {
        toast.success('Tag deleted successfully!')
        if (currentEditingId === deleteId) {
          router.replace('/admin/tags')
        }
        router.refresh()
      }
      // eslint-disable-next-line
    } catch (err: any) {
      const errorMsg = err?.response?.data?.message || 'Failed to delete tag.'
      toast.error(errorMsg)
    } finally {
      setDeleteId(null)
    }
  }

  const columns = useMemo<ColumnDef<ProductTagOutput>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Tag Name',

        size: 200,
        cell: ({ row }) => (
          <div className='font-medium text-sm'>{row.original.name}</div>
        ),
      },
      {
        accessorKey: 'createdAt',
        header: 'Created At',
        size: 200,
        cell: ({ row }) => {
          const date = new Date(row.original.createdAt)
          return (
            <div className='text-sm text-muted-foreground'>
              {date.toLocaleDateString('vi-VN')}
            </div>
          )
        },
      },
      {
        accessorKey: 'updatedAt',
        header: 'Updated At',
        size: 200,
        cell: ({ row }) => {
          const date = new Date(row.original.updatedAt)
          return (
            <div className='text-sm text-muted-foreground'>
              {date.toLocaleDateString('vi-VN')}
            </div>
          )
        },
      },
      {
        id: 'actions',
        header: () => <div className='text-right'>Actions</div>,
        size: 100,
        cell: ({ row }) => {
          const isSelected = currentEditingId === row.original.id
          return (
            <div className='flex items-center justify-end gap-2'>
              <Button
                type='button'
                size='icon'
                variant={isSelected ? 'default' : 'outline'}
                className='size-8'
                onClick={() => handleEditToggle(row.original.id)}
              >
                <Edit2 className='size-3.5' />
              </Button>
              <Button
                type='button'
                size='icon'
                variant='outline'
                className='size-8 text-destructive hover:bg-destructive/10 hover:text-destructive'
                onClick={() => setDeleteId(row.original.id)}
              >
                <Trash2 className='size-3.5' />
              </Button>
            </div>
          )
        },
      },
    ],
    [currentEditingId, handleEditToggle],
  )

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  })

  return (
    <div className='space-y-4'>
      <div className='rounded-xl border bg-card overflow-hidden'>
        <div className='flex items-center justify-between border-b px-4 py-3 text-sm text-muted-foreground'>
          <span>Total {data.length} tags</span>
        </div>
        <DataTable
          table={table}
          emptyMessage='No tags found.'
          isLoading={false}
        />
      </div>

      <DataTablePagination table={table} />

      <ConfirmDeleteDialog
        isOpen={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title='Delete Tag?'
        description='Are you sure you want to delete this tag? This action cannot be undone. Products tied to this tag will simply lose the tag association.'
      />
    </div>
  )
}

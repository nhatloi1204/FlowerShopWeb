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
import { productCategoryService } from '@/services/product-category.service'
import { ProductCategoryOutput } from '@/validations/product-category.schema'
import { DataTablePagination } from '@/components/ui/data-table-pagination'
import { toast } from 'sonner'

interface CategoriesTableProps {
  data: ProductCategoryOutput[]
  currentEditingId?: number
  onRefresh?: () => Promise<void>
}

export function CategoriesTable({
  data,
  currentEditingId,
  onRefresh,
}: CategoriesTableProps) {
  const router = useRouter()
  const [deleteId, setDeleteId] = useState<number | null>(null)

  const handleEditToggle = useCallback(
    (id: number) => {
      if (currentEditingId === id) {
        router.push('/admin/categories')
        return
      }

      router.push(`/admin/categories?editId=${id}`)
    },
    [currentEditingId, router],
  )

  const handleDelete = async () => {
    if (!deleteId) return
    try {
      const response = await productCategoryService.delete(deleteId)

      if (
        response?.success === false ||
        response?.message?.includes('cannot')
      ) {
        toast.error(
          response.message || 'Cannot delete category containing products!',
        )
      } else {
        toast.success('Category deleted successfully!')
        if (currentEditingId === deleteId) {
          router.push('/admin/categories')
        }
        if (onRefresh) await onRefresh()
      }
      // eslint-disable-next-line
    } catch (err: any) {
      const errorMsg =
        err?.response?.data?.message || 'Failed to delete category.'
      toast.error(errorMsg)
    } finally {
      setDeleteId(null)
    }
  }

  const columns = useMemo<ColumnDef<ProductCategoryOutput>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Category Name',
        cell: ({ row }) => (
          <div className='font-medium'>{row.original.name}</div>
        ),
      },
      {
        accessorKey: 'description',
        header: 'Description',
        cell: ({ row }) => (
          <div className='text-sm text-muted-foreground max-w-xs truncate'>
            {row.original.description || '-'}
          </div>
        ),
      },
      {
        accessorKey: 'slug',
        header: 'Slug / URL',
        cell: ({ row }) => (
          <span className='text-sm font-mono text-muted-foreground'>
            /{row.original.slug}
          </span>
        ),
      },
      {
        id: 'actions',
        header: () => <div className='text-right'>Actions</div>,
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
          <span>Total {data.length} categories</span>
        </div>
        <DataTable
          table={table}
          emptyMessage='No categories found.'
          isLoading={false}
        />
      </div>

      <DataTablePagination table={table} />

      <ConfirmDeleteDialog
        isOpen={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title='Delete Category?'
        description='Are you sure you want to delete this category? This action cannot be undone and will be blocked if it contains active flowers.'
      />
    </div>
  )
}

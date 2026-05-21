'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import Link from 'next/link'
import {
  ColumnDef,
  getCoreRowModel,
  PaginationState,
  Updater,
  useReactTable,
} from '@tanstack/react-table'
import { DataTable } from '@/components/ui/data-table'
import { DataTablePagination } from '@/components/ui/data-table-pagination'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useDebounce } from '@/hooks/use-debounce'
import { ProductOutput, ProductPagedList } from '@/validations/product.schema'
import { productService } from '@/services/product.service'
import { ProductCategoryOutput } from '@/validations/product-category.schema'
import { Plus } from 'lucide-react'
import { ConfirmDeleteDialog } from '@/components/shared/confirm-delete-dialog'
import { ROUTES } from '@/constants/routes.constant'

const formatPrice = (product: ProductOutput) => {
  if (product.price != null) {
    return `${product.price.toLocaleString('en-US')} VND`
  }

  if (product.priceMin != null || product.priceMax != null) {
    const min = product.priceMin ?? 0
    const max = product.priceMax ?? 0
    return `${min.toLocaleString('en-US')} - ${max.toLocaleString('en-US')} VND`
  }

  return '--'
}

interface ProductsTableClientProps {
  globalCategories: ProductCategoryOutput[]
}

const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) {
    return error.message
  }

  if (typeof error === 'string') {
    return error
  }

  return 'Failed to load products'
}

type ProductStatusFilter = 'Available' | 'OutOfStock' | 'Discontinued' | 'all'

export function ProductsTableClient({
  globalCategories,
}: ProductsTableClientProps) {
  const [productIdToDelete, setProductIdToDelete] = useState<number | null>(
    null,
  )
  const [pagedData, setPagedData] = useState<ProductPagedList>({
    items: [],
    totalItems: 0,
    currentPage: 1,
    totalPages: 1,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search.trim(), 500)
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  })
  const [rowSelection, setRowSelection] = useState({})
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | 'all'>(
    'all',
  )
  const [selectedStatus, setSelectedStatus] =
    useState<ProductStatusFilter>('all')

  const statusLabels: Record<string, string> = {
    Available: 'Available',
    OutOfStock: 'Out of Stock',
    Discontinued: 'Discontinued',
  }

  const handlePaginationChange = useCallback(
    (updater: Updater<PaginationState>) => {
      setPagination(current => {
        const next = typeof updater === 'function' ? updater(current) : updater
        if (next.pageSize !== current.pageSize) {
          return { ...next, pageIndex: 0 }
        }
        return next
      })
    },
    [setPagination],
  )

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const data = await productService.getProducts({
        query: {
          search: debouncedSearch || undefined,
          page: pagination.pageIndex + 1,
          pageSize: pagination.pageSize,
          categoryId:
            selectedCategoryId === 'all' ? undefined : selectedCategoryId,
          status: selectedStatus === 'all' ? undefined : selectedStatus,
        },
      })
      setPagedData(data)
      setRowSelection({})
    } catch (error) {
      setError(getErrorMessage(error))
    } finally {
      setLoading(false)
    }
  }, [
    debouncedSearch,
    pagination.pageIndex,
    pagination.pageSize,
    selectedCategoryId,
    selectedStatus,
  ])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  const columns = useMemo<ColumnDef<ProductOutput>[]>(
    () => [
      {
        id: 'select',
        size: 50,
        header: ({ table }) => (
          <input
            type='checkbox'
            className='size-4 rounded border'
            checked={table.getIsAllPageRowsSelected()}
            onChange={event =>
              table.toggleAllPageRowsSelected(event.target.checked)
            }
            aria-label='Select all'
          />
        ),
        cell: ({ row }) => (
          <input
            type='checkbox'
            className='size-4 rounded border'
            checked={row.getIsSelected()}
            onChange={event => row.toggleSelected(event.target.checked)}
            aria-label='Select row'
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: 'name',
        header: 'Name',
        size: 250,
        cell: ({ row }) => row.original.name ?? '--',
      },
      {
        id: 'price',
        header: 'Price',
        size: 150,
        cell: ({ row }) => formatPrice(row.original),
      },
      {
        accessorKey: 'stockQuantity',
        header: 'Stock',
        size: 100,
        cell: ({ row }) => row.original.stockQuantity ?? '--',
      },
      {
        accessorKey: 'status',
        header: 'Status',
        size: 130,
        cell: ({ row }) => {
          return row.original.status
            ? statusLabels[row.original.status] || row.original.status
            : '--'
        },
      },
      {
        accessorKey: 'updatedAt',
        header: 'Updated',
        size: 140,
        cell: ({ row }) =>
          row.original.updatedAt
            ? new Date(row.original.updatedAt).toLocaleDateString('en-US')
            : '--',
      },
      {
        id: 'actions',
        header: 'Actions',
        size: 160,
        cell: ({ row }) => (
          <div className='flex items-center gap-2'>
            <Button type='button' size='sm' variant='outline' asChild>
              <Link href={`${ROUTES.ADMIN.PRODUCTS.EDIT}/${row.original.id}`}>
                Edit
              </Link>
            </Button>
            <Button
              type='button'
              size='sm'
              variant='destructive'
              onClick={() => setProductIdToDelete(row.original.id)}
            >
              Delete
            </Button>
          </div>
        ),
      },
    ],
    [],
  )

  const table = useReactTable({
    data: pagedData.items,
    columns,
    state: { pagination, rowSelection },
    onPaginationChange: handlePaginationChange,
    onRowSelectionChange: setRowSelection,
    enableRowSelection: true,
    manualPagination: true,
    pageCount: pagedData.totalPages,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <>
      <div className='flex flex-wrap items-center gap-3'>
        <Input
          value={search}
          onChange={event => {
            setPagination(current => ({ ...current, pageIndex: 0 }))
            setSearch(event.target.value)
          }}
          placeholder='Search products...'
          className='max-w-sm'
        />

        <select
          value={selectedCategoryId}
          onChange={event => {
            const value = event.target.value
            setPagination(current => ({ ...current, pageIndex: 0 }))
            setSelectedCategoryId(value === 'all' ? 'all' : Number(value))
          }}
          className='flex h-9 w-full max-w-55 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring'
        >
          <option value='all'>All categories</option>
          {globalCategories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        <select
          value={selectedStatus}
          onChange={event => {
            const value = event.target.value as ProductStatusFilter
            setPagination(current => ({ ...current, pageIndex: 0 }))
            setSelectedStatus(value)
          }}
          className='flex h-9 w-full max-w-55 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring'
        >
          <option value='all'>All status</option>
          <option value='Available'>Available</option>
          <option value='OutOfStock'>Out of Stock</option>
          <option value='Discontinued'>Discontinued</option>
        </select>

        <Button size='lg' asChild className='ml-auto'>
          <Link href={ROUTES.ADMIN.PRODUCTS.CREATE}>
            <Plus className='mr-2 h-4 w-4' /> Add Product
          </Link>
        </Button>
      </div>

      <div className='flex flex-wrap items-center gap-3 text-sm text-muted-foreground'>
        Selected {table.getSelectedRowModel().rows.length} of{' '}
        {pagedData.totalItems}
        <span aria-hidden='true'>•</span>
        Total {pagedData.totalItems} items
      </div>

      <div className='rounded-xl border bg-card'>
        {error ? (
          <div className='p-6 text-sm text-destructive'>{error}</div>
        ) : (
          <DataTable
            table={table}
            emptyMessage='No products found.'
            isLoading={loading}
          />
        )}
      </div>

      <DataTablePagination table={table} />

      <ConfirmDeleteDialog
        isOpen={productIdToDelete !== null}
        onClose={() => setProductIdToDelete(null)}
        onConfirm={async () => {
          if (productIdToDelete) {
            await productService.deleteProduct(productIdToDelete)
            await fetchProducts()
          }
        }}
        title='Delete Product?'
        description='Are you sure you want to delete this product? This will remove it from store shelves.'
      />
    </>
  )
}

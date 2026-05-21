import { Table as TableInstance } from '@tanstack/react-table'

import { Button } from '@/components/ui/button'

type DataTablePaginationProps<TData> = {
  table: TableInstance<TData>
  pageSizeOptions?: number[]
}

export function DataTablePagination<TData>({
  table,
  pageSizeOptions = [10, 20, 30, 40, 50],
}: DataTablePaginationProps<TData>) {
  const pagination = table.getState().pagination

  return (
    <div className='flex flex-wrap items-center justify-between gap-3'>
      <p className='text-sm text-muted-foreground'>
        Page {pagination.pageIndex + 1} of {table.getPageCount() || 1}
      </p>
      <div className='flex items-center gap-2'>
        <label className='text-sm text-muted-foreground'>Rows</label>
        <select
          className='h-9 rounded-md border bg-background px-2 text-sm'
          value={pagination.pageSize}
          onChange={event => table.setPageSize(Number(event.target.value))}
        >
          {pageSizeOptions.map(pageSize => (
            <option key={pageSize} value={pageSize}>
              {pageSize}
            </option>
          ))}
        </select>
        <Button
          variant='outline'
          size='sm'
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant='outline'
          size='sm'
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  )
}

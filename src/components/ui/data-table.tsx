import { flexRender, Table as TableInstance } from '@tanstack/react-table'
import { Skeleton } from '@/components/ui/skeleton'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

type DataTableProps<TData> = {
  table: TableInstance<TData>
  emptyMessage?: string
  isLoading?: boolean
}

export function DataTable<TData>({
  table,
  emptyMessage = 'No results.',
  isLoading = false,
}: DataTableProps<TData>) {
  const columnsCount = table.getAllColumns().length

  return (
    <Table style={{ tableLayout: 'fixed', width: '100%' }}>
      <TableHeader>
        {table.getHeaderGroups().map(headerGroup => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map(header => {
              const width = header.column.getSize()
              return (
                <TableHead key={header.id} style={{ width }}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </TableHead>
              )
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {isLoading ? (
          Array.from({ length: 5 }).map((_, rowIndex) => (
            <TableRow key={`loading-row-${rowIndex}`}>
              {table.getAllColumns().map(column => {
                const width = column.getSize()
                const colId = column.id

                return (
                  <TableCell
                    key={`loading-cell-${rowIndex}-${column.id}`}
                    style={{ width }}
                  >
                    {colId === 'select' ? (
                      <Skeleton className='h-4 w-4 rounded bg-muted/60' />
                    ) : (
                      <Skeleton className='h-5 w-[85%] rounded bg-muted/60' />
                    )}
                  </TableCell>
                )
              })}
            </TableRow>
          ))
        ) : table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map(row => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map(cell => {
                const width = cell.column.getSize()
                return (
                  <TableCell key={cell.id} style={{ width }}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                )
              })}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columnsCount}>
              <div className='py-6 text-center text-sm text-muted-foreground'>
                {emptyMessage}
              </div>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}

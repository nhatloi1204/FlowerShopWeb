import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

export function ProductFormSkeleton() {
  return (
    <div className='grid grid-cols-1 gap-6 lg:grid-cols-3 items-start animate-pulse'>
      <div className='lg:col-span-2 space-y-6'>
        <Card>
          <CardHeader>
            <Skeleton className='h-4 w-40' />
          </CardHeader>
          <CardContent className='space-y-5'>
            <div className='space-y-2'>
              <Skeleton className='h-4 w-28' />
              <Skeleton className='h-9 w-full rounded-md' />
            </div>

            <div className='space-y-2'>
              <Skeleton className='h-4 w-24' />
              <Skeleton className='h-9 w-full rounded-md' />
            </div>

            <div className='space-y-2'>
              <Skeleton className='h-4 w-20' />
              <Skeleton className='h-10 w-full rounded-t-md' />

              <Skeleton className='h-50 w-full rounded-b-md' />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Skeleton className='h-4 w-32' />
          </CardHeader>
          <CardContent className='space-y-4'>
            <Skeleton className='h-3 w-64' />
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
              <Skeleton className='aspect-square rounded-lg' />

              <Skeleton className='aspect-square rounded-lg' />

              <Skeleton className='aspect-square rounded-lg' />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className='space-y-6'>
        <div className='space-y-5 rounded-xl border bg-card p-5 shadow-sm'>
          <div className='space-y-2'>
            <Skeleton className='h-4 w-20' />
            <Skeleton className='h-9 w-full rounded-md' />
          </div>

          <div className='border-t border-dashed pt-4 space-y-2'>
            <Skeleton className='h-4 w-16' />
            <Skeleton className='h-9 w-full rounded-md' />
          </div>

          <div className='border-t border-dashed pt-4 space-y-2'>
            <Skeleton className='h-4 w-20' />
            <Skeleton className='h-9 w-full rounded-md' />
          </div>
        </div>

        <div className='flex items-center gap-3 pt-2'>
          <Skeleton className='h-10 w-1/3 rounded-md' />
          <Skeleton className='h-10 flex-1 rounded-md' />
        </div>
      </div>
    </div>
  )
}

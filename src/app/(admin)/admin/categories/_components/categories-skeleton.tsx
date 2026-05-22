import { Skeleton } from '@/components/ui/skeleton'

export function CategoriesSkeleton() {
  return (
    <div className='flex flex-1 flex-col gap-4 animate-pulse'>
      <div>
        <Skeleton className='h-6 w-48 mb-2' />
        <Skeleton className='h-4 w-80' />
      </div>

      <div className='flex flex-col lg:flex-row gap-4 items-start w-full'>
        <div className='w-full lg:w-[60%] order-2 lg:order-1 space-y-4'>
          <div className='rounded-xl border bg-card overflow-hidden'>
            <div className='border-b px-4 py-3'>
              <Skeleton className='h-4 w-32' />
            </div>

            <div className='p-4 space-y-4'>
              <div className='flex items-center justify-between border-b pb-2'>
                <Skeleton className='h-4 w-1/4' />
                <Skeleton className='h-4 w-2/5 hidden md:block' />
                <Skeleton className='h-4 w-1/6' />
                <Skeleton className='h-4 w-12 ml-auto' />
              </div>

              {Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className='flex items-center justify-between py-2 border-b border-muted/40 last:border-0'
                >
                  <Skeleton className='h-5 w-1/3' />
                  <Skeleton className='h-4 w-1/3 hidden md:block' />{' '}
                  <Skeleton className='h-4 w-16 font-mono' />
                  <div className='flex gap-2 ml-auto'>
                    {' '}
                    <Skeleton className='size-8 rounded-md' />
                    <Skeleton className='size-8 rounded-md' />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className='flex items-center justify-between px-2'>
            <Skeleton className='h-4 w-36' />
            <div className='flex items-center gap-2'>
              <Skeleton className='h-8 w-28' />
              <Skeleton className='h-8 w-16' />
            </div>
          </div>
        </div>

        <div className='hidden lg:block w-full lg:w-[40%] order-1 lg:order-2 sticky top-4 h-fit'>
          <div className='rounded-xl border bg-card p-6 space-y-6'>
            <div className='flex items-center justify-between'>
              <Skeleton className='h-5 w-32' />
            </div>

            <div className='space-y-4'>
              <div className='space-y-2'>
                <Skeleton className='h-4 w-24' />
                <Skeleton className='h-10 w-full rounded-md' />
              </div>

              <div className='space-y-2'>
                <Skeleton className='h-4 w-20' />
                <Skeleton className='h-24 w-full rounded-md' />
              </div>

              <div className='flex gap-2 pt-2'>
                <Skeleton className='h-10 w-1/3 rounded-md' />
                <Skeleton className='h-10 flex-1 rounded-md' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

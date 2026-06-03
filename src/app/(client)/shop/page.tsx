import ShopContent from './shop-content'
import { DynamicBreadcrumb } from '@/components/shared/dynamic-breadcrumb'
interface ShopPageProps {
  searchParams: Promise<{
    page?: string
    categoryId?: string
    maxPrice?: string
    sort?: string
    tag?: string
  }>
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const params = await searchParams

  const page = params.page ? parseInt(params.page) : 1
  const categoryId = params.categoryId || null
  const maxPrice = params.maxPrice ? parseInt(params.maxPrice) : 500
  const sort = params.sort || 'average-rating'
  const tag = params.tag || null

  return (
    <>
      <DynamicBreadcrumb
        className='h-46 w-full bg-primary-foreground flex flex-col items-center justify-center gap-2'
        header='Shop'
      />
      <ShopContent
        page={page}
        categoryId={categoryId}
        maxPrice={maxPrice}
        sort={sort}
        tag={tag}
      />
    </>
  )
}

'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import FilterSidebar from './_components/filter-sidebar'
import ProductCardSquare from '@/components/shared/product-card-square'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import Container from '@/components/container'

const MOCK_PRODUCTS = Array.from({ length: 12 }).map((_, index) => ({
  id: index + 1,
  name: `Bó Hoa Hồng Đỏ Khởi Đầu May Mắn #${index + 1}`,
  slug: `bo-hoa-hong-do-khoi-dau-may-man-${index + 1}`,
  price: 49.0,
  originalPrice: index % 3 === 0 ? 59.0 : undefined,
  imageUrl:
    'https://images.unsplash.com/photo-1561181286-d3fee7d55364?q=80&w=600&auto=format&fit=crop',
  rating: 5,
}))

const MOCK_PAGES = {
  totalItems: 38,
  totalPages: 4,
  pageSize: 12,
}

interface ShopContentProps {
  page: number
  categoryId: string | null
  maxPrice: number
  sort: string
  tag: string | null
}

export default function ShopContent({
  page,
  categoryId,
  maxPrice,
  sort,
  tag,
}: ShopContentProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const handleFilterChange = (key: string, value: string | number | null) => {
    const params = new URLSearchParams(searchParams.toString())

    if (value === null || value === '') {
      params.delete(key)
    } else {
      params.set(key, value.toString())
    }

    if (key !== 'page') {
      params.set('page', '1')
    }

    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <Container className='my-14'>
      <div className='flex flex-col md:flex-row gap-8 mt-8'>
        <FilterSidebar
          selectedCategoryId={categoryId}
          currentMaxPrice={maxPrice}
          selectedTag={tag}
          onFilterChange={handleFilterChange}
        />

        <div className='flex-1'>
          <div className='flex justify-between items-center border border-neutral-100 p-3 bg-neutral-50/50 rounded-sm mb-6 text-xs sm:text-sm text-neutral-500'>
            <div>
              Showing {(page - 1) * MOCK_PAGES.pageSize + 1}–
              {Math.min(page * MOCK_PAGES.pageSize, MOCK_PAGES.totalItems)} of{' '}
              {MOCK_PAGES.totalItems} results
            </div>
            <div>
              <select
                value={sort}
                onChange={e => handleFilterChange('sort', e.target.value)}
                className='border border-neutral-200 p-1.5 bg-white rounded-sm text-neutral-700 text-xs sm:text-sm outline-none cursor-pointer'
              >
                <option value='average-rating'>Sort by average rating</option>
                <option value='price-low'>Sort by price: low to high</option>
                <option value='price-high'>Sort by price: high to low</option>
              </select>
            </div>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8 mb-10'>
            {MOCK_PRODUCTS.map(product => (
              <ProductCardSquare key={product.id} product={product} />
            ))}
          </div>

          {MOCK_PAGES.totalPages > 1 && (
            <Pagination className='mt-8'>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    className={
                      page <= 1
                        ? 'pointer-events-none opacity-40'
                        : 'cursor-pointer'
                    }
                    onClick={() =>
                      page > 1 && handleFilterChange('page', page - 1)
                    }
                  />
                </PaginationItem>

                {Array.from({ length: MOCK_PAGES.totalPages }).map((_, i) => {
                  const pageNum = i + 1
                  return (
                    <PaginationItem key={pageNum}>
                      <PaginationLink
                        isActive={page === pageNum}
                        className='cursor-pointer'
                        onClick={() => handleFilterChange('page', pageNum)}
                      >
                        {pageNum}
                      </PaginationLink>
                    </PaginationItem>
                  )
                })}

                <PaginationItem>
                  <PaginationNext
                    className={
                      page >= MOCK_PAGES.totalPages
                        ? 'pointer-events-none opacity-40'
                        : 'cursor-pointer'
                    }
                    onClick={() =>
                      page < MOCK_PAGES.totalPages &&
                      handleFilterChange('page', page + 1)
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      </div>
    </Container>
  )
}

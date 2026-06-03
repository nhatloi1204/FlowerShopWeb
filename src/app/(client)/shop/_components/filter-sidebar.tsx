'use client'

import { useState, useEffect } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Slider } from '@/components/ui/slider'
import { Button } from '@/components/ui/button'
import { formatPrice } from '@/utils/format-price.util'

const MOCK_CATEGORIES = [
  {
    id: 1,
    name: 'Hoa Dịp Lễ',
    slug: 'hoa-dip-le',
    children: [
      { id: 11, name: 'Hoa Sinh Nhật', slug: 'hoa-sinh-nhat' },
      { id: 12, name: 'Hoa Valentine', slug: 'hoa-valentine' },
      { id: 13, name: 'Hoa Chúc Mừng 8/3', slug: 'hoa-chuc-mung-8-3' },
    ],
  },
  {
    id: 2,
    name: 'Cây Nội Thất',
    slug: 'cay-noi-that',
    children: [
      { id: 21, name: 'Cây Để Bàn', slug: 'cay-de-ban' },
      { id: 22, name: 'Cây Thủy Sinh', slug: 'cay-thuy-sinh' },
    ],
  },
]

const MOCK_TAGS = [
  'Rose',
  'Lily',
  'Orchid',
  'Fresh',
  'Trending',
  'Indoor',
  'Gift Box',
]

interface FilterSidebarProps {
  selectedCategoryId: string | null
  currentMaxPrice: number
  selectedTag: string | null
  onFilterChange: (key: string, value: string | number | null) => void
}

export default function FilterSidebar({
  selectedCategoryId,
  currentMaxPrice,
  selectedTag,
  onFilterChange,
}: FilterSidebarProps) {
  const MAX_SLIDER_LIMIT = 2000000
  const [localMaxPrice, setLocalMaxPrice] = useState<number>(
    currentMaxPrice || MAX_SLIDER_LIMIT,
  )

  useEffect(() => {
    setTimeout(() => {
      setLocalMaxPrice(currentMaxPrice || MAX_SLIDER_LIMIT)
    }, 0)
  }, [currentMaxPrice])

  const handleApplyPriceFilter = () => {
    onFilterChange('maxPrice', localMaxPrice)
  }

  return (
    <aside className='w-full md:w-64 flex-shrink-0 space-y-8'>
      <div>
        <h3 className='text-sm font-bold uppercase tracking-wider text-neutral-900 border-b pb-2 mb-3'>
          Categories
        </h3>
        <Accordion type='single' collapsible className='w-full'>
          {MOCK_CATEGORIES.map(cate => (
            <AccordionItem
              key={cate.id}
              value={`item-${cate.id}`}
              className='border-b-neutral-100'
            >
              <div className='flex items-center justify-between py-1'>
                <button
                  onClick={() =>
                    onFilterChange('categoryId', cate.id.toString())
                  }
                  className={`text-sm hover:text-primary transition-colors text-left flex-1 font-medium ${
                    selectedCategoryId === cate.id.toString()
                      ? 'text-primary font-bold'
                      : 'text-neutral-700'
                  }`}
                >
                  {cate.name}
                </button>
                <AccordionTrigger className='hover:no-underline py-0 px-2 border-l border-neutral-100' />
              </div>
              <AccordionContent className='pl-4 pt-1 pb-2 space-y-2'>
                {cate.children.map(child => (
                  <button
                    key={child.id}
                    onClick={() =>
                      onFilterChange('categoryId', child.id.toString())
                    }
                    className={`block text-xs hover:text-primary transition-colors w-full text-left ${
                      selectedCategoryId === child.id.toString()
                        ? 'text-primary font-semibold'
                        : 'text-neutral-500'
                    }`}
                  >
                    — {child.name}
                  </button>
                ))}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <div>
        <h3 className='text-sm font-bold uppercase tracking-wider text-neutral-900 border-b pb-2 mb-4'>
          Filter By Price
        </h3>
        <div className='space-y-5 px-1'>
          <Slider
            min={0}
            max={MAX_SLIDER_LIMIT}
            step={50000}
            value={[localMaxPrice]}
            onValueChange={val => setLocalMaxPrice(val[0])}
            className='text-primary cursor-pointer'
          />

          <div className='flex flex-col gap-3 text-xs text-neutral-500 font-medium'>
            <div className='text-neutral-700'>
              Giá tối đa:{' '}
              <span className='font-bold text-primary'>
                {formatPrice(localMaxPrice)}
              </span>
            </div>

            <Button
              size='sm'
              variant='default'
              className='w-full h-8 text-[11px] uppercase font-bold tracking-wider rounded-sm bg-neutral-900 hover:bg-primary transition-colors'
              onClick={handleApplyPriceFilter}
            >
              Lọc theo giá
            </Button>
          </div>
        </div>
      </div>

      <div>
        <h3 className='text-sm font-bold uppercase tracking-wider text-neutral-900 border-b pb-2 mb-4'>
          Product Tags
        </h3>
        <div className='flex flex-wrap gap-2'>
          {MOCK_TAGS.map(tag => {
            const isSelected = selectedTag === tag.toLowerCase()
            return (
              <Button
                key={tag}
                variant={isSelected ? 'default' : 'outline'}
                size='sm'
                className='h-8 text-xs rounded-sm font-normal px-3'
                onClick={() =>
                  onFilterChange('tag', isSelected ? null : tag.toLowerCase())
                }
              >
                {tag}
              </Button>
            )
          })}
        </div>
      </div>
    </aside>
  )
}

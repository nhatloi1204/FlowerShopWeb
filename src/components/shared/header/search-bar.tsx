'use client'

import { useCallback, useMemo, useState } from 'react'
import { Search, ChevronDown } from 'lucide-react'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { productService } from '@/services'
import { ProductCategoryOutput, ProductPagedList } from '@/validations'

interface SearchBarProps {
  className?: string
  categories: ProductCategoryOutput[]
  onSearch?: (results: ProductPagedList) => void
}

export default function SearchBar({
  className,
  categories = [],
  onSearch,
}: SearchBarProps) {
  const [searchValue, setSearchValue] = useState('')
  const [selectedCategory, setSelectedCategory] =
    useState<ProductCategoryOutput | null>(null)
  const [isSearching, setIsSearching] = useState(false)

  const selectedCategoryLabel = useMemo(
    () => selectedCategory?.name ?? 'All Categories',
    [selectedCategory],
  )

  const executeSearch = useCallback(
    async (searchText: string, categoryId?: number) => {
      setIsSearching(true)
      try {
        const results = await productService.getProducts({
          query: {
            search: searchText.trim() || undefined,
            categoryId,
          },
        })
        onSearch?.(results)
      } catch (error) {
        console.error('Failed to search products:', error)
      } finally {
        setIsSearching(false)
      }
    },
    [onSearch],
  )

  const handleCategorySelect = (category: ProductCategoryOutput | null) => {
    setSelectedCategory(category)
    void executeSearch(searchValue, category?.id)
  }

  return (
    <form
      className={cn(
        'flex items-center w-full h-11 md:h-12 border border-neutral-200 rounded-full bg-neutral-50 focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all pl-4 overflow-hidden',
        className,
      )}
      onSubmit={event => {
        event.preventDefault()
        void executeSearch(searchValue.trim(), selectedCategory?.id)
      }}
    >
      <DropdownMenu>
        <DropdownMenuTrigger className='text-xs font-bold text-neutral-500 flex items-center gap-1.5 whitespace-nowrap outline-none cursor-pointer hover:text-neutral-900 h-full select-none'>
          {selectedCategoryLabel}{' '}
          <ChevronDown className='w-3.5 h-3.5 text-neutral-400' />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className='rounded-xl mt-2 w-48 shadow-md 
        data-[state=open]:animate-flower-down
        data-[state=open]:max-h-80
        data-[state=closed]:animate-flower-up '
        >
          <DropdownMenuItem
            className='cursor-pointer'
            onClick={() => handleCategorySelect(null)}
          >
            All Categories
          </DropdownMenuItem>
          {categories.map(category => (
            <DropdownMenuItem
              key={category.id}
              className='cursor-pointer'
              onClick={() => handleCategorySelect(category)}
            >
              {category.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <span className='h-4 w-px bg-neutral-200 shrink-0 mx-3' />

      <div className='relative flex-1 h-full'>
        <Input
          type='text'
          placeholder='Search products...'
          className='border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 w-full h-full text-sm shadow-none px-1 text-neutral-800 placeholder:text-neutral-400'
          value={searchValue}
          onChange={event => setSearchValue(event.target.value)}
        />
      </div>

      <button
        type='submit'
        className='h-full px-5 md:px-6 flex items-center justify-center text-neutral-400 hover:text-primary transition-colors cursor-pointer shrink-0 disabled:cursor-not-allowed disabled:text-neutral-300'
        disabled={isSearching}
      >
        <Search className='w-4 h-4' />
      </button>
    </form>
  )
}

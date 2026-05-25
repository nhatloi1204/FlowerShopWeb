'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, User, Heart, ShoppingBag, ChevronDown } from 'lucide-react'
import { ROUTES } from '@/constants/routes.constant'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from '@/components/ui/sheet'
import SearchBar from './search-bar'
import NavItems from './nav-items'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ProductCategoryOutput } from '@/validations'
import { cn } from '@/lib/utils'

export default function MobileHeader({
  categories = [],
}: {
  categories?: ProductCategoryOutput[]
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [isCategoryOpen, setIsCategoryOpen] = useState(false)

  return (
    <div className='w-full flex flex-col bg-white'>
      <div className='w-full px-4 py-4 flex justify-between items-center border-b border-neutral-100'>
        <Link
          href={ROUTES.PUBLIC.HOME}
          className='text-2xl font-black tracking-tight text-neutral-950'
        >
          FLOWER<span className='text-primary'>SHOP</span>
        </Link>

        <div className='flex items-center gap-4 text-neutral-800'>
          <Link href={ROUTES.AUTH.PROFILE}>
            <User className='w-5 h-5' />
          </Link>
          <div className='relative'>
            <Heart className='w-5 h-5' />
          </div>
          <div className='relative mr-2'>
            <ShoppingBag className='w-5 h-5' />
          </div>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <button className='p-1.5 border border-neutral-400 rounded-xs cursor-pointer outline-none'>
                <Menu className='w-5 h-5 text-neutral-900' />
              </button>
            </SheetTrigger>

            <SheetContent
              side='left'
              className='w-77.5 p-0 bg-white overflow-y-auto flex flex-col h-full gap-0'
            >
              <SheetTitle className='sr-only'>Navigation Menu</SheetTitle>

              <div className='p-5 border-b border-neutral-100 bg-neutral-50/50'>
                <div>
                  <span className='tracking-wide font-medium text-xs text-neutral-700'>
                    FREE DELIVERY ON ALL ORDERS OVER $100
                  </span>
                </div>

                <div className='flex items-center gap-6 text-xs mt-3'>
                  <DropdownMenu>
                    <DropdownMenuTrigger className='flex items-center gap-1 cursor-pointer hover:text-white transition-colors outline-none font-medium'>
                      USD <ChevronDown className='w-3 h-3 text-neutral-500' />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end' className='rounded-lg'>
                      <DropdownMenuItem className='cursor-pointer'>
                        USD ($)
                      </DropdownMenuItem>
                      <DropdownMenuItem className='cursor-pointer'>
                        VND (đ)
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <DropdownMenu>
                    <DropdownMenuTrigger className='flex items-center gap-1 cursor-pointer hover:text-white transition-colors outline-none font-medium'>
                      ENGLISH{' '}
                      <ChevronDown className='w-3 h-3 text-neutral-500' />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end' className='rounded-lg'>
                      <DropdownMenuItem className='cursor-pointer'>
                        ENGLISH
                      </DropdownMenuItem>
                      <DropdownMenuItem className='cursor-pointer'>
                        VIETNAMESE
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              <div className='p-4 border-b border-neutral-100'>
                <SearchBar
                  className='rounded-md h-11'
                  categories={categories}
                />
              </div>

              <NavItems direction='col' onLinkClick={() => setIsOpen(false)} />

              <Link
                href={ROUTES.AUTH.PROFILE}
                onClick={() => setIsOpen(false)}
                className='w-full py-4 px-5 text-xs font-bold border-b border-neutral-100 uppercase tracking-wider block text-neutral-800 hover:text-primary'
              >
                My Account
              </Link>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className='relative w-full z-40'>
        <button
          onClick={() => setIsCategoryOpen(!isCategoryOpen)}
          className='w-full min-h-12 bg-primary py-3 px-4 text-white cursor-pointer active:bg-none transition-all outline-none text-xs font-black tracking-widest uppercase flex items-center justify-between gap-2 select-none'
        >
          <Menu className='w-4 h-4' /> CATEGORIES
        </button>

        <div
          className={cn(
            'absolute top-full left-0 right-0 bg-white border-b border-neutral-200 shadow-xl overflow-hidden transition-all duration-500 ease-in-out origin-top z-50',
            isCategoryOpen
              ? 'max-h-[50vh] opacity-100 translate-y-0'
              : 'max-h-0 opacity-0 translate-y-0 pointer-events-none',
          )}
        >
          <div className='px-4 py-2 grid gap-1 overflow-y-auto max-h-[calc(50vh-45px)]'>
            {categories.map(category => (
              <Link
                key={category.id}
                href={`${ROUTES.PUBLIC.SHOP}?categoryId=${category.id}`}
                onClick={() => setIsCategoryOpen(false)}
                className='w-full px-3 py-3 text-xs font-bold text-neutral-600 active:bg-neutral-50 active:text-primary rounded-md transition-colors border-b border-neutral-50 block'
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

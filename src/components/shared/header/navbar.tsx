import Link from 'next/link'
import { PhoneCall, Menu, ChevronDown } from 'lucide-react'
import NavItems from './nav-items'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ROUTES } from '@/constants/routes.constant'
import { ProductCategoryOutput } from '@/validations'

export default function Navbar({
  categories = [],
}: {
  categories?: ProductCategoryOutput[]
}) {
  return (
    <div className='hidden md:flex w-full bg-white text-neutral-900 border-b border-neutral-100 shrink-0'>
      <div className='max-w-7xl mx-auto w-full py-5  flex justify-between items-center'>
        <div className='flex items-center gap-10'>
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger className='flex items-center gap-2.5 font-extrabold text-xs tracking-widest cursor-pointer outline-none hover:text-primary transition-colors py-1 shrink-0 select-none'>
              <Menu className='w-4 h-4 text-neutral-700' /> CATEGORIES{' '}
              <ChevronDown className='w-3.5 h-3.5 text-neutral-400' />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align='start'
              className='w-56 rounded-xl mt-3 shadow-md data-[state=open]:animate-flower-down data-[state=open]:max-h-80 data-[state=closed]:animate-flower-up'
            >
              <DropdownMenuItem asChild>
                <Link
                  href={ROUTES.PUBLIC.SHOP}
                  className='cursor-pointer font-semibold text-xs py-2.5 text-neutral-700 hover:text-primary'
                >
                  All Categories
                </Link>
              </DropdownMenuItem>
              {categories.map(category => (
                <DropdownMenuItem key={category.id} asChild>
                  <Link
                    href={`${ROUTES.PUBLIC.SHOP}?categoryId=${category.id}`}
                    className='cursor-pointer font-semibold text-xs py-2.5 text-neutral-700 hover:text-primary'
                  >
                    {category.name}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <NavItems direction='row' />
        </div>

        <div className='flex items-center gap-3 text-sm shrink-0 select-none'>
          <div className='bg-primary/10 p-2 rounded-full text-primary'>
            <PhoneCall className='w-3.5 h-3.5' />
          </div>
          <div className='leading-tight'>
            <p className='text-[10px] text-neutral-400 font-bold tracking-wider uppercase'>
              Call Support: 24/7
            </p>
            <p className='font-black text-xs text-neutral-800 tracking-wide mt-0.5'>
              0123456789
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

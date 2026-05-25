import Link from 'next/link'
import { Heart, User, ShoppingBag, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import SearchBar from './search-bar'
import { ProductCategoryOutput } from '@/validations'

export default function MainHeader({
  categories,
}: {
  categories: ProductCategoryOutput[]
}) {
  const globalCategories = categories

  return (
    <div className='w-full py-6  flex justify-between items-center gap-8'>
      <Link
        href='/'
        className='text-2xl font-black tracking-wider flex items-center gap-1 shrink-0 select-none'
      >
        FLOWER<span className='text-primary'>SHOP</span>
      </Link>

      <SearchBar
        className='hidden md:flex max-w-xl'
        categories={globalCategories}
      />

      <div className='flex items-center gap-4 md:gap-6 shrink-0'>
        <Link
          href='/profile'
          className='text-neutral-700 hover:text-primary transition-colors p-1.5 rounded-full hover:bg-neutral-50'
        >
          <User className='w-5 h-5 md:w-5.5 md:h-5.5' />
        </Link>

        <Link
          href='/wishlist'
          className='relative text-neutral-700 hover:text-primary transition-colors p-1.5 rounded-full hover:bg-neutral-50'
        >
          <Heart className='w-5 h-5 md:w-5.5 md:h-5.5' />
          <span className='absolute top-0.5 right-0.5 bg-neutral-900 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold scale-90'>
            0
          </span>
        </Link>
        <Link
          href='/cart'
          className='relative text-neutral-700 hover:text-primary transition-colors p-1.5 rounded-full hover:bg-neutral-50'
        >
          <ShoppingBag className='w-5 h-5 md:w-5.5 md:h-5.5' />
          <span className='absolute top-0.5 right-0.5 bg-primary text-primary-foreground text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold scale-90'>
            2
          </span>
        </Link>
        <Button
          variant='ghost'
          size='icon'
          className='md:hidden text-neutral-700 rounded-full'
        >
          <Menu className='w-6 h-6' />
        </Button>
      </div>
    </div>
  )
}

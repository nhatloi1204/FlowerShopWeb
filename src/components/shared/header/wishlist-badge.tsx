'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Heart } from 'lucide-react'
import { useWishlistStore } from '@/stores/useWishlistStore'

export default function WishlistBadge() {
  const wishlistCount = useWishlistStore(state => state.wishlistItems.length)
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setHasMounted(true)
    }, 0)
  }, [])

  return (
    <Link
      href='/wishlist'
      className='relative text-neutral-700 hover:text-primary transition-colors p-1.5 rounded-full hover:bg-neutral-50 block'
    >
      <Heart className='w-5 h-5 md:w-5.5 md:h-5.5' />

      {hasMounted && wishlistCount > 0 && (
        <span className='absolute -top-1 -right-1 bg-primary text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-in zoom-in-50 duration-200'>
          {wishlistCount}
        </span>
      )}
    </Link>
  )
}

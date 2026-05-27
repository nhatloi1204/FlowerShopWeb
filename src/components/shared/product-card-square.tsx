'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingBag, Heart, Eye } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useCartStore } from '@/stores/useCartStore'
import { useWishlistStore } from '@/stores/useWishlistStore'

interface ProductCardSquareProps {
  product: {
    id: number
    name: string
    slug: string
    price: number
    originalPrice?: number
    imageUrl: string
    rating: number
  }
}

export default function ProductCardSquare({ product }: ProductCardSquareProps) {
  const addToCart = useCartStore(state => state.addToCart)
  const toggleWishlist = useWishlistStore(state => state.toggleWishlist)

  const checkIsInWishlist = useWishlistStore(state =>
    state.isInWishlist(product.id),
  )

  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setHasMounted(true)
    }, 0)
  }, [])

  const isInWishlist = hasMounted ? checkIsInWishlist : false

  const discountPercent = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100,
      )
    : 0

  return (
    <div className='w-full group bg-white flex flex-col items-center text-center'>
      <div className='relative w-full aspect-square bg-neutral-100 overflow-hidden rounded-sm'>
        {discountPercent > 0 && (
          <span className='absolute top-3 left-3 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-sm z-10'>
            -{discountPercent}%
          </span>
        )}

        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          sizes='(max-w-7xl) 25vw, 50vw'
          className='object-cover transition-transform duration-500 group-hover:scale-105'
        />

        <div className='absolute bottom-0 left-0 h-1/5 bg-white/95 border border-neutral-100 shadow-md flex items-center transition-all duration-300 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 z-10'>
          <button
            onClick={() =>
              addToCart({
                id: product.id,
                name: product.name,
                slug: product.slug,
                price: product.price,
                imageUrl: product.imageUrl,
              })
            }
            className='p-3 text-neutral-700 w-12.5 hover:text-primary transition-colors cursor-pointer  border-neutral-100'
            title='Add to Cart'
          >
            <ShoppingBag className='w-4 h-4' />
          </button>

          <button
            onClick={() =>
              toggleWishlist({
                id: product.id,
                name: product.name,
                slug: product.slug,
                price: product.price,
                imageUrl: product.imageUrl,
              })
            }
            className='p-3 transition-colors w-12.5 cursor-pointer  border-neutral-100'
            title={isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
          >
            <Heart
              className={cn(
                'w-4 h-4 transition-colors',
                isInWishlist
                  ? 'text-red-500 fill-red-500'
                  : 'text-neutral-700 hover:text-red-500',
              )}
            />
          </button>

          <Link
            href={`/products/${product.slug}`}
            className='p-3 text-neutral-700 w-12.5 hover:text-primary transition-colors'
            title='View Details'
          >
            <Eye className='w-4 h-4' />
          </Link>
        </div>
      </div>

      <div className='mt-4 flex flex-col items-center gap-1 w-full px-2'>
        <div className='flex items-center gap-0.5'>
          {[...Array(5)].map((_, i) => (
            <span key={i} className='text-amber-400 text-sm'>
              ★
            </span>
          ))}
        </div>
        <Link
          href={`/products/${product.slug}`}
          className='text-neutral-800 font-medium text-sm hover:text-primary transition-colors line-clamp-1'
        >
          {product.name}
        </Link>
        <div className='flex items-center gap-2 mt-0.5'>
          <span className='text-primary font-bold text-sm'>
            £{product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className='text-neutral-400 line-through text-xs'>
              £{product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

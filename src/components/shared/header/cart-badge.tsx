'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ShoppingBag, Trash2, X, Plus, Minus } from 'lucide-react'
import { useCartStore } from '@/stores/useCartStore'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet'
import { ScrollArea } from '@/components/ui/scroll-area'
import { formatPrice } from '@/utils/format-price.util'

export default function CartBadge() {
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    getCartCount,
  } = useCartStore()
  const cartCount = getCartCount()
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setHasMounted(true)
    })
  }, [])

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  )

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className='relative text-neutral-700 hover:text-primary transition-colors p-1.5 rounded-full hover:bg-neutral-50 block cursor-pointer border-none bg-transparent'>
          <ShoppingBag className='w-5 h-5 md:w-5.5 md:h-5.5' />
          {hasMounted && cartCount > 0 && (
            <span className='absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-in zoom-in-50 duration-200'>
              {cartCount}
            </span>
          )}
        </button>
      </SheetTrigger>

      <SheetContent
        side='right'
        className='w-full sm:max-w-md flex flex-col p-0 bg-white gap-0'
      >
        <SheetHeader className='px-6 py-5 border-b border-neutral-100 flex flex-row items-center justify-between space-y-0'>
          <SheetTitle className='text-lg font-bold tracking-wide flex items-center gap-2 uppercase'>
            Your Cart
            <span className='text-sm text-neutral-400 font-normal'>
              ({hasMounted ? cartCount : 0})
            </span>
          </SheetTitle>
        </SheetHeader>

        <div className='flex-1 min-h-0'>
          {!hasMounted || cartItems.length === 0 ? (
            <div className='h-full flex flex-col items-center justify-center text-center p-6 gap-3'>
              <div className='w-16 h-16 bg-neutral-50 rounded-full flex items-center justify-center text-neutral-400'>
                <ShoppingBag className='w-8 h-8' />
              </div>
              <p className='text-sm text-neutral-500 font-medium'>
                Your cart is empty
              </p>
              <SheetClose asChild>
                <Button
                  variant='outline'
                  size='sm'
                  className='mt-2 text-xs uppercase tracking-wider cursor-pointer'
                >
                  Shop Now
                </Button>
              </SheetClose>
            </div>
          ) : (
            <ScrollArea className='h-full px-6 py-4'>
              <div className='flex flex-col gap-5 divide-y divide-neutral-100'>
                {cartItems.map((item, index) => (
                  <div
                    key={item.id}
                    className={
                      index > 0
                        ? 'pt-5 flex gap-4 items-start'
                        : 'flex gap-4 items-start'
                    }
                  >
                    <div className='relative w-20 h-20 aspect-square bg-neutral-50 rounded-sm overflow-hidden shrink-0 border border-neutral-100'>
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        unoptimized
                        className='object-cover'
                        sizes='80px'
                      />
                    </div>

                    <div className='flex-1 flex flex-col justify-between min-h-20 gap-1'>
                      <div>
                        <h4 className='text-sm font-semibold text-neutral-800 line-clamp-1 hover:text-primary transition-colors'>
                          <Link href={`/products/${item.slug}`}>
                            {item.name}
                          </Link>
                        </h4>
                      </div>

                      <div className='flex items-center justify-between mt-auto w-full'>
                        <div className='flex items-center border border-neutral-200 rounded-sm bg-neutral-50/50'>
                          <button
                            onClick={() => decreaseQuantity(item.id)}
                            className='p-1.5 px-2 text-neutral-500 hover:text-primary transition-colors cursor-pointer bg-transparent border-none flex items-center justify-center'
                            title='Decrease quantity'
                          >
                            <Minus className='w-3 h-3' />
                          </button>

                          <span className='px-2 text-xs font-bold text-neutral-800 min-w-6 text-center select-none'>
                            {item.quantity}
                          </span>

                          <button
                            onClick={() => increaseQuantity(item.id)}
                            className='p-1.5 px-2 text-neutral-500 hover:text-primary transition-colors cursor-pointer bg-transparent border-none flex items-center justify-center'
                            title='Increase quantity'
                          >
                            <Plus className='w-3 h-3' />
                          </button>
                        </div>

                        <div className='flex items-center gap-3'>
                          <span className='text-sm font-bold text-primary'>
                            {formatPrice(item.price * item.quantity)}
                          </span>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className='text-neutral-400 hover:text-red-500 transition-colors p-1 cursor-pointer bg-transparent border-none'
                            title='Remove from cart'
                          >
                            <Trash2 className='w-4 h-4' />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </div>

        {hasMounted && cartItems.length > 0 && (
          <div className='p-6 border-t border-neutral-100 bg-neutral-50/50 flex flex-col gap-4 shrink-0'>
            <div className='flex items-center justify-between font-semibold text-neutral-800'>
              <span className='text-sm uppercase tracking-wider'>
                Subtotal:
              </span>
              <span className='text-lg font-bold text-primary'>
                {formatPrice(totalPrice)}
              </span>
            </div>
            <div className='grid grid-cols-2 gap-3 mt-1'>
              <SheetClose asChild>
                <Button
                  variant='outline'
                  asChild
                  className='w-full text-xs uppercase tracking-widest font-bold py-5 cursor-pointer'
                >
                  <Link href='/cart'>View Cart</Link>
                </Button>
              </SheetClose>
              <SheetClose asChild>
                <Button
                  asChild
                  className='w-full text-xs uppercase tracking-widest font-bold py-5 cursor-pointer'
                >
                  <Link href='/checkout'>Checkout</Link>
                </Button>
              </SheetClose>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}

'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel'
import { cn } from '@/lib/utils'

const mockBannerData = [
  {
    id: 1,
    title: 'TOP SALE',
    subtitle: 'Discount 20% Off For Lukani Members',
    imageUrl: '/images/banner-1.png',
    buttonText: 'DISCOVER NOW',
    link: '/products?sale=true',
  },
  {
    id: 2,
    title: 'FRESH FLOWER',
    subtitle: 'Beautiful bouquets for your beloved ones',
    imageUrl: '/images/banner-2.png',
    buttonText: 'SHOP NOW',
    link: '/products?categoryId=1',
  },
]

export default function HeroSlider() {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!api) return

    setCurrent(api.selectedScrollSnap())

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  return (
    <div className='w-full relative group'>
      <Carousel
        setApi={setApi}
        opts={{
          loop: true,
        }}
        className='w-full'
      >
        <CarouselContent className='ml-0'>
          {mockBannerData.map((banner, index) => {
            const isActive = index === current

            return (
              <CarouselItem
                key={banner.id}
                className='pl-0 relative w-full h-100 md:h-110 lg:h-130 bg-neutral-200 overflow-hidden'
                style={{
                  backgroundImage: `url(${banner.imageUrl})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div className='absolute inset-0 bg-black/5' />

                <div className='absolute inset-0 flex flex-col justify-center px-8 md:px-16 lg:px-24 max-w-4xl z-10'>
                  <h2
                    className={cn(
                      'text-2xl md:text-5xl lg:text-6xl font-black text-neutral-900 tracking-tight transition-all duration-700 ease-out transform delay-100',
                      isActive
                        ? 'opacity-100 translate-x-0'
                        : 'opacity-0 -translate-x-16',
                    )}
                  >
                    {banner.title}
                  </h2>

                  <p
                    className={cn(
                      'mt-3 text-sm md:text-lg text-neutral-700 font-medium transition-all duration-700 ease-out transform delay-300',
                      isActive
                        ? 'opacity-100 translate-x-0'
                        : 'opacity-0 -translate-x-12',
                    )}
                  >
                    {banner.subtitle}
                  </p>

                  <div
                    className={cn(
                      'mt-8 transition-all duration-700 ease-out transform delay-500',
                      isActive
                        ? 'opacity-100 translate-x-0'
                        : 'opacity-0 -translate-x-8',
                    )}
                  >
                    <Link
                      href={banner.link}
                      className='inline-block bg-primary hover:bg-primary/90 text-white font-bold text-xs md:text-sm tracking-wider uppercase py-3 px-8 rounded-full shadow-lg transition-transform active:scale-95'
                    >
                      {banner.buttonText}
                    </Link>
                  </div>
                </div>
              </CarouselItem>
            )
          })}
        </CarouselContent>

        <CarouselPrevious />

        <CarouselNext />
      </Carousel>
    </div>
  )
}

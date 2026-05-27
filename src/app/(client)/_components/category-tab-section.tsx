'use client'

import { useState } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import ProductCardSquare from '@/components/shared/product-card-square'
import { cn } from '@/lib/utils'

interface ProductItem {
  id: number
  name: string
  slug: string
  price: number
  originalPrice?: number
  imageUrl: string
  rating: number
}

interface TabData {
  id: number
  name: string
  products: ProductItem[]
}

interface CategoryTabSectionProps {
  parentName: string
  tabs: TabData[]
}

export default function CategoryTabSection({
  parentName,
  tabs,
}: CategoryTabSectionProps) {
  const [activeTab, setActiveTab] = useState<string>(
    tabs[0]?.id.toString() || '',
  )

  const currentTabProducts =
    tabs.find(t => t.id.toString() === activeTab)?.products || []

  return (
    <section className='w-full py-16 bg-white'>
      <h2 className='text-center text-3xl md:text-4xl font-serif text-neutral-900 tracking-wide'>
        {parentName}
      </h2>
      <div className='w-14 h-0.5 bg-neutral-800 mx-auto mt-3 mb-10' />

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className='w-full text-center'
      >
        <div className='flex justify-center'>
          <TabsList className='bg-transparent border-b border-neutral-200 flex justify-center w-fit rounded-none h-auto pb-0 mb-10 gap-8 p-0 data-[slot=tabs-list]:bg-transparent '>
            {tabs.map(tab => (
              <TabsTrigger
                key={tab.id}
                value={tab.id.toString()}
                className={cn(
                  'bg-transparent shadow-none! px-0 pb-3 pt-1 text-xs sm:text-sm tracking-widest uppercase font-semibold cursor-pointer transition-all rounded-none border-b-2 border-transparent text-neutral-400',
                  'data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:border-b-primary data-[state=active]:shadow-none!',
                  'hover:text-primary hover:border-b-primary hover:transition-all hover:duration-500',
                )}
              >
                {tab.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <TabsContent value={activeTab} className='mt-0 relative'>
          {currentTabProducts.length === 0 ? (
            <div className='h-75 flex items-center justify-center text-neutral-400'>
              No products found in this category.
            </div>
          ) : (
            <Carousel
              opts={{
                align: 'start',
                loop: true,
              }}
              className='w-full group/carousel'
            >
              <CarouselContent className='-ml-4 md:-ml-6'>
                {currentTabProducts.map(product => (
                  <CarouselItem
                    key={product.id}
                    className='pl-4 md:pl-6 basis-1/2 md:basis-1/3 lg:basis-1/4'
                  >
                    <ProductCardSquare product={product} />
                  </CarouselItem>
                ))}
              </CarouselContent>

              <CarouselPrevious className='absolute -left-3.5 top-1/2 -translate-y-1/2 opacity-0 group-hover/carousel:opacity-100 transition-opacity bg-white hover:bg-neutral-50 shadow-md border border-neutral-200 z-20 cursor-pointer' />
              <CarouselNext className='absolute -right-3.5 top-1/2 -translate-y-1/2 opacity-0 group-hover/carousel:opacity-100 transition-opacity bg-white hover:bg-neutral-50 shadow-md border border-neutral-200 z-20 cursor-pointer' />
            </Carousel>
          )}
        </TabsContent>
      </Tabs>
    </section>
  )
}

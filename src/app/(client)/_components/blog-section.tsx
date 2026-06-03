'use client'

import Link from 'next/link'
import Image from 'next/image'
import { MessageSquare } from 'lucide-react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel'
import { mockPosts } from '@/mocks/mock-blogs-data'
import Container from '@/components/container'

interface Post {
  id: number
  title: string
  slug: string
  author: string
  date: string
  excerpt: string
  imageUrl: string
  commentCount: number
}

export default function BlogSection() {
  const posts: Post[] = mockPosts

  return (
    <section className='w-full py-16 bg-primary-foreground flex flex-col items-center'>
      <div className='flex flex-col items-center text-center mb-12 gap-3 select-none'>
        <h2 className='text-3xl md:text-4xl font-serif text-neutral-800 tracking-wide'>
          Our Latest Posts
        </h2>
        <div className='w-16 h-0.5 bg-neutral-800' />
      </div>

      <Container>
        <div className='w-full max-w-7xl relative group/carousel'>
          {posts.length === 0 ? (
            <div className='h-40 flex items-center justify-center text-neutral-400 text-sm'>
              No posts yet.
            </div>
          ) : (
            <Carousel
              opts={{
                align: 'start',
                loop: true,
              }}
              className='w-full group/carousel'
            >
              <CarouselContent className='-ml-6 md:-ml-8'>
                {posts.map(post => (
                  <CarouselItem
                    key={post.id}
                    className='pl-6 md:pl-8 basis-full md:basis-1/3'
                  >
                    <article className='w-full flex flex-col gap-4 text-left'>
                      <Link
                        href={`/blog/${post.slug}`}
                        className='relative w-full aspect-16/10 bg-neutral-100 rounded-xs overflow-hidden block group'
                      >
                        <Image
                          src={post.imageUrl}
                          alt={post.title}
                          width={600}
                          height={375}
                          unoptimized
                          sizes='(max-w-7xl) 33vw, 100vw'
                          className='object-cover transition-transform duration-700 group-hover:scale-105'
                        />
                      </Link>

                      <div className='flex flex-col gap-2'>
                        <h3 className='text-lg font-bold text-neutral-800 line-clamp-1 hover:text-primary transition-colors mt-1'>
                          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                        </h3>

                        <p className='text-xs text-neutral-400 font-medium'>
                          By{' '}
                          <span className='text-primary hover:underline cursor-pointer'>
                            {post.author}
                          </span>{' '}
                          / {post.date}
                        </p>

                        <p className='text-sm text-neutral-500 leading-relaxed line-clamp-3 mt-1'>
                          {post.excerpt}
                        </p>
                      </div>

                      <div className='w-full pt-4 border-t border-neutral-100 flex items-center justify-between mt-1 text-sm text-neutral-700 font-medium'>
                        <Link
                          href={`/blog/${post.slug}`}
                          className='underline underline-offset-4 hover:text-primary transition-colors uppercase text-xs tracking-wider font-bold'
                        >
                          Continue Reading
                        </Link>

                        <div className='flex items-center gap-1.5 text-neutral-500 text-xs'>
                          <MessageSquare className='w-4 h-4' />
                          <span>{post.commentCount}</span>
                        </div>
                      </div>
                    </article>
                  </CarouselItem>
                ))}
              </CarouselContent>

              <CarouselPrevious className='absolute -left-3.5 top-1/2 -translate-y-1/2 opacity-0 group-hover/carousel:opacity-100 transition-opacity bg-white hover:bg-neutral-50 shadow-md border border-neutral-200 z-20 cursor-pointer' />
              <CarouselNext className='absolute -right-3.5 top-1/2 -translate-y-1/2 opacity-0 group-hover/carousel:opacity-100 transition-opacity bg-white hover:bg-neutral-50 shadow-md border border-neutral-200 z-20 cursor-pointer' />
            </Carousel>
          )}
        </div>
      </Container>
    </section>
  )
}

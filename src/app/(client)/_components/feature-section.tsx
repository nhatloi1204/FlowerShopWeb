import Link from 'next/link'
import Container from '@/components/container'

const FEATURE_BANNERS = [
  {
    id: 1,
    title: 'Big Sale Products',
    subtitle: 'Plants For Interior',
    imageUrl: '/images/sub-banner-1.png',
    link: '/products?badge=sale',
    buttonText: 'SHOP NOW',
  },
  {
    id: 2,
    title: 'Top Products',
    subtitle: 'Plants For Healthy',
    imageUrl: '/images/sub-banner-2.png',
    link: '/products?sort=best-selling',
    buttonText: 'SHOP NOW',
  },
]

export default function FeatureSection() {
  return (
    <Container className='mt-12 md:mt-16'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8'>
        {FEATURE_BANNERS.map(banner => (
          <Link
            key={banner.id}
            href={banner.link}
            className='relative w-full h-60 sm:h-70 lg:h-72 bg-neutral-100 block overflow-hidden group rounded-sm shadow-sm'
            style={{
              backgroundImage: `url(${banner.imageUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className='absolute inset-0 bg-black/5 transition-transform duration-700 ease-out group-hover:scale-105' />

            <div className='absolute inset-y-0 left-0 flex flex-col justify-center px-6 sm:px-10 lg:px-12 z-10 pointer-events-none'>
              <span className='text-xs sm:text-sm font-semibold text-neutral-500 tracking-wider uppercase'>
                {banner.title}
              </span>

              <h3 className='text-xl sm:text-2xl lg:text-3xl font-black text-neutral-900 mt-2 max-w-50 sm:max-w-65 leading-tight font-serif'>
                {banner.subtitle}
              </h3>

              <div className='mt-6 sm:mt-8'>
                <span className='text-xs font-black tracking-widest uppercase text-neutral-900 border-b-2 border-neutral-900 pb-1 transition-colors duration-300 group-hover:text-primary group-hover:border-primary'>
                  {banner.buttonText}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Container>
  )
}

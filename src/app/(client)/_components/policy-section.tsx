import Image from 'next/image'
import Container from '@/components/container'

const POLICIES = [
  {
    id: 1,
    title: 'Free Delivery',
    description: 'Free shipping around the world for all orders over $120',
    iconUrl: '/icons/free-delivery.svg',
  },
  {
    id: 2,
    title: 'Safe Payment',
    description: "With our payment gateway, don't worry about your information",
    iconUrl: '/icons/safe-payment.svg',
  },
  {
    id: 3,
    title: 'Friendly Services',
    description: 'You have 30-day return guarantee for every single order',
    iconUrl: '/icons/friendly-service.svg',
  },
]

export default function PolicySection() {
  return (
    <Container className='py-8 border-b border-neutral-100'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-center'>
        {POLICIES.map((policy, index) => (
          <div
            key={policy.id}
            className={`flex items-start gap-4 py-4 ${
              index !== POLICIES.length - 1
                ? 'lg:border-r lg:border-neutral-200 lg:pr-8'
                : ''
            }`}
          >
            <div className='relative w-12 h-12 flex-shrink-0 bg-neutral-50 flex items-center justify-center rounded-sm'>
              <Image
                src={policy.iconUrl}
                alt={policy.title}
                width={48}
                height={32}
                className='object-contain text-neutral-700 bg-transparent'
              />
            </div>

            <div className='flex flex-col gap-1'>
              <h4 className='text-sm font-bold text-neutral-900 uppercase tracking-wider font-serif'>
                {policy.title}
              </h4>
              <p className='text-xs sm:text-sm text-neutral-500 leading-relaxed max-w-70'>
                {policy.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Container>
  )
}

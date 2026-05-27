import Link from 'next/link'
import Container from '@/components/container'
import NewsletterForm from './newsletter-form'
import ScrollToTopButton from './scroll-to-top-button'

export default function Footer() {
  return (
    <footer className='w-full bg-white text-neutral-800 border-t border-neutral-100  relative md:h-[90vh]'>
      <div className='w-full md:h-1/2 py-16 h- border-b border-neutral-100 flex flex-col items-center text-center px-4 md:gap-6'>
        <h3 className='text-3xl md:text-4xl font-serif text-neutral-800 tracking-wide mb-3 select-none'>
          Get <span className='text-primary font-semibold'>20% Off</span> Your
          Next Order
        </h3>
        <div className='w-16 h-0.5 bg-neutral-800 mb-8' />

        <NewsletterForm />
      </div>

      <div className='w-full md:h-1/2 py-16 bg-white'>
        <Container>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-10 md:gap-6 text-left'>
            <div className='flex flex-col gap-4'>
              <h4 className='text-xs font-bold uppercase tracking-widest text-neutral-900 border-b border-neutral-100 pb-2 w-max pr-4'>
                Opening Time
              </h4>
              <ul className='flex flex-col gap-2.5 text-sm text-neutral-500 font-medium'>
                <li>Mon - Fri: 8AM - 10PM</li>
                <li>Sat: 9AM - 8PM</li>
                <li>Suns: 14PM - 18PM</li>
                <li className='text-xs font-bold text-neutral-700 uppercase tracking-wider mt-2 select-none'>
                  We Work All The Holidays
                </li>
              </ul>
            </div>

            <div className='flex flex-col gap-4'>
              <h4 className='text-xs font-bold uppercase tracking-widest text-neutral-900 border-b border-neutral-100 pb-2 w-max pr-4'>
                Information
              </h4>
              <ul className='flex flex-col gap-2.5 text-sm text-neutral-500 font-medium'>
                <li>
                  <Link
                    href='/about'
                    className='hover:text-primary transition-colors'
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href='/checkout'
                    className='hover:text-primary transition-colors'
                  >
                    Checkout
                  </Link>
                </li>
                <li>
                  <Link
                    href='/contact'
                    className='hover:text-primary transition-colors'
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href='/wishlist'
                    className='hover:text-primary transition-colors'
                  >
                    Wishlist
                  </Link>
                </li>
              </ul>
            </div>

            <div className='flex flex-col items-center text-center justify-center gap-6 sm:col-span-2 md:col-span-2 order-first md:order-0 pb-6 md:pb-0'>
              <Link
                href='/'
                className='text-3xl font-black tracking-widest text-neutral-900 font-sans uppercase'
              >
                FLOWER
                <span className='text-primary'>SHOP</span>
              </Link>

              <div className='flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs font-semibold text-neutral-500'>
                <span className='hover:text-primary cursor-pointer'>
                  Payment
                </span>
                <span className='hover:text-primary cursor-pointer'>
                  Affiliates
                </span>
                <span className='hover:text-primary cursor-pointer'>
                  Contact
                </span>
                <span className='hover:text-primary cursor-pointer'>
                  Internet
                </span>
              </div>

              <div className='flex items-center gap-3'>
                <a
                  href='#'
                  className='w-8 h-8 rounded-full bg-neutral-50 hover:bg-primary hover:text-white text-neutral-600 flex items-center justify-center transition-colors shadow-xs border border-neutral-100'
                >
                  <svg className='w-4 h-4 fill-current' viewBox='0 0 24 24'>
                    <path d='M9 8H7v3h2v9h3v-9h2.72l.42-3H12V6.5a1 1 0 0 1 1-1h1.94V2.06c-.3-.04-1.3-.14-2.48-.14C10.02 1.92 8.5 3.39 8.5 6V8H7v3h1.5v9h3v-9H14l.5-3H11.5V6.5a.5.5 0 0 1 .5-.5h2V3h-2C9.9 3 9 4.1 9 6.5V8z' />
                  </svg>
                </a>
                <a
                  href='#'
                  className='w-8 h-8 rounded-full bg-neutral-50 hover:bg-primary hover:text-white text-neutral-600 flex items-center justify-center transition-colors shadow-xs border border-neutral-100'
                >
                  <svg className='w-4 h-4 fill-current' viewBox='0 0 24 24'>
                    <path d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z' />
                  </svg>
                </a>
                <a
                  href='#'
                  className='w-8 h-8 rounded-full bg-neutral-50 hover:bg-primary hover:text-white text-neutral-600 flex items-center justify-center transition-colors shadow-xs border border-neutral-100'
                >
                  <svg className='w-4 h-4 fill-current' viewBox='0 0 24 24'>
                    <path
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.0.069-.0 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z'
                    />
                  </svg>
                </a>
              </div>
            </div>

            <div className='flex flex-col gap-4'>
              <h4 className='text-xs font-bold uppercase tracking-widest text-neutral-900 border-b border-neutral-100 pb-2 w-max pr-4'>
                My Account
              </h4>
              <ul className='flex flex-col gap-2.5 text-sm text-neutral-500 font-medium'>
                <li>
                  <Link
                    href='/profile'
                    className='hover:text-primary transition-colors'
                  >
                    My Account
                  </Link>
                </li>
                <li>
                  <Link
                    href='/contact'
                    className='hover:text-primary transition-colors'
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href='/cart'
                    className='hover:text-primary transition-colors'
                  >
                    Shopping cart
                  </Link>
                </li>
                <li>
                  <Link
                    href='/checkout'
                    className='hover:text-primary transition-colors'
                  >
                    Checkout
                  </Link>
                </li>
                <li>
                  <Link
                    href='/shop'
                    className='hover:text-primary transition-colors'
                  >
                    Shop
                  </Link>
                </li>
                <li>
                  <Link
                    href='/orders/history'
                    className='hover:text-primary transition-colors'
                  >
                    Order History
                  </Link>
                </li>
              </ul>
            </div>

            <div className='flex flex-col gap-4'>
              <h4 className='text-xs font-bold uppercase tracking-widest text-neutral-900 border-b border-neutral-100 pb-2 w-max pr-4'>
                Customer Service
              </h4>
              <ul className='flex flex-col gap-2.5 text-sm text-neutral-500 font-medium'>
                <li>
                  <Link
                    href='/contact'
                    className='hover:text-primary transition-colors'
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    href='/terms'
                    className='hover:text-primary transition-colors'
                  >
                    Terms of use
                  </Link>
                </li>
                <li>
                  <Link
                    href='/privacy'
                    className='hover:text-primary transition-colors'
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href='/sitemap'
                    className='hover:text-primary transition-colors'
                  >
                    Site Map
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </div>

      <ScrollToTopButton />
    </footer>
  )
}

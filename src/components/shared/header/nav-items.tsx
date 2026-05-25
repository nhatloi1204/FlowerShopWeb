'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { ROUTES, PUBLIC_TITLES } from '@/constants/routes.constant'

interface NavItemsProps {
  direction?: 'row' | 'col'
  onLinkClick?: () => void
}

export default function NavItems({
  direction = 'row',
  onLinkClick,
}: NavItemsProps) {
  const pathname = usePathname()
  const navLinks = Object.values(ROUTES.PUBLIC)

  return (
    <nav
      className={cn(
        'flex',
        direction === 'row'
          ? 'items-center gap-8 border-l border-neutral-200 pl-10'
          : 'flex-col w-full',
      )}
    >
      {navLinks.map(href => {
        const isActive = pathname === href
        const label = PUBLIC_TITLES[href as keyof typeof PUBLIC_TITLES] || ''

        return (
          <Link
            key={href}
            href={href}
            onClick={onLinkClick}
            className={cn(
              'text-xs font-extrabold tracking-widest uppercase transition-colors hover:text-primary relative',
              direction === 'row'
                ? 'py-1.5 whitespace-nowrap'
                : 'w-full py-4 px-5 border-b border-neutral-100 block active:bg-neutral-50',
              isActive
                ? 'text-primary' + (direction === 'col' ? ' bg-primary/5' : '')
                : 'text-neutral-700',
            )}
          >
            {label}
            {isActive && direction === 'row' && (
              <span className='absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full animate-fadeIn' />
            )}
          </Link>
        )
      })}
    </nav>
  )
}

'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import {
  ADMIN_TITLES,
  PUBLIC_TITLES,
  ROUTES,
} from '@/constants/routes.constant'

const ALL_ROUTE_LABELS: Record<string, string> = {
  ...ADMIN_TITLES,
  ...PUBLIC_TITLES,
}

interface DynamicBreadcrumbProps {
  customTitle?: string
}

export function DynamicBreadcrumb({ customTitle }: DynamicBreadcrumbProps) {
  const pathname = usePathname()
  const isAdminRoute = pathname.startsWith('/admin')

  const rawSegments = pathname.split('/').filter(Boolean)

  let segments = isAdminRoute
    ? rawSegments.filter(seg => seg !== 'admin')
    : rawSegments

  let hasAdminIdParam = false
  if (isAdminRoute) {
    const lastSegment = segments[segments.length - 1]
    if (lastSegment && !isNaN(Number(lastSegment))) {
      hasAdminIdParam = true

      segments = segments.slice(0, -1)
    }
  }

  if (segments.length === 0) return null

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className='uppercase tracking-wider text-xs font-semibold'>
          {isAdminRoute ? (
            segments.length === 0 ? (
              <BreadcrumbPage>Admin</BreadcrumbPage>
            ) : (
              <BreadcrumbLink asChild>
                <Link href={ROUTES.ADMIN.DASHBOARD}>Admin</Link>
              </BreadcrumbLink>
            )
          ) : (
            <BreadcrumbLink asChild>
              <Link href='/'>Home</Link>
            </BreadcrumbLink>
          )}
        </BreadcrumbItem>

        {segments.length > 0 && <BreadcrumbSeparator />}

        {segments.map((_, index) => {
          const isActualLast = index === segments.length - 1

          const accumulatedPath = isAdminRoute
            ? '/admin/' + segments.slice(0, index + 1).join('/')
            : '/' + segments.slice(0, index + 1).join('/')

          let displayTitle = ALL_ROUTE_LABELS[accumulatedPath]

          if (!isAdminRoute && isActualLast && customTitle) {
            displayTitle = customTitle
          }

          if (!displayTitle) {
            const currentSegment = segments[index]
            displayTitle =
              currentSegment.charAt(0).toUpperCase() +
              currentSegment.slice(1).replace(/-/g, ' ')
          }

          const shouldBeStaticPage =
            isActualLast ||
            (isAdminRoute && hasAdminIdParam && index === segments.length - 1)

          return (
            <React.Fragment key={accumulatedPath}>
              <BreadcrumbItem className='uppercase tracking-wider text-xs font-semibold'>
                {shouldBeStaticPage ? (
                  <BreadcrumbPage>{displayTitle}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={accumulatedPath}>{displayTitle}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isActualLast && <BreadcrumbSeparator />}
            </React.Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

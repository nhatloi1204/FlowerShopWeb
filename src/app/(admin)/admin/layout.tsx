'use client'

import * as React from 'react'
import { usePathname } from 'next/navigation'

import { AppSidebar } from '@/components/app-sidebar'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { ADMIN_TITLES, ROUTES } from '@/constants/routes.constant'
import Link from 'next/link'

const getAdminPageTitle = (currentPathname: string): string => {
  const matchedKey = Object.keys(ADMIN_TITLES)
    .sort((a, b) => b.length - a.length)
    .find(key => currentPathname.startsWith(key))

  return matchedKey ? ADMIN_TITLES[matchedKey] : 'Admin'
}

const getParentRouteInfo = (
  currentPathname: string,
  currentPageTitle: string,
) => {
  const segments = currentPathname.split('/').filter(Boolean)

  if (segments.length <= 2) return null

  for (let i = segments.length - 1; i > 0; i--) {
    const potentialParentPath = '/' + segments.slice(0, i).join('/')

    if (potentialParentPath === ROUTES.ADMIN.DASHBOARD) continue

    if (
      ADMIN_TITLES[potentialParentPath] &&
      ADMIN_TITLES[potentialParentPath] !== currentPageTitle
    ) {
      return {
        title: ADMIN_TITLES[potentialParentPath],
        href: potentialParentPath,
      }
    }
  }

  return null
}

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()
  const pageTitle = getAdminPageTitle(pathname)
  const isDashboard = pathname === ROUTES.ADMIN.DASHBOARD

  const parentRoute = getParentRouteInfo(pathname, pageTitle)

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className='flex h-16 shrink-0 items-center justify-between gap-2 border-b bg-background'>
          <div className='flex items-center gap-2 px-3'>
            <SidebarTrigger />
            <Separator
              orientation='vertical'
              className='mr-2 data-vertical:h-4 data-vertical:self-auto'
            />
            <Breadcrumb>
              <BreadcrumbList>
                {isDashboard ? (
                  <BreadcrumbItem className='uppercase'>
                    <BreadcrumbPage>{pageTitle}</BreadcrumbPage>
                  </BreadcrumbItem>
                ) : (
                  <>
                    <BreadcrumbItem className='hidden md:block uppercase'>
                      <BreadcrumbLink asChild>
                        <Link href={ROUTES.ADMIN.DASHBOARD}>ADMIN</Link>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className='hidden md:block' />

                    {parentRoute && (
                      <>
                        <BreadcrumbItem className='uppercase'>
                          <BreadcrumbLink asChild>
                            <Link href={parentRoute.href}>
                              {parentRoute.title}
                            </Link>
                          </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                      </>
                    )}

                    <BreadcrumbItem className='uppercase'>
                      <BreadcrumbPage>{pageTitle}</BreadcrumbPage>
                    </BreadcrumbItem>
                  </>
                )}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className='flex flex-1 flex-col gap-4 p-4'>{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}

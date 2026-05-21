'use client'

import * as React from 'react'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from '@/components/ui/sidebar'
import { ROUTES } from '@/constants/routes.constant'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const adminNav = [
  {
    title: 'Overview',
    items: [{ title: 'Dashboard', url: ROUTES.ADMIN.DASHBOARD }],
  },
  {
    title: 'Store Management',
    items: [
      { title: 'Products', url: ROUTES.ADMIN.PRODUCTS.INDEX },
      { title: 'Categories', url: ROUTES.ADMIN.CATEGORIES },
      { title: 'Tags', url: ROUTES.ADMIN.TAGS },
    ],
  },
  {
    title: 'Sales',
    items: [
      { title: 'Orders', url: ROUTES.ADMIN.ORDERS },
      { title: 'Customers', url: ROUTES.ADMIN.CUSTOMERS },
    ],
  },
  {
    title: 'System Settings',
    items: [
      { title: 'Users', url: ROUTES.ADMIN.USERS },
      { title: 'Roles & Permissions', url: ROUTES.ADMIN.ROLES },
    ],
  },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()

  const isActive = (url: string) => {
    if (url === ROUTES.ADMIN.DASHBOARD) {
      return pathname === url
    }

    return pathname?.startsWith(url)
  }

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size='lg' asChild>
              <Link href={ROUTES.ADMIN.DASHBOARD}>
                <div className='flex flex-col gap-0.5 leading-none'>
                  <span className='font-medium'>Flower Shop</span>
                  <span className='text-xs text-sidebar-foreground/70'>
                    Admin Panel
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {adminNav.map(group => (
              <SidebarMenuItem key={group.title}>
                <SidebarMenuButton asChild className='font-medium'>
                  <span>{group.title}</span>
                </SidebarMenuButton>
                <SidebarMenuSub>
                  {group.items.map(item => (
                    <SidebarMenuSubItem key={item.title}>
                      <SidebarMenuSubButton
                        asChild
                        isActive={isActive(item.url)}
                      >
                        <Link href={item.url}>{item.title}</Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}

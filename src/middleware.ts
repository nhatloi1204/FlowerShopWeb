import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { ROUTES } from '@/constants/routes.constant'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const PUBLIC_ROUTES: string[] = [ROUTES.HOME, ROUTES.PUBLIC.PRODUCTS] // Routes that can be accessed without authentication, including public pages and auth pages (login/signup)

  const GUEST_ROUTES: string[] = [ROUTES.AUTH.LOGIN, ROUTES.AUTH.SIGNUP] // Routes that should only be accessed by unauthenticated users (e.g., login, signup)

  const AUTH_ROUTES: string[] = [] // Routes that need to sign in to access, but no role requirement

  const token = request.cookies.get('auth_token')?.value
  const userRole = request.cookies.get('user_role')?.value // 'Admin', 'Customer', or undefined
  const isAuthenticated = !!token

  const isPublicRoute = PUBLIC_ROUTES.some(
    route => pathname === route || pathname.startsWith(`${route}/`),
  )
  const isGuestRoute = (GUEST_ROUTES as string[]).includes(pathname)
  const isAuthRoute = (AUTH_ROUTES as string[]).includes(pathname)
  const isAdminRoute = pathname.startsWith(ROUTES.ADMIN.DASHBOARD)

  //----------- CASE 1: ADMIN ROUTES -----------
  // If user tries to access admin routes, check if they are authenticated and have the 'Admin' role. If not, redirect them to the login page
  if (isAdminRoute) {
    if (!isAuthenticated || userRole !== 'Admin') {
      return NextResponse.redirect(new URL(ROUTES.AUTH.LOGIN, request.url))
    }
    return NextResponse.next()
  }

  //----------- CASE 2: AUTHENTICATED USERS -----------
  // If user is authenticated but tries to access guest routes (login/signup), redirect them to the appropriate page based on their role
  if (isAuthenticated) {
    if (isGuestRoute) {
      const redirectUrl =
        userRole === 'Admin' ? ROUTES.ADMIN.DASHBOARD : ROUTES.HOME
      return NextResponse.redirect(new URL(redirectUrl, request.url))
    }
    return NextResponse.next()
  }

  // ---------- CASE 3: UNAUTHENTICATED USERS -----------
  // If user is not authenticated and tries to access protected routes (auth routes or admin routes), redirect them to login page
  if (!isAuthenticated) {
    if (isAuthRoute || (!isPublicRoute && !isGuestRoute)) {
      return NextResponse.redirect(new URL(ROUTES.AUTH.LOGIN, request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.[\\w]+$).*)',
  ],
}

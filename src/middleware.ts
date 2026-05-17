import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const AUTH_PAGES = ['/login', '/register'];
  const PUBLIC_PAGES = ['/', '/products', '/blog', '/contact'];


  const token = request.cookies.get('auth_token')?.value;
  const userRole = request.cookies.get('user_role')?.value; // 'Admin', 'Customer', or undefined

  const isAdminRoute = pathname.startsWith('/admin');
  const isAuthPage = AUTH_PAGES.includes(pathname);
  const isPublicPage = PUBLIC_PAGES.some(page => pathname.startsWith(`${page}/`) || pathname === page);

  // Case 1: Try to access admin page without token or non-admin role
  if (isAdminRoute) {
    if (!token || userRole !== 'Admin') {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    return NextResponse.next();
  }

  // Case 2: Try to access login/register page while already authenticated
  if (isAuthPage && token) {
    if (userRole === 'Admin') {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (!isPublicPage && !isAuthPage && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|\\.[\\w]+$).*)',
  ]
};
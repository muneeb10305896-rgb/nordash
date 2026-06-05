import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Protect admin pages
  if (pathname.startsWith('/admin')) {
    // Check for admin token in cookies
    const token = request.cookies.get('admin_token')?.value;
    const adminToken = process.env.ADMIN_TOKEN || process.env.NEXT_PUBLIC_ADMIN_TOKEN;

    // Allow access to login, forgot-password, and reset-password pages without token
    if (
      pathname === '/admin' ||
      pathname === '/admin/forgot-password' ||
      pathname.startsWith('/admin/reset-password')
    ) {
      return NextResponse.next();
    }

    // For other admin pages, check token
    if (pathname.startsWith('/admin') && pathname !== '/admin') {
      if (!token || token !== adminToken) {
        return NextResponse.redirect(new URL('/admin', request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};

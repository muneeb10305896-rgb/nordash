import { NextResponse } from 'next/server';

export function proxy(request) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/admin')) {
    const token = request.cookies.get('admin_token')?.value;
    const adminToken = process.env.ADMIN_TOKEN || process.env.NEXT_PUBLIC_ADMIN_TOKEN;

    if (
      pathname === '/admin' ||
      pathname === '/admin/forgot-password' ||
      pathname.startsWith('/admin/reset-password')
    ) {
      return NextResponse.next();
    }

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

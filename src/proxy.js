import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

/**
 * Inline JWT verification for Edge middleware.
 * Uses Web Crypto API (no Node.js dependency needed).
 */
async function verifyEdgeToken(token) {
  if (!token) return null;
  try {
    const secret = process.env.JWT_SECRET || process.env.ADMIN_TOKEN;
    if (!secret) return null;
    const key = new TextEncoder().encode(secret);
    const { payload } = await jwtVerify(token, key);
    return payload;
  } catch {
    return null;
  }
}

export async function proxy(request) {
  const { pathname } = request.nextUrl;

  // Public admin pages — no auth needed
  if (
    pathname === '/admin' ||
    pathname === '/admin/forgot-password' ||
    pathname.startsWith('/admin/reset-password')
  ) {
    return NextResponse.next();
  }

  // Protected admin pages — require valid signed JWT
  if (pathname.startsWith('/admin')) {
    const token = request.cookies.get('admin_token')?.value;
    const payload = await verifyEdgeToken(token);
    if (!payload?.email) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};

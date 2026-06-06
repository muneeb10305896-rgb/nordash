import { NextResponse } from 'next/server';
import { verifyCredentials } from '@/lib/adminAuth';
import { checkRateLimit, getClientIP } from '@/lib/rateLimit';
import { createToken } from '@/lib/jwt';

export async function POST(request) {
  try {
    // Rate limit: 5 attempts per minute per IP
    const ip = getClientIP(request);
    const rateLimit = checkRateLimit('login', ip, 5, 60000);
    if (!rateLimit.allowed) {
      return Response.json({ error: `Too many attempts. Try again in ${rateLimit.resetIn}s` }, { status: 429 });
    }

    const { email, password } = await request.json();

    if (!email || !password) {
      return Response.json({ error: 'Email and password required' }, { status: 400 });
    }

    const result = await verifyCredentials(email, password);

    if (!result.success) {
      return Response.json({ error: result.error }, { status: 401 });
    }

    // Create a signed JWT session token — NOT the raw ADMIN_TOKEN
    const token = await createToken({
      email: result.admin.email,
      role: result.admin.role || 'admin',
    });

    const isSecure = process.env.NODE_ENV === 'production';
    const response = NextResponse.json({ success: true, email: result.admin.email, name: result.admin.name });
    // httpOnly + sameSite prevents JavaScript access and CSRF
    response.cookies.set({ name: 'admin_token', value: token, httpOnly: true, sameSite: 'lax', maxAge: 86400, path: '/', secure: isSecure });
    return response;

  } catch (error) {
    console.error('Login error:', error);
    return Response.json({ error: 'Login failed' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { verifyCredentials } from '@/lib/adminAuth';
import { checkRateLimit, getClientIP } from '@/lib/rateLimit';

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

    const token = process.env.ADMIN_TOKEN;
    if (!token) {
      console.error('Login error: ADMIN_TOKEN is not set');
      return Response.json({ error: 'Server is misconfigured' }, { status: 500 });
    }
    const isSecure = process.env.NODE_ENV === 'production';
    const response = NextResponse.json({ success: true, email: result.admin.email, name: result.admin.name });
    response.cookies.set({ name: 'admin_token', value: token, httpOnly: true, sameSite: 'lax', maxAge: 86400, path: '/', secure: isSecure });
    response.cookies.set({ name: 'admin_email', value: result.admin.email, sameSite: 'lax', maxAge: 86400, path: '/', secure: isSecure });
    return response;

  } catch (error) {
    console.error('Login error:', error);
    return Response.json({ error: 'Login failed' }, { status: 500 });
  }
}

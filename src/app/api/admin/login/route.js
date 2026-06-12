import { NextResponse } from 'next/server';
import { verifyCredentials } from '@/lib/adminAuth';
import { checkRateLimit, getClientIP } from '@/lib/rateLimit';
import { createToken } from '@/lib/jwt';
import dbConnect from '@/lib/mongodb';
import AdminUser from '@/models/AdminUser';

// In-memory account lockout store (resets on Vercel cold start; upgrade to DB for production)
const lockoutStore = new Map();

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

    if (email.length > 200 || password.length > 200) {
      return Response.json({ error: 'Invalid input' }, { status: 400 });
    }

    // Account-level lockout: 10 failed attempts = 15 min lock
    const normalizedEmail = email.toLowerCase().trim();
    const lockoutKey = `lockout:${normalizedEmail}`;
    const lockout = lockoutStore.get(lockoutKey);
    if (lockout && lockout.count >= 10 && Date.now() < lockout.until) {
      const remaining = Math.ceil((lockout.until - Date.now()) / 1000);
      return Response.json({ error: `Account temporarily locked. Try again in ${remaining}s.` }, { status: 429 });
    }
    // Reset lockout if time expired
    if (lockout && Date.now() >= lockout.until) {
      lockoutStore.delete(lockoutKey);
    }

    const result = await verifyCredentials(email, password);

    if (!result.success) {
      // Track failed attempt
      const current = lockoutStore.get(lockoutKey) || { count: 0, until: 0 };
      current.count++;
      if (current.count >= 10) {
        current.until = Date.now() + 15 * 60 * 1000; // 15 min
      }
      lockoutStore.set(lockoutKey, current);
      return Response.json({ error: result.error }, { status: 401 });
    }

    // Success — clear lockout
    lockoutStore.delete(lockoutKey);

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

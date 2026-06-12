import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/jwt';
import { checkRateLimit, getClientIP } from '@/lib/rateLimit';

export async function GET(request) {
  // Light rate limit on session checks — 30/min per IP
  const ip = getClientIP(request);
  const rateLimit = checkRateLimit('session', ip, 30, 60000);
  if (!rateLimit.allowed) {
    return Response.json({ error: 'Rate limit exceeded' }, { status: 429 });
  }

  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token')?.value;

  // Verify the JWT signature — rejects forged/expired tokens
  const payload = await verifyToken(token);
  const headers = { 'Cache-Control': 'no-store' };

  if (!payload?.email) {
    return Response.json({ authenticated: false }, { status: 401, headers });
  }

  return Response.json({
    authenticated: true,
    email: payload.email,
    role: payload.role || 'admin',
  }, { headers });
}

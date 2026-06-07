import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/jwt';

export async function GET() {
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

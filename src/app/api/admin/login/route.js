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

    return Response.json({
      success: true,
      message: 'Login successful',
      email: result.admin.email,
      name: result.admin.name,
      token: process.env.ADMIN_TOKEN || process.env.NEXT_PUBLIC_ADMIN_TOKEN,
    });

  } catch (error) {
    console.error('Login error:', error);
    return Response.json({ error: 'Login failed' }, { status: 500 });
  }
}

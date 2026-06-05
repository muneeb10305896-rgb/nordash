import { verifyCredentials } from '@/lib/adminAuth';

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return Response.json({ error: 'Missing credentials' }, { status: 400 });
    }

    const result = await verifyCredentials(email, password);

    if (!result.success) {
      return Response.json({ error: result.error }, { status: 401 });
    }

    return Response.json({
      success: true,
      email: result.admin.email,
      token: process.env.ADMIN_TOKEN || process.env.NEXT_PUBLIC_ADMIN_TOKEN,
      message: 'Login verified',
    });

  } catch (error) {
    console.error('Verify login error:', error);
    return Response.json({ error: 'Verification failed' }, { status: 500 });
  }
}

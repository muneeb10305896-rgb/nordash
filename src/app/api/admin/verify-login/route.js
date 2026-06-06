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

    const token = process.env.ADMIN_TOKEN;
    if (!token) {
      console.error('Verify login error: ADMIN_TOKEN is not set');
      return Response.json({ error: 'Server is misconfigured' }, { status: 500 });
    }

    return Response.json({
      success: true,
      email: result.admin.email,
      token,
      message: 'Login verified',
    });

  } catch (error) {
    console.error('Verify login error:', error);
    return Response.json({ error: 'Verification failed' }, { status: 500 });
  }
}

import { resetPassword } from '@/lib/adminAuth';
import { checkRateLimit, getClientIP } from '@/lib/rateLimit';

export async function POST(request) {
  try {
    // Rate limit: 5 attempts per minute per IP
    const ip = getClientIP(request);
    const rateLimit = checkRateLimit('reset-password', ip, 5, 60000);
    if (!rateLimit.allowed) {
      return Response.json({ error: 'Too many attempts. Try again later.' }, { status: 429 });
    }

    const { token, email, newPassword } = await request.json();

    if (!token || !email || !newPassword) {
      return Response.json({ error: 'Token, email, and new password are required' }, { status: 400 });
    }

    if (newPassword.length < 8) {
      return Response.json({ error: 'Password must be at least 8 characters' }, { status: 400 });
    }

    const result = await resetPassword(token, email, newPassword);

    if (!result.success) {
      return Response.json({ error: result.error }, { status: 400 });
    }

    return Response.json({
      success: true,
      message: 'Password reset successfully. You can now log in with your new password.',
    });

  } catch (error) {
    console.error('Reset password error:', error);
    return Response.json({ error: 'Failed to reset password' }, { status: 500 });
  }
}

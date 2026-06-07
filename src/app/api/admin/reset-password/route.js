import { resetPassword } from '@/lib/adminAuth';

export async function POST(request) {
  try {
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

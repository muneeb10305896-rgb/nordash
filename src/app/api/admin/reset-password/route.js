import { updatePassword, verifyResetToken } from '@/lib/resetTokenStore';

export async function POST(request) {
  try {
    const { token, newPassword } = await request.json();

    if (!token || !newPassword) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (newPassword.length < 6) {
      return Response.json({ error: 'Password must be at least 6 characters' }, { status: 400 });
    }

    // Verify token
    const verification = verifyResetToken(token);

    if (!verification.valid) {
      return Response.json({ error: verification.error }, { status: 400 });
    }

    // Update password
    const result = updatePassword(token, verification.email, newPassword);

    if (!result.success) {
      return Response.json({ error: result.error }, { status: 400 });
    }

    return Response.json({
      success: true,
      message: 'Password reset successfully. You can now login with your new password.',
    });

  } catch (error) {
    console.error('Reset password error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

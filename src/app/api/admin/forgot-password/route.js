import { Resend } from 'resend';
import { createResetToken } from '@/lib/adminAuth';
import { checkRateLimit, getClientIP } from '@/lib/rateLimit';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const ip = getClientIP(request);
    const rateLimit = checkRateLimit('forgot-password', ip, 3, 60000);
    if (!rateLimit.allowed) {
      return Response.json({ message: 'Too many requests. Please try again later.' }, { status: 429 });
    }

    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return Response.json({ message: 'If that email is registered, a reset link has been sent.', success: true });
    }

    const result = await createResetToken(email);

    if (!result.success) {
      // Return generic message — don't reveal whether the email is registered
      return Response.json({ message: 'If that email is registered, a reset link has been sent.', success: true });
    }

    // Build reset URL
    const resetUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://nordash.vercel.app'}/admin/reset-password?token=${result.token}&email=${encodeURIComponent(result.email)}`;

    // Send reset email
    try {
      await resend.emails.send({
        from: 'NORDASH <onboarding@resend.dev>',
        to: email,
        subject: '🔐 NORDASH Admin — Password Reset',
        html: `
          <div style="font-family: 'DM Sans', sans-serif; max-width: 600px; margin: 0 auto; padding: 0; background: #0D1626;">
            <div style="background: linear-gradient(135deg, rgba(255,179,0,0.1) 0%, rgba(255,179,0,0.05) 100%); padding: 40px 20px; text-align: center; border-bottom: 1px solid rgba(255,255,255,0.07);">
              <h1 style="color: #EDF2FF; margin: 0; font-size: 24px; font-weight: 800;">NORDASH</h1>
            </div>
            <div style="padding: 40px 20px;">
              <h2 style="color: #FFB300; margin: 0 0 24px 0; font-size: 18px; font-weight: 700;">🔐 Password Reset Request</h2>
              <p style="color: rgba(237,242,255,0.8); margin: 0 0 24px 0; line-height: 1.6;">Click the button below to reset your NORDASH admin password.</p>
              <div style="text-align: center; margin: 32px 0;">
                <a href="${resetUrl}" style="background: linear-gradient(135deg, #FFB300, #FF8A00); color: white; padding: 14px 32px; border-radius: 8px; text-decoration: none; display: inline-block; font-weight: 600; font-size: 14px;">Reset Password</a>
              </div>
              <p style="color: rgba(237,242,255,0.5); margin: 0; font-size: 12px;">Link expires in 15 minutes. Ignore this email if you didn't request a reset.</p>
            </div>
          </div>
        `,
      });
    } catch (emailErr) {
      console.error('Reset email send failed:', emailErr);
    }

    return Response.json({ message: 'If that email is registered, a reset link has been sent.', success: true });

  } catch (error) {
    console.error('Forgot password error:', error);
    return Response.json({ error: 'Failed to process request' }, { status: 500 });
  }
}

// Verify token endpoint
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (!token) {
      return Response.json({ error: 'Token is required' }, { status: 400 });
    }

    const { verifyResetToken } = await import('@/lib/adminAuth');
    const verification = await verifyResetToken(token);

    if (!verification.valid) {
      return Response.json({ error: verification.error }, { status: 400 });
    }

    return Response.json({ valid: true, email: verification.email });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

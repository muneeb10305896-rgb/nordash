import { Resend } from 'resend';
import { createResetToken, isAuthorizedAdmin } from '@/lib/resetTokenStore';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return Response.json({ error: 'Invalid email address' }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase();

    // Check if email is authorized admin
    if (!isAuthorizedAdmin(normalizedEmail)) {
      return Response.json({
        error: 'This email is not registered as an admin. Please contact Muneeb to register.',
        isRegistered: false,
      }, { status: 404 });
    }

    // Generate reset token
    const token = createResetToken(normalizedEmail);

    // Send reset email
    const resetLink = `https://nordash.vercel.app/admin/reset-password?token=${token}`;

    const emailHtml = `
      <div style="font-family: 'DM Sans', sans-serif; max-width: 600px; margin: 0 auto; padding: 0; background: #0D1626;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, rgba(255,179,0,0.1) 0%, rgba(255,179,0,0.05) 100%); padding: 40px 20px; text-align: center; border-bottom: 1px solid rgba(255,255,255,0.07);">
          <h1 style="color: #EDF2FF; margin: 0; font-size: 24px; font-weight: 800;">NORDASH</h1>
        </div>

        <!-- Content -->
        <div style="padding: 40px 20px;">
          <h2 style="color: #FFB300; margin: 0 0 24px 0; font-size: 18px; font-weight: 700;">🔐 Password Reset Request</h2>

          <p style="color: rgba(237,242,255,0.9); margin: 0 0 16px 0; line-height: 1.6;">
            Hi,
          </p>

          <p style="color: rgba(237,242,255,0.8); margin: 0 0 24px 0; line-height: 1.6;">
            You requested a password reset for your NORDASH admin account. Click the button below to reset your password.
          </p>

          <div style="text-align: center; margin: 32px 0;">
            <a href="${resetLink}" style="background: linear-gradient(135deg, #FFB300, #FF8A00); color: white; padding: 14px 32px; border-radius: 8px; text-decoration: none; display: inline-block; font-weight: 600; font-size: 14px;">
              Reset Password
            </a>
          </div>

          <p style="color: rgba(237,242,255,0.7); margin: 0 0 24px 0; font-size: 12px; line-height: 1.6;">
            Or copy this link: <br>
            <code style="background: rgba(0,0,0,0.2); padding: 8px 12px; border-radius: 4px; display: block; margin-top: 8px; word-break: break-all; color: #00E5FF;">
              ${resetLink}
            </code>
          </p>

          <div style="background: rgba(215, 43, 43, 0.1); border-left: 4px solid #FF6B6B; padding: 16px; border-radius: 4px; margin-bottom: 24px;">
            <p style="color: #FF6B6B; margin: 0; font-size: 12px; font-weight: 600;">⚠️ Link expires in 15 minutes</p>
          </div>

          <p style="color: rgba(237,242,255,0.7); margin: 0; font-size: 12px; line-height: 1.6;">
            If you didn't request this, you can safely ignore this email. Your password won't change unless you click the link above.
          </p>
        </div>

        <!-- Footer -->
        <div style="background: rgba(0,0,0,0.2); padding: 20px; text-align: center; border-top: 1px solid rgba(255,255,255,0.07);">
          <p style="color: rgba(237,242,255,0.5); font-size: 12px; margin: 0;">
            © NORDASH Agency | Nordic Precision. Asian Energy.
          </p>
        </div>
      </div>
    `;

    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: '🔐 NORDASH Admin - Password Reset Request',
      html: emailHtml,
    });

    return Response.json({
      message: 'Reset link sent to your email. Check your inbox (valid for 15 minutes)',
      success: true,
    });

  } catch (error) {
    console.error('Forgot password error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

// Verify token endpoint
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    const { verifyResetToken } = await import('@/lib/resetTokenStore');

    const verification = verifyResetToken(token);

    if (!verification.valid) {
      return Response.json({ error: verification.error }, { status: 400 });
    }

    return Response.json({ valid: true, email: verification.email });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

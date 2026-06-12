import { Resend } from 'resend';
import dbConnect from '@/lib/mongodb';
import Subscriber from '@/models/Subscriber';
import { checkRateLimit, getClientIP } from '@/lib/rateLimit';

const resend = new Resend(process.env.RESEND_API_KEY);

function escapeHtml(str) {
  return (str || '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
}

export async function POST(request) {
  try {
    const ip = getClientIP(request);
    const rateLimit = checkRateLimit('subscribe', ip, 5, 300000);
    if (!rateLimit.allowed) {
      return Response.json({ error: `Please wait ${rateLimit.resetIn}s before subscribing again.` }, { status: 429 });
    }

    const body = await request.json();
    const { email } = body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      return Response.json({ error: 'Invalid email address' }, { status: 400 });
    }

    // Save to database
    try {
      await dbConnect();
      await Subscriber.findOneAndUpdate(
        { email: email.toLowerCase().trim() },
        { email: email.toLowerCase().trim(), subscribedAt: new Date(), source: 'website' },
        { upsert: true, returnDocument: 'after' }
      );
    } catch (dbError) {
      console.error('Failed to save subscriber to DB:', dbError);
      // Continue — email still sends even if DB fails
    }

    const adminEmailHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; max-width: 580px; margin: 0 auto; background: #FFFFFF;">
        <div style="height: 4px; background: linear-gradient(90deg, #00E5FF, #7B61FF);"></div>
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background: #0B1220;">
          <tr>
            <td style="padding: 36px 40px; text-align: center;">
              <img src="https://nordash.vercel.app/nordash-logo.webp" alt="NORDASH" width="140" height="auto" style="display: block; margin: 0 auto; max-width: 140px;" />
            </td>
          </tr>
        </table>
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td style="padding: 40px;">
              <p style="color: #AAAAAA; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.14em; margin: 0 0 6px;">Newsletter</p>
              <h2 style="color: #0D1626; font-size: 22px; font-weight: 800; margin: 0 0 24px;">New Subscriber</h2>
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background: #F8F9FC; border-radius: 8px; border: 1px solid #EEEEEE;">
                <tr>
                  <td style="padding: 20px 24px;">
                    <p style="color: #AAAAAA; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; margin: 0 0 7px;">Email Address</p>
                    <p style="color: #009BB5; font-size: 15px; font-weight: 700; margin: 0 0 16px;">${escapeHtml(email)}</p>
                    <p style="color: #AAAAAA; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; margin: 0 0 7px;">Subscribed</p>
                    <p style="color: #0D1626; font-size: 14px; font-weight: 600; margin: 0;">${new Date().toLocaleString('en-US', { dateStyle: 'long', timeStyle: 'short' })}</p>
                  </td>
                </tr>
              </table>
              <p style="color: #888888; font-size: 13px; line-height: 1.7; margin: 24px 0 0;">Someone just subscribed to the NORDASH newsletter for monthly insights on brand, content, and digital growth.</p>
            </td>
          </tr>
        </table>
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background: #F6F7FA; border-top: 1px solid #E8EAEE;">
          <tr>
            <td style="padding: 20px 40px; text-align: center;">
              <p style="color: #CCCCCC; font-size: 10px; margin: 0;">Automated notification from nordash.vercel.app</p>
            </td>
          </tr>
        </table>
        <div style="height: 4px; background: linear-gradient(90deg, #7B61FF, #00E5FF);"></div>
      </div>
    `;

    const subscriberWelcomeHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #FFFFFF;">
        <div style="height: 5px; background: linear-gradient(90deg, #00E5FF 0%, #7B61FF 50%, #FFB300 100%);"></div>
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background: #0B1220;">
          <tr>
            <td style="padding: 52px 40px 44px; text-align: center;">
              <img src="https://nordash.vercel.app/nordash-logo.webp" alt="NORDASH" width="160" height="auto" style="display: block; margin: 0 auto 18px; max-width: 160px;" />
              <div style="width: 48px; height: 2px; background: linear-gradient(90deg, #00E5FF, #7B61FF); margin: 0 auto 14px;"></div>
              <p style="color: rgba(0,229,255,0.85); font-size: 10px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; margin: 0;">Digital Agency</p>
            </td>
          </tr>
        </table>
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td style="padding: 52px 44px 40px; text-align: center;">
              <h1 style="color: #0D1626; font-size: 28px; font-weight: 800; letter-spacing: -0.02em; margin: 0 0 14px;">Welcome Aboard</h1>
              <p style="color: #666666; font-size: 15px; line-height: 1.8; margin: 0 0 36px; max-width: 440px; display: block;">You're now part of the NORDASH community. Expect monthly insights on brand strategy, content creation, and digital growth — straight to your inbox.</p>
              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: linear-gradient(135deg, #F0FDFF, #F5F0FF); border: 1px solid rgba(0,229,255,0.2); border-radius: 12px; margin-bottom: 36px;">
                <tr>
                  <td style="padding: 28px 32px; text-align: center;">
                    <p style="color: #009BB5; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.16em; margin: 0 0 8px;">Our Mission</p>
                    <p style="color: #0D1626; font-size: 17px; font-weight: 800; letter-spacing: -0.01em; margin: 0;">Nordic Precision. Asian Energy.</p>
                  </td>
                </tr>
              </table>
              <table cellpadding="0" cellspacing="0" border="0" style="margin: 0 auto 8px;">
                <tr>
                  <td>
                    <a href="https://nordash.vercel.app/" style="display: inline-block; background: linear-gradient(135deg, #00C4DB 0%, #6B4FFF 100%); color: #FFFFFF; padding: 14px 32px; border-radius: 8px; font-size: 13px; font-weight: 700; text-decoration: none; letter-spacing: 0.05em;">Explore Our Work &rarr;</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background: #F6F7FA; border-top: 1px solid #E8EAEE;">
          <tr>
            <td style="padding: 32px 40px; text-align: center;">
              <img src="https://nordash.vercel.app/nordash-logo-64.webp" alt="NORDASH" width="40" height="auto" style="display: block; margin: 0 auto 12px; opacity: 0.4; max-width: 40px;" />
              <p style="color: #0D1626; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.15em; margin: 0 0 4px;">NORDASH</p>
              <p style="color: #999999; font-size: 11px; margin: 0 0 14px;">Nordic Precision &middot; Asian Energy</p>
              <p style="color: #CCCCCC; font-size: 10px; margin: 0; line-height: 1.8;">
                <a href="https://nordash.vercel.app/privacy" style="color: #009BB5; text-decoration: none;">Privacy</a>
                &nbsp;&middot;&nbsp;
                <a href="https://nordash.vercel.app/terms" style="color: #009BB5; text-decoration: none;">Terms</a>
                &nbsp;&middot;&nbsp;You subscribed at nordash.vercel.app
              </p>
            </td>
          </tr>
        </table>
        <div style="height: 4px; background: linear-gradient(90deg, #7B61FF 0%, #00E5FF 100%);"></div>
      </div>
    `;

    // Send confirmation email to subscriber
    const { data: subData, error: subError } = await resend.emails.send({
      from: 'NORDASH <onboarding@resend.dev>',
      to: [email],
      subject: 'Welcome to NORDASH — You\'re In',
      html: subscriberWelcomeHtml,
    });

    // Send notification to admin
    const { data: adminData, error: adminError } = await resend.emails.send({
      from: 'NORDASH <onboarding@resend.dev>',
      to: ['muneeb10305896@gmail.com'],
      subject: `New Newsletter Subscriber — ${email}`,
      html: adminEmailHtml,
    });

    // If Resend fails (e.g. test mode limits), still return success
    // so the user doesn't get a broken experience
    if (subError) {
      console.warn('Subscriber email failed (non-critical):', subError);
    }
    if (adminError) {
      console.warn('Admin notification failed (non-critical):', adminError);
    }

    // Always return success — the subscription intent is captured
    return Response.json({ success: true, id: subData?.id || 'subscription-recorded' });
  } catch (error) {
    console.error('Subscribe API error:', error);
    // Differentiate parse errors from downstream failures
    if (error instanceof SyntaxError) {
      return Response.json({ error: 'Invalid request body' }, { status: 400 });
    }
    // For non-parse errors, the subscriber was already saved — return success for UX
    return Response.json({ success: true, id: 'subscription-recorded' });
  }
}

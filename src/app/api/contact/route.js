import { Resend } from 'resend';
import dbConnect from '@/lib/mongodb';
import Lead from '@/models/Lead';
import { checkRateLimit, getClientIP } from '@/lib/rateLimit';

const resend = new Resend(process.env.RESEND_API_KEY);

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export async function POST(request) {
  try {
    // Rate limit: 3 submissions per minute per IP
    const ip = getClientIP(request);
    const rateLimit = checkRateLimit('contact', ip, 3, 60000);
    if (!rateLimit.allowed) {
      return Response.json({ error: `Please wait ${rateLimit.resetIn}s before sending another request.` }, { status: 429 });
    }

    const body = await request.json();
    const { type, name, email, phone, country, service, message } = body;

    if (!name || !email || !phone || !country) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Input size limits to prevent abuse
    if (name.length > 100 || email.length > 200 || phone.length > 30 || (country && country.length > 100)) {
      return Response.json({ error: 'Input fields exceed maximum length' }, { status: 400 });
    }
    if (service && service.length > 200) {
      return Response.json({ error: 'Service field exceeds maximum length' }, { status: 400 });
    }
    if (message && message.length > 5000) {
      return Response.json({ error: 'Message exceeds maximum length (5000 chars)' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Response.json({ error: 'Invalid email address' }, { status: 400 });
    }

    const isBookCall = type === 'book-call';

    // Escape all user input for safe HTML rendering
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone);
    const safeCountry = escapeHtml(country);
    const safeService = escapeHtml(service || '');
    const safeMessage = escapeHtml(message || '');

    // ── Save lead to MongoDB ──
    try {
      await dbConnect();
      await Lead.create({
        name, email, phone, country,
        serviceInterested: service || (isBookCall ? 'Free Consultation Call' : 'Quote Request'),
        message: message || '',
        status: 'new',
        source: 'website',
        createdAt: new Date(),
      });
    } catch (dbError) {
      console.error('Failed to save lead to DB:', dbError);
      // Continue — email still sends even if DB fails
    }

    const emailHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif; max-width: 620px; margin: 0 auto; background: #FFFFFF;">

        <!-- Top bar -->
        <div style="height: 5px; background: linear-gradient(90deg, #00E5FF 0%, #7B61FF 50%, #FFB300 100%);"></div>

        <!-- Header -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background: #0B1220;">
          <tr>
            <td style="padding: 52px 40px 44px; text-align: center;">
              <img src="https://nordash.vercel.app/nordash-logo.webp" alt="NORDASH" width="160" height="auto" style="display: block; margin: 0 auto 18px; max-width: 160px;" />
              <div style="width: 48px; height: 2px; background: linear-gradient(90deg, #00E5FF, #7B61FF); margin: 0 auto 14px;"></div>
              <p style="color: rgba(0,229,255,0.85); font-size: 10px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; margin: 0;">Digital Agency</p>
            </td>
          </tr>
        </table>

        <!-- Badge strip -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background: ${isBookCall ? 'rgba(0,229,255,0.06)' : 'rgba(255,179,0,0.06)'}; border-top: 1px solid ${isBookCall ? 'rgba(0,229,255,0.2)' : 'rgba(255,179,0,0.2)'}; border-bottom: 1px solid ${isBookCall ? 'rgba(0,229,255,0.2)' : 'rgba(255,179,0,0.2)'};">
          <tr>
            <td style="padding: 14px 40px; text-align: center;">
              <span style="color: ${isBookCall ? '#00C4DB' : '#E6A200'}; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.14em;">${isBookCall ? '📞 New Call Booking Request' : '💼 New Quote Request'}</span>
            </td>
          </tr>
        </table>

        <!-- Main content -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background: #FFFFFF;">
          <tr>
            <td style="padding: 48px 40px 16px;">
              <h2 style="color: #0D1626; margin: 0 0 10px; font-size: 26px; font-weight: 800; letter-spacing: -0.02em;">New ${isBookCall ? 'Call Request' : 'Quote Inquiry'}</h2>
              <p style="color: #777777; font-size: 14px; line-height: 1.7; margin: 0 0 36px;">Submitted just now via nordash.vercel.app — reply directly to follow up.</p>

              <!-- Info grid -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td width="48%" style="padding-bottom: 24px; vertical-align: top; border-bottom: 1px solid #F0F0F0;">
                    <p style="color: #AAAAAA; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; margin: 0 0 7px;">Name</p>
                    <p style="color: #0D1626; font-size: 15px; font-weight: 700; margin: 0;">${safeName}</p>
                  </td>
                  <td width="4%"></td>
                  <td width="48%" style="padding-bottom: 24px; vertical-align: top; border-bottom: 1px solid #F0F0F0;">
                    <p style="color: #AAAAAA; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; margin: 0 0 7px;">Email</p>
                    <a href="mailto:${safeEmail}" style="color: #009BB5; font-size: 15px; font-weight: 700; text-decoration: none;">${safeEmail}</a>
                  </td>
                </tr>
                <tr><td colspan="3" style="height: 20px;"></td></tr>
                <tr>
                  <td width="48%" style="padding-bottom: 24px; vertical-align: top; border-bottom: 1px solid #F0F0F0;">
                    <p style="color: #AAAAAA; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; margin: 0 0 7px;">Phone</p>
                    <p style="color: #0D1626; font-size: 15px; font-weight: 700; margin: 0;">${safePhone}</p>
                  </td>
                  <td width="4%"></td>
                  <td width="48%" style="padding-bottom: 24px; vertical-align: top; border-bottom: 1px solid #F0F0F0;">
                    <p style="color: #AAAAAA; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; margin: 0 0 7px;">Country</p>
                    <p style="color: #0D1626; font-size: 15px; font-weight: 700; margin: 0;">${safeCountry}</p>
                  </td>
                </tr>
                ${safeService ? `
                <tr><td colspan="3" style="height: 20px;"></td></tr>
                <tr>
                  <td colspan="3" style="padding-bottom: 8px;">
                    <p style="color: #AAAAAA; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; margin: 0 0 10px;">Service Interested</p>
                    <table cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="background: #F3F0FF; border: 1px solid rgba(123,97,255,0.3); border-radius: 6px; padding: 9px 18px;">
                          <span style="color: #6B4FFF; font-size: 13px; font-weight: 700;">${safeService}</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>` : ''}
              </table>
            </td>
          </tr>

          ${safeMessage ? `
          <tr>
            <td style="padding: 8px 40px 8px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background: #F8F8FB; border-left: 3px solid #7B61FF; border-radius: 0 8px 8px 0;">
                <tr>
                  <td style="padding: 20px 24px;">
                    <p style="color: #AAAAAA; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; margin: 0 0 10px;">Project Brief</p>
                    <p style="color: #333333; font-size: 14px; line-height: 1.8; margin: 0; white-space: pre-wrap;">${safeMessage}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          ` : ''}

          <!-- CTAs -->
          <tr>
            <td style="padding: 36px 40px 48px;">
              <table cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding-right: 14px;">
                    <a href="mailto:${safeEmail}?subject=Re: ${isBookCall ? 'Free Call' : 'Quote'} — NORDASH" style="display: inline-block; background: linear-gradient(135deg, #00C4DB 0%, #6B4FFF 100%); color: #FFFFFF; padding: 14px 28px; border-radius: 8px; font-size: 13px; font-weight: 700; text-decoration: none; letter-spacing: 0.04em;">Reply to ${safeName} &rarr;</a>
                  </td>
                  <td>
                    <a href="https://nordash.vercel.app/" style="display: inline-block; background: #F4F6FA; color: #0D1626; border: 1px solid #DDDDDD; padding: 13px 24px; border-radius: 8px; font-size: 13px; font-weight: 600; text-decoration: none;">Visit Site</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>

        <!-- Footer -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background: #F6F7FA; border-top: 1px solid #E8EAEE;">
          <tr>
            <td style="padding: 32px 40px; text-align: center;">
              <img src="https://nordash.vercel.app/nordash-logo-64.webp" alt="NORDASH" width="40" height="auto" style="display: block; margin: 0 auto 12px; opacity: 0.45; max-width: 40px;" />
              <p style="color: #0D1626; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.15em; margin: 0 0 4px;">NORDASH</p>
              <p style="color: #999999; font-size: 11px; margin: 0 0 16px;">Nordic Precision &middot; Asian Energy</p>
              <p style="color: #BBBBBB; font-size: 10px; margin: 0; line-height: 1.8;">
                <a href="https://nordash.vercel.app/privacy" style="color: #009BB5; text-decoration: none;">Privacy</a>
                &nbsp;&middot;&nbsp;
                <a href="https://nordash.vercel.app/terms" style="color: #009BB5; text-decoration: none;">Terms</a>
                &nbsp;&middot;&nbsp;Automated from nordash.vercel.app
              </p>
            </td>
          </tr>
        </table>

        <!-- Bottom bar -->
        <div style="height: 4px; background: linear-gradient(90deg, #7B61FF 0%, #00E5FF 100%);"></div>
      </div>
    `;

    const { data, error } = await resend.emails.send({
      from: 'NORDASH <onboarding@resend.dev>',
      to: ['muneeb10305896@gmail.com'],
      replyTo: email,
      subject: `${isBookCall ? '📞 Book a Free Call' : '💼 Quote Request'} - ${safeName}`,
      html: emailHtml,
    });

    if (error) {
      console.error('Resend email error:', error);
      // Lead is already saved — return success even if email fails
      return Response.json({ success: true, warning: 'Email delivery delayed. We will contact you soon.' });
    }

    return Response.json({ success: true, id: data?.id });
  } catch (error) {
    console.error('Contact API error:', error);
    return Response.json({ error: 'Something went wrong. Please email us at muneeb10305896@gmail.com' }, { status: 500 });
  }
}

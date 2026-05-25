import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const { type, name, email, phone, country, service, message } = await request.json();

    if (!name || !email || !phone || !country) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const isBookCall = type === 'book-call';

    const emailHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', sans-serif; max-width: 620px; margin: 0 auto; padding: 0; background: #FFFFFF; overflow: hidden;">
        <!-- Top gradient bar -->
        <div style="height: 6px; background: linear-gradient(90deg, #00E5FF 0%, #7B61FF 33%, #FFB300 66%, #007A4C 100%);"></div>

        <!-- Header -->
        <div style="background: linear-gradient(135deg, #0D1626 0%, #1A2332 100%); padding: 56px 40px 48px; text-align: center; position: relative; overflow: hidden;">
          <!-- Decorative elements -->
          <div style="position: absolute; top: -40px; right: -40px; width: 120px; height: 120px; background: radial-gradient(circle, rgba(0,229,255,0.1), transparent); border-radius: 50%;"></div>
          <div style="position: absolute; bottom: -30px; left: -30px; width: 100px; height: 100px; background: radial-gradient(circle, rgba(123,97,255,0.08), transparent); border-radius: 50%;"></div>

          <div style="position: relative; z-index: 1;">
            <!-- Logo -->
            <div style="display: inline-block; width: 56px; height: 56px; background: linear-gradient(135deg, #00E5FF 0%, #7B61FF 100%); border-radius: 14px; margin-bottom: 20px; transform: rotate(45deg);"></div>
            <div style="display: inline-block; width: 48px; height: 48px; background: linear-gradient(135deg, #00E5FF 0%, #7B61FF 100%); border-radius: 12px; margin-bottom: 20px; position: absolute; left: 50%; top: 12px; transform: translate(-50%, 0);"></div>

            <h1 style="color: #FFFFFF; margin: 24px 0 6px 0; font-size: 36px; font-weight: 800; letter-spacing: -0.01em;">NORDASH</h1>
            <p style="color: rgba(0,229,255,0.9); margin: 0; font-size: 12px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase;">Digital Agency</p>
          </div>
        </div>

        <!-- Main Content -->
        <div style="padding: 48px 40px; background: #FFFFFF;">
          <!-- Request type badge -->
          <div style="display: inline-block; background: ${isBookCall ? 'linear-gradient(135deg, rgba(0,229,255,0.15), rgba(0,229,255,0.05))' : 'linear-gradient(135deg, rgba(255,179,0,0.15), rgba(255,179,0,0.05))'}; border: 1px solid ${isBookCall ? 'rgba(0,229,255,0.3)' : 'rgba(255,179,0,0.3)'}; padding: 8px 16px; border-radius: 8px; margin-bottom: 24px;">
            <span style="color: ${isBookCall ? '#00E5FF' : '#FFB300'}; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em;">🔔 ${isBookCall ? 'Call Booking' : 'Quote Request'}</span>
          </div>

          <h2 style="color: #0D1626; margin: 0 0 12px 0; font-size: 28px; font-weight: 800; line-height: 1.2; letter-spacing: -0.01em;">New ${isBookCall ? 'Call Request' : 'Quote Inquiry'}</h2>
          <p style="color: #666666; margin: 0 0 36px 0; font-size: 15px; line-height: 1.7;">
            A new ${isBookCall ? 'call booking request' : 'quote inquiry'} has been submitted. Here are the details:
          </p>

          <!-- Contact Information Cards -->
          <div style="margin-bottom: 36px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 16px 0; border-bottom: 1px solid #EEEEEE; width: 35%;">
                  <span style="color: #999999; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 6px;">📝 Name</span>
                  <span style="color: #0D1626; font-weight: 700; font-size: 15px;">${name}</span>
                </td>
                <td style="padding: 16px 0 16px 24px; border-bottom: 1px solid #EEEEEE;">
                  <span style="color: #999999; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 6px;">📧 Email</span>
                  <a href="mailto:${email}" style="color: #00E5FF; font-weight: 600; font-size: 15px; text-decoration: none;">${email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 16px 0; border-bottom: 1px solid #EEEEEE;">
                  <span style="color: #999999; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 6px;">📱 Phone</span>
                  <span style="color: #0D1626; font-weight: 700; font-size: 15px;">${phone}</span>
                </td>
                <td style="padding: 16px 0 16px 24px; border-bottom: 1px solid #EEEEEE;">
                  <span style="color: #999999; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 6px;">🌍 Country</span>
                  <span style="color: #0D1626; font-weight: 700; font-size: 15px;">${country}</span>
                </td>
              </tr>
              ${service ? `<tr>
                <td colspan="2" style="padding: 16px 0;">
                  <span style="color: #999999; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 8px;">⚡ Service Interested In</span>
                  <div style="display: inline-block; background: linear-gradient(135deg, rgba(123,97,255,0.15), rgba(123,97,255,0.05)); border: 1px solid rgba(123,97,255,0.3); padding: 8px 16px; border-radius: 6px;">
                    <span style="color: #7B61FF; font-weight: 700; font-size: 14px;">${service}</span>
                  </div>
                </td>
              </tr>` : ''}
            </table>
          </div>

          ${message ? `
          <!-- Message Section -->
          <div style="margin-bottom: 36px; background: linear-gradient(135deg, rgba(0,229,255,0.08), rgba(123,97,255,0.08)); border: 1px solid rgba(0,229,255,0.2); padding: 24px; border-radius: 12px; border-left: 4px solid #00E5FF;">
            <h3 style="color: #0D1626; margin: 0 0 12px 0; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em;">💼 Project Brief</h3>
            <p style="color: #333333; margin: 0; line-height: 1.8; font-size: 14px; white-space: pre-wrap;">${message}</p>
          </div>
          ` : ''}

          <!-- CTA Buttons -->
          <div style="display: flex; gap: 16px; margin: 36px 0; flex-wrap: wrap;">
            <a href="mailto:${email}?subject=Re: ${isBookCall ? 'Call Booking' : 'Quote Request'} - NORDASH" style="background: linear-gradient(135deg, #00E5FF 0%, #7B61FF 100%); color: white; padding: 16px 32px; border-radius: 8px; text-decoration: none; display: inline-block; font-weight: 700; font-size: 14px; line-height: 1; letter-spacing: 0.05em; flex: 1; text-align: center; min-width: 160px;">
              ↩️ Reply Now
            </a>
            <a href="https://nordash.vercel.app/" style="background: rgba(0,229,255,0.1); color: #00E5FF; border: 2px solid rgba(0,229,255,0.3); padding: 14px 32px; border-radius: 8px; text-decoration: none; display: inline-block; font-weight: 700; font-size: 14px; line-height: 1; letter-spacing: 0.05em; flex: 1; text-align: center; min-width: 160px;">
              Visit Site →
            </a>
          </div>
        </div>

        <!-- Footer -->
        <div style="background: linear-gradient(135deg, #F8F9FA 0%, #F0F2F5 100%); padding: 40px; text-align: center; border-top: 1px solid #EEEEEE;">
          <div style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid #EEEEEE;">
            <p style="color: #0D1626; font-size: 13px; margin: 0 0 4px 0; font-weight: 700;">
              NORDASH
            </p>
            <p style="color: #666666; font-size: 12px; margin: 0; line-height: 1.6;">
              Digital Agency — Nordic Precision meets Asian Energy
            </p>
          </div>
          <div style="display: flex; gap: 12px; justify-content: center; margin-bottom: 16px;">
            <a href="https://nordash.vercel.app" style="display: inline-block; width: 32px; height: 32px; background: white; border: 1px solid #EEEEEE; border-radius: 6px; text-align: center; line-height: 32px; color: #00E5FF; text-decoration: none; font-weight: 700; font-size: 14px;">🌐</a>
            <a href="mailto:hello@nordash.agency" style="display: inline-block; width: 32px; height: 32px; background: white; border: 1px solid #EEEEEE; border-radius: 6px; text-align: center; line-height: 32px; color: #7B61FF; text-decoration: none; font-weight: 700; font-size: 14px;">✉️</a>
          </div>
          <p style="color: #999999; font-size: 11px; margin: 0; line-height: 1.6;">
            This is an automated message from nordash.vercel.app<br>
            <a href="https://nordash.vercel.app/privacy" style="color: #00E5FF; text-decoration: none;">Privacy Policy</a> • <a href="https://nordash.vercel.app/terms" style="color: #00E5FF; text-decoration: none;">Terms</a>
          </p>
        </div>

        <!-- Bottom gradient bar -->
        <div style="height: 4px; background: linear-gradient(90deg, #007A4C 0%, #FFB300 33%, #7B61FF 66%, #00E5FF 100%);"></div>
      </div>
    `;

    const result = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'muneeb10305896@gmail.com',
      subject: `${isBookCall ? '📞 Book a Free Call' : '💼 Quote Request'} - ${name}`,
      html: emailHtml,
    });

    if (result.error) {
      console.error('Email error:', result.error);
      return Response.json({ error: 'Failed to send email' }, { status: 500 });
    }

    return Response.json({ success: true, id: result.data.id });
  } catch (error) {
    console.error('API error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

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
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', sans-serif; max-width: 600px; margin: 0 auto; padding: 0; background: #FFFFFF;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #08101F 0%, #1A1F3A 100%); padding: 48px 32px; text-align: center;">
          <div style="display: inline-block; width: 48px; height: 48px; background: linear-gradient(135deg, #00E5FF 0%, #7B61FF 100%); border-radius: 12px; margin-bottom: 16px;"></div>
          <h1 style="color: #FFFFFF; margin: 0 0 4px 0; font-size: 28px; font-weight: 700; letter-spacing: -0.02em;">NORDASH</h1>
          <p style="color: rgba(255,255,255,0.7); margin: 0; font-size: 13px; font-weight: 500;">Digital Agency</p>
        </div>

        <!-- Main Content -->
        <div style="padding: 40px 32px;">
          <h2 style="color: #08101F; margin: 0 0 8px 0; font-size: 22px; font-weight: 700;">New ${isBookCall ? 'Call Request' : 'Quote Inquiry'}</h2>
          <p style="color: #666666; margin: 0 0 32px 0; font-size: 14px; line-height: 1.6;">
            A new ${isBookCall ? 'call booking request' : 'quote inquiry'} has been submitted through your website.
          </p>

          <!-- Divider -->
          <div style="height: 1px; background: #EEEEEE; margin: 0 0 32px 0;"></div>

          <!-- Contact Information Section -->
          <div style="margin-bottom: 32px;">
            <h3 style="color: #08101F; margin: 0 0 20px 0; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: #999999;">Contact Information</h3>

            <table style="width: 100%;">
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #EEEEEE; color: #666666; font-size: 13px;">Name</td>
                <td style="padding: 12px 0 12px 20px; border-bottom: 1px solid #EEEEEE; color: #08101F; font-weight: 600; font-size: 14px;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #EEEEEE; color: #666666; font-size: 13px;">Email</td>
                <td style="padding: 12px 0 12px 20px; border-bottom: 1px solid #EEEEEE;"><a href="mailto:${email}" style="color: #00A8D8; text-decoration: none; font-size: 14px;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #EEEEEE; color: #666666; font-size: 13px;">Phone</td>
                <td style="padding: 12px 0 12px 20px; border-bottom: 1px solid #EEEEEE; color: #08101F; font-size: 14px;">${phone}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #EEEEEE; color: #666666; font-size: 13px;">Country</td>
                <td style="padding: 12px 0 12px 20px; border-bottom: 1px solid #EEEEEE; color: #08101F; font-size: 14px;">${country}</td>
              </tr>
              ${service ? `<tr><td style="padding: 12px 0; color: #666666; font-size: 13px;">Service</td><td style="padding: 12px 0 12px 20px; color: #00A8D8; font-weight: 600; font-size: 14px;">${service}</td></tr>` : ''}
            </table>
          </div>

          ${message ? `
          <!-- Message Section -->
          <div style="margin-bottom: 32px;">
            <h3 style="color: #08101F; margin: 0 0 16px 0; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: #999999;">Project Brief</h3>
            <div style="background: #F8F9FA; padding: 16px; border-radius: 6px; border-left: 3px solid #00A8D8;">
              <p style="color: #333333; margin: 0; line-height: 1.6; font-size: 13px; white-space: pre-wrap;">${message}</p>
            </div>
          </div>
          ` : ''}

          <!-- Divider -->
          <div style="height: 1px; background: #EEEEEE; margin: 0 0 32px 0;"></div>

          <!-- CTA Button -->
          <div style="text-align: center; margin: 32px 0;">
            <a href="mailto:${email}?subject=Re: ${isBookCall ? 'Call Booking' : 'Quote Request'} - NORDASH" style="background: linear-gradient(135deg, #00E5FF, #00A8D8); color: white; padding: 13px 32px; border-radius: 6px; text-decoration: none; display: inline-block; font-weight: 600; font-size: 14px; line-height: 1;">
              Reply to Request
            </a>
          </div>
        </div>

        <!-- Footer -->
        <div style="background: #F8F9FA; padding: 32px; text-align: center; border-top: 1px solid #EEEEEE;">
          <p style="color: #666666; font-size: 12px; margin: 0 0 12px 0; line-height: 1.6;">
            <strong style="color: #08101F;">NORDASH</strong><br>
            Digital Agency | Nordic Precision. Asian Energy.
          </p>
          <p style="color: #999999; font-size: 11px; margin: 0; line-height: 1.6;">
            <a href="https://nordash.vercel.app" style="color: #00A8D8; text-decoration: none;">nordash.vercel.app</a><br>
            This is an automated message from your website. Do not reply to this address.
          </p>
        </div>
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

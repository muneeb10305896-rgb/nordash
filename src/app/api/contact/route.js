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
      <div style="font-family: 'DM Sans', sans-serif; max-width: 600px; margin: 0 auto; padding: 0; background: #0D1626;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, rgba(0,229,255,0.1) 0%, rgba(123,97,255,0.1) 100%); padding: 40px 20px; text-align: center; border-bottom: 1px solid rgba(255,255,255,0.07);">
          <div style="display: inline-block; width: 40px; height: 40px; background: linear-gradient(135deg, #00E5FF, #7B61FF); border-radius: 8px; margin-bottom: 16px;"></div>
          <h1 style="color: #EDF2FF; margin: 0 0 8px 0; font-size: 24px; font-weight: 800; letter-spacing: -0.02em;">NORDASH</h1>
          <p style="color: rgba(237,242,255,0.6); margin: 0; font-size: 12px;">Digital Agency</p>
        </div>

        <!-- Content -->
        <div style="padding: 40px 20px;">
          <h2 style="color: #00E5FF; margin: 0 0 24px 0; font-size: 20px; font-weight: 700;">${isBookCall ? '📞 New Call Request' : '💼 Quote Inquiry'}</h2>

          <p style="color: rgba(237,242,255,0.8); margin: 0 0 24px 0; line-height: 1.6;">
            A new ${isBookCall ? 'call booking' : 'quote request'} has been received from your website.
          </p>

          <!-- Contact Details -->
          <div style="background: rgba(0,229,255,0.05); border-left: 4px solid #00E5FF; padding: 20px; border-radius: 4px; margin-bottom: 24px;">
            <table style="width: 100%; color: rgba(237,242,255,0.9);">
              <tr>
                <td style="padding: 8px 0; color: rgba(237,242,255,0.6); width: 100px;">Name:</td>
                <td style="padding: 8px 0; font-weight: 600;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: rgba(237,242,255,0.6);">Email:</td>
                <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #00E5FF; text-decoration: none;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: rgba(237,242,255,0.6);">Phone:</td>
                <td style="padding: 8px 0;">${phone}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: rgba(237,242,255,0.6);">Country:</td>
                <td style="padding: 8px 0;">${country}</td>
              </tr>
              ${service ? `<tr><td style="padding: 8px 0; color: rgba(237,242,255,0.6);">Service:</td><td style="padding: 8px 0; font-weight: 500;">${service}</td></tr>` : ''}
            </table>
          </div>

          ${message ? `<div style="background: rgba(123,97,255,0.05); padding: 16px; border-radius: 4px; margin-bottom: 24px;">
            <p style="color: rgba(237,242,255,0.6); font-size: 12px; margin: 0 0 8px 0; text-transform: uppercase; letter-spacing: 0.1em;">Message:</p>
            <p style="color: rgba(237,242,255,0.9); margin: 0; line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>` : ''}

          <!-- CTA -->
          <div style="margin-top: 32px;">
            <a href="mailto:${email}?subject=Re: ${isBookCall ? 'Call Booking' : 'Quote Request'}" style="background: linear-gradient(135deg, #00E5FF, #7B61FF); color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; display: inline-block; font-weight: 600; font-size: 14px;">
              Reply to ${name}
            </a>
          </div>
        </div>

        <!-- Footer -->
        <div style="background: rgba(0,0,0,0.2); padding: 20px; text-align: center; border-top: 1px solid rgba(255,255,255,0.07);">
          <p style="color: rgba(237,242,255,0.5); font-size: 12px; margin: 0; line-height: 1.6;">
            This is an automated message from your NORDASH website.<br>
            <a href="https://nordash.vercel.app" style="color: #00E5FF; text-decoration: none;">Visit our website</a> • Nordic Precision. Asian Energy.
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

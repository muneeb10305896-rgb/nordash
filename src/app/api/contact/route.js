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
      <div style="font-family: 'DM Sans', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #EDF2FF; margin-bottom: 20px;">${isBookCall ? '📞 Book a Free Call' : '💼 Quote Request'}</h2>

        <div style="background: rgba(13, 22, 38, 0.6); padding: 20px; border: 1px solid rgba(255,255,255,0.07); border-radius: 8px; margin-bottom: 20px;">
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Country:</strong> ${country}</p>
          ${service ? `<p><strong>Service:</strong> ${service}</p>` : ''}
          ${message ? `<p><strong>Message:</strong></p><p>${message.replace(/\n/g, '<br>')}</p>` : ''}
        </div>

        <div style="border-top: 1px solid rgba(255,255,255,0.07); padding-top: 20px; color: rgba(237,242,255,0.5); font-size: 12px;">
          <p>This is an automated notification from NORDASH website.</p>
          <p>Reply to: ${email}</p>
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

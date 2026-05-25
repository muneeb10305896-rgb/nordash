import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return Response.json({ error: 'Invalid email address' }, { status: 400 });
    }

    const emailHtml = `
      <div style="font-family: 'DM Sans', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #EDF2FF; margin-bottom: 20px;">✉️ New Newsletter Subscription</h2>

        <div style="background: rgba(13, 22, 38, 0.6); padding: 20px; border: 1px solid rgba(255,255,255,0.07); border-radius: 8px; margin-bottom: 20px;">
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
        </div>

        <p style="color: rgba(237,242,255,0.7);">Someone just subscribed to the NORDASH newsletter for monthly insights on brand, content, and digital growth.</p>

        <div style="border-top: 1px solid rgba(255,255,255,0.07); padding-top: 20px; color: rgba(237,242,255,0.5); font-size: 12px;">
          <p>This is an automated notification from NORDASH website.</p>
        </div>
      </div>
    `;

    const result = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'muneeb10305896@gmail.com',
      subject: `✉️ New Newsletter Subscription - ${email}`,
      html: emailHtml,
    });

    if (result.error) {
      console.error('Email error:', result.error);
      return Response.json({ error: 'Failed to subscribe' }, { status: 500 });
    }

    return Response.json({ success: true, id: result.data.id });
  } catch (error) {
    console.error('API error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

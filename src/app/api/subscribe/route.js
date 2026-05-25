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

    // Send confirmation email to subscriber
    const subscriberEmail = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: '✉️ Welcome to NORDASH Newsletter',
      html: `
        <div style="font-family: 'DM Sans', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #EDF2FF; margin-bottom: 20px;">Welcome to NORDASH</h2>
          <p style="color: rgba(237,242,255,0.8); line-height: 1.6; margin-bottom: 20px;">
            Thank you for subscribing to our newsletter! 🎉
          </p>
          <p style="color: rgba(237,242,255,0.8); line-height: 1.6; margin-bottom: 20px;">
            You'll now receive monthly insights on brand strategy, content creation, and digital growth directly to your inbox.
          </p>
          <div style="background: rgba(0,229,255,0.1); border-left: 4px solid #00E5FF; padding: 20px; margin: 20px 0; border-radius: 4px;">
            <p style="color: #00E5FF; margin: 0; font-weight: 600;">Nordic Precision. Asian Energy.</p>
          </div>
          <p style="color: rgba(237,242,255,0.6); font-size: 12px; margin-top: 30px;">
            © NORDASH Agency | <a href="https://nordash.vercel.app" style="color: #00E5FF; text-decoration: none;">Visit our website</a>
          </p>
        </div>
      `,
    });

    // Send notification to admin
    const adminEmail = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'muneeb10305896@gmail.com',
      subject: `✉️ New Newsletter Subscription - ${email}`,
      html: emailHtml,
    });

    if (subscriberEmail.error || adminEmail.error) {
      console.error('Email error:', subscriberEmail.error || adminEmail.error);
      return Response.json({ error: 'Failed to subscribe' }, { status: 500 });
    }

    return Response.json({ success: true, id: subscriberEmail.data.id });
  } catch (error) {
    console.error('API error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

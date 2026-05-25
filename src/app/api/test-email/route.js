import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const { to, testType } = await request.json();

    if (testType === 'admin') {
      const result = await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: to || 'muneeb10305896@gmail.com',
        subject: 'Test Admin Email',
        html: '<p>This is a test email to the admin.</p>',
      });

      return Response.json({ success: true, result });
    } else if (testType === 'applicant') {
      const result = await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: to || 'test@example.com',
        subject: 'Test Applicant Confirmation',
        html: '<p>This is a test confirmation email.</p>',
      });

      return Response.json({ success: true, result });
    }

    return Response.json({ error: 'Invalid testType' }, { status: 400 });
  } catch (error) {
    console.error('Test email error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

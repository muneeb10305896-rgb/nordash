import { Resend } from 'resend';
import { verifyAdminAuth } from '@/lib/apiUtils';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  const admin = await verifyAdminAuth();
  if (!admin) return Response.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const { testType } = await request.json();
    // Always send test emails to the authenticated admin's email — no user-supplied recipient
    const adminEmail = admin.email;

    if (testType === 'admin') {
      const { error: sendError } = await resend.emails.send({
        from: 'NORDASH <onboarding@resend.dev>',
        to: adminEmail,
        subject: 'Test Admin Email',
        html: '<p>This is a test email to the admin.</p>',
      });

      if (sendError) {
        console.warn('Test email send failed:', sendError);
        return Response.json({ error: 'Failed to send test email' }, { status: 500 });
      }

      return Response.json({ success: true });
    } else if (testType === 'applicant') {
      const { error: sendError } = await resend.emails.send({
        from: 'NORDASH <onboarding@resend.dev>',
        to: adminEmail,
        subject: 'Test Applicant Confirmation',
        html: '<p>This is a test confirmation email.</p>',
      });

      if (sendError) {
        console.warn('Test email send failed:', sendError);
        return Response.json({ error: 'Failed to send test email' }, { status: 500 });
      }

      return Response.json({ success: true });
    }

    return Response.json({ error: 'Invalid testType' }, { status: 400 });
  } catch (error) {
    console.error('Test email error:', error);
    return Response.json({ error: 'Failed to send test email' }, { status: 500 });
  }
}

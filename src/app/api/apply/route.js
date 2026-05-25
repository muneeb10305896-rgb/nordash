import { Resend } from 'resend';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const formData = await request.formData();
    const position = formData.get('position');
    const positionId = formData.get('positionId');
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const linkedin = formData.get('linkedin');
    const cvFile = formData.get('cv');
    const coverLetterFile = formData.get('coverLetter');

    if (!name || !email || !phone || !cvFile) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Convert files to base64 for email attachments
    const cvBuffer = await cvFile.arrayBuffer();
    const cvBase64 = Buffer.from(cvBuffer).toString('base64');

    let coverLetterBase64 = null;
    if (coverLetterFile) {
      const clBuffer = await coverLetterFile.arrayBuffer();
      coverLetterBase64 = Buffer.from(clBuffer).toString('base64');
    }

    // Send email to admin (Farheen)
    const attachments = [
      {
        filename: cvFile.name,
        content: cvBase64,
      },
    ];

    if (coverLetterFile) {
      attachments.push({
        filename: coverLetterFile.name,
        content: coverLetterBase64,
      });
    }

    const adminEmailHtml = `
      <div style="font-family: 'DM Sans', sans-serif; max-width: 600px; margin: 0 auto; padding: 0; background: #0D1626;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, rgba(255,179,0,0.1) 0%, rgba(255,179,0,0.05) 100%); padding: 40px 20px; text-align: center; border-bottom: 1px solid rgba(255,255,255,0.07);">
          <div style="display: inline-block; width: 40px; height: 40px; background: linear-gradient(135deg, #FFB300, #FF8A00); border-radius: 8px; margin-bottom: 16px;"></div>
          <h1 style="color: #EDF2FF; margin: 0 0 8px 0; font-size: 24px; font-weight: 800;">NORDASH</h1>
          <p style="color: rgba(237,242,255,0.6); margin: 0; font-size: 12px;">New Job Application</p>
        </div>

        <!-- Content -->
        <div style="padding: 40px 20px;">
          <h2 style="color: #FFB300; margin: 0 0 24px 0; font-size: 20px; font-weight: 700;">📋 New Application for ${position}</h2>

          <!-- Applicant Details -->
          <div style="background: rgba(255,179,0,0.05); border-left: 4px solid #FFB300; padding: 20px; border-radius: 4px; margin-bottom: 24px;">
            <table style="width: 100%; color: rgba(237,242,255,0.9);">
              <tr>
                <td style="padding: 8px 0; color: rgba(237,242,255,0.6); width: 120px;">Name:</td>
                <td style="padding: 8px 0; font-weight: 600;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: rgba(237,242,255,0.6);">Email:</td>
                <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #FFB300; text-decoration: none;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: rgba(237,242,255,0.6);">Phone:</td>
                <td style="padding: 8px 0;">${phone}</td>
              </tr>
              ${linkedin ? `<tr><td style="padding: 8px 0; color: rgba(237,242,255,0.6);">LinkedIn:</td><td style="padding: 8px 0;"><a href="${linkedin}" style="color: #FFB300; text-decoration: none;">View Profile</a></td></tr>` : ''}
              <tr>
                <td style="padding: 8px 0; color: rgba(237,242,255,0.6);">Position:</td>
                <td style="padding: 8px 0; font-weight: 500;">${position}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: rgba(237,242,255,0.6);">Applied:</td>
                <td style="padding: 8px 0;">${new Date().toLocaleDateString()}</td>
              </tr>
            </table>
          </div>

          <div style="background: rgba(0,0,0,0.2); padding: 16px; border-radius: 4px; margin-bottom: 24px;">
            <p style="color: rgba(237,242,255,0.6); font-size: 12px; margin: 0 0 8px 0; text-transform: uppercase; letter-spacing: 0.1em;">📎 Attachments:</p>
            <ul style="color: rgba(237,242,255,0.9); margin: 0; padding-left: 20px;">
              <li>✓ CV (${cvFile.name})</li>
              ${coverLetterFile ? `<li>✓ Cover Letter (${coverLetterFile.name})</li>` : '<li style="opacity: 0.5;">- No cover letter</li>'}
            </ul>
          </div>

          <p className="font-dm" style="color: rgba(237,242,255,0.7); font-size: 13px; line-height: 1.6; margin-bottom: 20px;">
            Review the CV and cover letter attached to this email. Contact the applicant directly to schedule an interview or move forward with the hiring process.
          </p>
        </div>

        <!-- Footer -->
        <div style="background: rgba(0,0,0,0.2); padding: 20px; text-align: center; border-top: 1px solid rgba(255,255,255,0.07);">
          <p style="color: rgba(237,242,255,0.5); font-size: 12px; margin: 0;">
            This is an automated notification from NORDASH Careers.<br>
            Nordic Precision. Asian Energy.
          </p>
        </div>
      </div>
    `;

    const applicantEmailHtml = `
      <div style="font-family: 'DM Sans', sans-serif; max-width: 600px; margin: 0 auto; padding: 0; background: #0D1626;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, rgba(255,179,0,0.1) 0%, rgba(255,179,0,0.05) 100%); padding: 40px 20px; text-align: center; border-bottom: 1px solid rgba(255,255,255,0.07);">
          <h1 style="color: #EDF2FF; margin: 0; font-size: 24px; font-weight: 800;">NORDASH</h1>
        </div>

        <!-- Content -->
        <div style="padding: 40px 20px;">
          <h2 style="color: #FFB300; margin: 0 0 24px 0; font-size: 18px; font-weight: 700;">Application Received! ✓</h2>

          <p style="color: rgba(237,242,255,0.9); margin: 0 0 16px 0; line-height: 1.6;">
            Hi ${name},
          </p>

          <p style="color: rgba(237,242,255,0.8); margin: 0 0 24px 0; line-height: 1.6;">
            Thank you for applying for the <strong>${position}</strong> position at NORDASH! We've received your application and documents.
          </p>

          <div style="background: rgba(0,229,255,0.05); border-left: 4px solid #00E5FF; padding: 20px; border-radius: 4px; margin-bottom: 24px;">
            <p style="color: #00E5FF; margin: 0; font-weight: 600; margin-bottom: 8px;">What's Next?</p>
            <p style="color: rgba(237,242,255,0.8); margin: 0; font-size: 13px; line-height: 1.6;">
              Our team will review your CV and cover letter. We'll reach out within 5-7 business days if we think there's a great fit.
            </p>
          </div>

          <p style="color: rgba(237,242,255,0.7); margin: 0 0 24px 0; font-size: 13px; line-height: 1.6;">
            In the meantime, feel free to explore our work and learn more about what we do at <a href="https://nordash.vercel.app" style="color: #FFB300; text-decoration: none;">nordash.vercel.app</a>.
          </p>

          <p style="color: rgba(237,242,255,0.8); margin: 0; line-height: 1.6;">
            Best regards,<br>
            <strong>The NORDASH Team</strong>
          </p>
        </div>

        <!-- Footer -->
        <div style="background: rgba(0,0,0,0.2); padding: 20px; text-align: center; border-top: 1px solid rgba(255,255,255,0.07);">
          <p style="color: rgba(237,242,255,0.5); font-size: 12px; margin: 0;">
            © NORDASH Agency | Nordic Precision. Asian Energy.
          </p>
        </div>
      </div>
    `;

    // Send to admin (Farheen)
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'farheen@nordash.agency',
      subject: `📋 New Application: ${name} - ${position}`,
      html: adminEmailHtml,
      attachments: attachments,
    });

    // Send confirmation to applicant
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: `Application Received - ${position} at NORDASH`,
      html: applicantEmailHtml,
    });

    // Save application to dashboard
    try {
      await fetch(new URL('/api/admin/applications', request.url), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          linkedin,
          position,
          positionId,
        }),
      });
    } catch (error) {
      console.error('Error saving application to dashboard:', error);
    }

    return Response.json({
      success: true,
      message: 'Application submitted successfully'
    });

  } catch (error) {
    console.error('Application error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

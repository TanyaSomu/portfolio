import { Resend } from 'resend';
import { ENV } from '../config/env';

const resend = ENV.RESEND_API_KEY ? new Resend(ENV.RESEND_API_KEY) : null;

interface ContactEmailParams {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const sendContactNotification = async ({
  name,
  email,
  subject,
  message,
}: ContactEmailParams): Promise<{ sent: boolean; reason?: string }> => {
  if (!resend || !ENV.RESEND_API_KEY) {
    console.warn('[EmailService] Resend API Key is not configured. Email notification skipped.');
    return { sent: false, reason: 'RESEND_API_KEY_NOT_CONFIGURED' };
  }

  try {
    // 1. Send notification to site owner
    await resend.emails.send({
      from: `Portfolio Contact <${ENV.SENDER_EMAIL}>`,
      to: [ENV.ADMIN_EMAIL],
      replyTo: email,
      subject: `New Portfolio Message: ${subject} from ${name}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
          <h2 style="color: #0f172a; margin-top: 0; font-size: 20px; border-bottom: 2px solid #10b981; padding-bottom: 12px;">New Contact Submission</h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-size: 14px; width: 100px;"><strong>Name:</strong></td>
              <td style="padding: 8px 0; color: #0f172a; font-size: 14px;">${escapeHtml(name)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-size: 14px;"><strong>Email:</strong></td>
              <td style="padding: 8px 0; color: #0f172a; font-size: 14px;"><a href="mailto:${escapeHtml(email)}" style="color: #0284c7;">${escapeHtml(email)}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-size: 14px;"><strong>Subject:</strong></td>
              <td style="padding: 8px 0; color: #0f172a; font-size: 14px;">${escapeHtml(subject)}</td>
            </tr>
          </table>
          <div style="margin-top: 20px; padding: 16px; background-color: #f8fafc; border-radius: 8px; border-left: 4px solid #10b981;">
            <p style="margin: 0; color: #334155; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${escapeHtml(message)}</p>
          </div>
          <p style="margin-top: 24px; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 12px;">
            Sent from your PERN Developer Portfolio contact form.
          </p>
        </div>
      `,
    });

    // 2. Send polite confirmation to visitor
    try {
      await resend.emails.send({
        from: `Portfolio <${ENV.SENDER_EMAIL}>`,
        to: [email],
        subject: `Thank you for reaching out, ${name}!`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
            <h2 style="color: #0f172a; margin-top: 0;">Message Received!</h2>
            <p style="color: #334155; font-size: 15px; line-height: 1.6;">
              Hi ${escapeHtml(name)},<br/><br/>
              Thank you for visiting my portfolio and taking the time to send a message regarding <strong>"${escapeHtml(subject)}"</strong>.
            </p>
            <p style="color: #334155; font-size: 15px; line-height: 1.6;">
              I have received your message and will review it promptly. If needed, I will get back to you directly at this email address.
            </p>
            <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e2e8f0; color: #64748b; font-size: 13px;">
              Warm regards,<br/>
              <strong>Developer Portfolio</strong>
            </div>
          </div>
        `,
      });
    } catch (confError) {
      console.warn('[EmailService] Confirmation email to visitor failed:', confError);
    }

    return { sent: true };
  } catch (error: any) {
    console.error('[EmailService] Failed to send email via Resend:', error);
    return { sent: false, reason: error?.message || 'RESEND_SEND_FAILED' };
  }
};

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}


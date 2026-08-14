'use server';

import { Resend } from 'resend';

export async function sendInquiryEmail(apiKey: string, recipient: string, data: any) {
  if (!apiKey || !recipient) {
    console.error('Email configuration missing: API Key or Recipient');
    return { success: false, error: 'Configuration error' };
  }

  const resend = new Resend(apiKey);

  try {
    const { data: resData, error } = await resend.emails.send({
      from: 'CodeCast UG <onboarding@resend.dev>',
      to: recipient,
      subject: `New Project Inquiry: ${data.service}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #0E1D30;">New Website Inquiry</h2>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Phone:</strong> ${data.phone || 'N/A'}</p>
          <p><strong>Service:</strong> ${data.service}</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap;">${data.message}</p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: any) {
    console.error('Server Action Email Error:', err);
    return { success: false, error: err.message };
  }
}

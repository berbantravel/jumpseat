import { transporter } from '../transporter';
import { inquiryTemplates } from '../templates/inquiry';

export const sendInquiryEmails = async (email: string) => {
  try {
    const date = new Date().toLocaleString();
    
    // Send to subscriber
    await transporter.sendMail({
      from: `Jumpseat Tours <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Thank You for Your Interest in Jumpseat Tours',
      html: inquiryTemplates.subscriber(email)
    });

    // Send to admin
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL || 'admin@berbantravel.com',
      subject: 'New Website Inquiry',
      html: inquiryTemplates.admin(email, date)
    });

    return true;
  } catch (error) {
    console.error('Inquiry email error:', error);
    return false;
  }
};
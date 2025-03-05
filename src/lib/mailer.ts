import nodemailer from 'nodemailer';

// Shared transporter configuration
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Email templates
export const EmailTemplates = {
  welcome: (firstName: string) => `
    <div style="font-family: Arial, sans-serif;">
      <h1>Welcome ${firstName}!</h1>
      <img src="${process.env.NEXTAUTH_URL}/images/welcome-banner.jpg">
    </div>
  `,
  verification: (code: string) => `
    <div>Your verification code: ${code}</div>
  `
};

// Core email sender
export const sendEmail = async (to: string, subject: string, html: string) => {
  try {
    await transporter.sendMail({
      from: `Berban Travel <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html
    });
    return true;
  } catch (error) {
    console.error('Email send failed:', error);
    return false;
  }
};
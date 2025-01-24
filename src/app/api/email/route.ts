import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: 'smtp.hostinger.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    // Email to subscriber
    const subscriberMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Thank You for Your Interest in Jumpseat Tours',
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #ffffff; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
          <div style="max-width: 480px; margin: 0 auto;">
            <h1 style="color: #ff9e39; font-size: 24px; font-weight: 600; margin-bottom: 20px;">
              Thank You for Your Interest!
            </h1>
            
            <p style="color: #4b5563; font-size: 16px; line-height: 24px; margin-bottom: 20px;">
              We've received your inquiry and we're excited to share our latest travel deals and promotions with you.
            </p>

            <p style="color: #4b5563; font-size: 16px; line-height: 24px; margin-bottom: 20px;">
              Stay tuned for updates about our exciting destinations and special offers!
            </p>

            <div style="margin-top: 30px;">
              <p style="color: #4b5563; font-size: 16px; line-height: 24px;">
                Best regards,<br>
                The Jumpseat Tours Team
              </p>
            </div>

            <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <p style="color: #6b7280; font-size: 12px; text-align: center;">
                Operated and Powered by BerBan Travel Corporation
              </p>
            </div>
          </div>
        </div>
      `
    }

    // Email to admin
    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: 'admin@berbantravel.com',
      subject: 'New Website Inquiry',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #111827; font-size: 20px; margin-bottom: 16px;">New Website Inquiry</h2>
          <p style="font-size: 16px; color: #4b5563;">
            <strong>Email:</strong> ${email}<br>
            <strong>Date:</strong> ${new Date().toLocaleString()}<br>
            <strong>Source:</strong> Website Modal Form
          </p>
        </div>
      `
    }

    // Send both emails
    await transporter.sendMail(subscriberMailOptions)
    await transporter.sendMail(adminMailOptions)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json({ success: false, error: error }, { status: 500 })
  }
}
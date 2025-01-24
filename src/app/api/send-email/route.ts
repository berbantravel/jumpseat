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

    // Only send email to admin
    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: 'admin@berbantravel.com', // Your admin email
      subject: 'New Newsletter Subscription',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #111827; font-size: 20px; margin-bottom: 16px;">New Newsletter Subscriber</h2>
          <p style="font-size: 16px; color: #4b5563;">
            <strong>Email:</strong> ${email}<br>
            <strong>Date:</strong> ${new Date().toLocaleString()}<br>
            <strong>Source:</strong> Website Newsletter Form
          </p>
        </div>
      `
    }

    await transporter.sendMail(adminMailOptions)
    return NextResponse.json({ success: true })
    
  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json({ success: false, error: error }, { status: 500 })
  }
}
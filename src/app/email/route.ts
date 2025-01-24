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
    const { type, email } = await request.json()

    if (type === 'newsletter') {
      const subscriberMailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Welcome to Jumpseat Tours! 🌏✈️',
        html: `
          <div style="font-family: Arial, sans-serif; background-color: #ffffff; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
            <div style="max-width: 480px; margin: 0 auto;">
              <h1 style="color: #ff9e39; font-size: 16px; font-weight: 500;">Welcome aboard!</h1>
              <p style="font-size: 32px; font-weight: 700; margin-top: 8px; line-height: 1.2;">
                Thank you for subscribing
              </p>
              <p style="margin-top: 8px; color: #6b7280; font-size: 16px;">
                Get ready to receive exclusive travel deals and updates directly to your inbox.
              </p>

              <div style="margin-top: 40px; text-align: center;">
                <p style="font-size: 14px; color: #4b5563;">
                  Stay tuned for exciting travel opportunities and promotions!<br>
                  We can't wait to help you explore Asia.
                </p>
                <p style="margin-top: 24px; font-size: 14px; color: #4b5563;">
                  Best regards,<br>BerBan Travel Corporation Team
                </p>
              </div>

              <div style="margin-top: 40px; border-top: 1px solid #e5e7eb; padding-top: 20px;">
                <p style="font-size: 12px; color: #6b7280; text-align: center;">
                  Operated and Powered by BerBan Travel Corporation<br>
                  This is an automated message. Please do not reply to this email.
                </p>
              </div>
            </div>
          </div>
        `
      }

      const adminNotificationOptions = {
        from: process.env.EMAIL_USER,
        to: 'admin@berbantravel.com',
        subject: 'New Newsletter Subscription',
        html: `
          <div style="font-family: Arial, sans-serif; background-color: #ffffff; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
            <div style="max-width: 480px; margin: 0 auto;">
              <h1 style="font-size: 24px; font-weight: 600; color: #111827;">New Newsletter Subscriber</h1>
              
              <div style="margin-top: 24px; padding: 20px; background-color: #f9fafb; border-radius: 8px;">
                <p style="font-size: 16px; color: #4b5563;">
                  <strong>Email:</strong> ${email}<br>
                  <strong>Date:</strong> ${new Date().toLocaleString()}<br>
                  <strong>Source:</strong> Newsletter Modal Subscription
                </p>
              </div>

              <div style="margin-top: 40px; border-top: 1px solid #e5e7eb; padding-top: 20px;">
                <p style="font-size: 12px; color: #6b7280; text-align: center;">
                  This is an automated notification from the Jumpseat Tours website.
                </p>
              </div>
            </div>
          </div>
        `
      }

      await transporter.sendMail(subscriberMailOptions)
      await transporter.sendMail(adminNotificationOptions)
      
      return NextResponse.json({ 
        success: true,
        message: 'Subscription successful' 
      })
    }

    return NextResponse.json({ 
      success: false,
      error: 'Invalid request type' 
    }, { 
      status: 400 
    })

  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to process subscription' 
    }, { 
      status: 500 
    })
  }
}
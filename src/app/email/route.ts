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
  debug: true, // Enable debug logs
});

export async function POST(request: Request) {
  // Verify credentials are available
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error('Missing email credentials in environment variables');
    return NextResponse.json({ 
      success: false, 
      error: 'Email configuration error' 
    }, { 
      status: 500 
    });
  }

  try {
    const { type, email } = await request.json()

    // Log the attempt
    console.log('Attempting to send email to:', email);
    console.log('Using email user:', process.env.EMAIL_USER);

    if (type === 'newsletter') {
      const subscriberMailOptions = {
        from: `"Jumpseat Tours" <${process.env.EMAIL_USER}>`, // Properly formatted from field
        to: email,
        subject: 'Welcome to Jumpseat Tours! 🌏✈️',
        html: `
          // ... your existing email template ...
        `
      }

      const adminNotificationOptions = {
        from: `"Jumpseat Tours" <${process.env.EMAIL_USER}>`, // Properly formatted from field
        to: 'admin@berbantravel.com',
        subject: 'New Newsletter Subscription',
        html: `
          // ... your existing admin template ...
        `
      }

      // Verify connection
      await new Promise((resolve, reject) => {
        transporter.verify(function (error, success) {
          if (error) {
            console.error('Transporter verification failed:', error);
            reject(error);
          } else {
            console.log('Server is ready to take our messages');
            resolve(success);
          }
        });
      });

      // Send emails
      await transporter.sendMail(subscriberMailOptions)
      await transporter.sendMail(adminNotificationOptions)
      
      console.log('Emails sent successfully');
      
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
    console.error('Error sending email:', error);
    // More detailed error response
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to process subscription',
      details: error instanceof Error ? error.stack : undefined
    }, { 
      status: 500 
    })
  }
}
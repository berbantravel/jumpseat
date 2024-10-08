// app/api/send-email/route.ts

import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: Request) {
  const { userInfo, tripDetails, paymentDetails } = await request.json()

  const transporter = nodemailer.createTransport({
    host: 'smtp.hostinger.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const formatPrice = (price: number | undefined) => {
    return price ? price.toFixed(2) : 'N/A';
  };

  const adminMailOptions = {
    from: process.env.EMAIL_USER,
    to: 'admin@berbantravel.com',
    subject: 'New Successful Booking',
    html: `
      <h1>New Booking Details</h1>
      <h2>Trip Information</h2>
      <p>Trip Name: ${tripDetails?.name || 'N/A'}</p>
      <p>Description: ${tripDetails?.description || 'N/A'}</p>
      <p>Price: PHP ${formatPrice(tripDetails?.price)}</p>
      <p>Quantity: ${tripDetails?.quantity || 'N/A'}</p>
      <p>Subtotal: PHP ${formatPrice(tripDetails?.subtotal)}</p>
      <p>Total: PHP ${formatPrice(tripDetails?.total)}</p>
      <h2>User Information</h2>
      <p>First Name: ${userInfo?.firstName || 'N/A'}</p>
      <p>Last Name: ${userInfo?.lastName || 'N/A'}</p>
      <p>Email: ${userInfo?.email || 'N/A'}</p>
      <p>Phone: ${userInfo?.phone || 'N/A'}</p>
      <p>Company: ${userInfo?.company || 'N/A'}</p>
      <p>Address: ${userInfo?.address || 'N/A'}</p>
      <p>Apartment/Suite: ${userInfo?.apartment || 'N/A'}</p>
      <p>City: ${userInfo?.city || 'N/A'}</p>
      <p>Country: ${userInfo?.country || 'N/A'}</p>
      <p>State/Province: ${userInfo?.region || 'N/A'}</p>
      <p>Postal Code: ${userInfo?.postalCode || 'N/A'}</p>
      <h2>Payment Information</h2>
      <p>Payment Method: ${paymentDetails?.method || 'N/A'}</p>
      <p>Transaction ID: ${paymentDetails?.transactionId || 'N/A'}</p>
      <p>Payment Status: ${paymentDetails?.status || 'N/A'}</p>
      <h2>Additional Information</h2>
      <p>Order Notes: ${userInfo?.message || 'No additional notes'}</p>
    `,
  }

  const customerMailOptions = {
    from: process.env.EMAIL_USER,
    to: userInfo?.email || 'customer@example.com',
    subject: 'Booking Confirmation - BerBan Travel Corporation',
    html: `
      <h1>Booking Confirmation</h1>
      <p>Dear ${userInfo?.firstName || 'Valued Customer'} ${userInfo?.lastName || ''},</p>
      <p>Thank you for choosing BerBan Travel Corporation. We are pleased to confirm your booking.</p>
      
      <h2>Booking Details</h2>
      <p><strong>Booking Reference:</strong> ${paymentDetails?.transactionId || 'N/A'}</p>
      <p><strong>Trip Name:</strong> ${tripDetails?.name || 'N/A'}</p>
      <p><strong>Description:</strong> ${tripDetails?.description || 'N/A'}</p>
      <p><strong>Quantity:</strong> ${tripDetails?.quantity || 'N/A'}</p>
      <p><strong>Total Amount:</strong> PHP ${formatPrice(tripDetails?.total)}</p>
      
      <h2>Payment Information</h2>
      <p><strong>Payment Method:</strong> ${paymentDetails?.method || 'N/A'}</p>
      <p><strong>Payment Status:</strong> ${paymentDetails?.status || 'N/A'}</p>
      
      <h2>Traveler Information</h2>
      <p><strong>Name:</strong> ${userInfo?.firstName || 'N/A'} ${userInfo?.lastName || 'N/A'}</p>
      <p><strong>Email:</strong> ${userInfo?.email || 'N/A'}</p>
      <p><strong>Phone:</strong> ${userInfo?.phone || 'N/A'}</p>
      
      <h2>What's Next?</h2>
      <p>Our team will process your booking and send you a detailed itinerary within the next 24 hours. If you have any questions or special requests, please don't hesitate to contact us.</p>
      
      <p>We look forward to providing you with an unforgettable travel experience!</p>
      
      <p>Best regards,<br>BerBan Travel Corporation Team</p>
      
      <hr>
      <p style="font-size: 0.8em; color: #666;">
        This is an automated message. Please do not reply to this email. If you need assistance, please contact our customer support at support@berbantravel.com or call +1234567890.
      </p>
    `,
  }

  try {
    await transporter.sendMail(adminMailOptions)
    await transporter.sendMail(customerMailOptions)
    console.log('Emails sent successfully')
    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json({ success: false, error: error }, { status: 500 })
  }
}
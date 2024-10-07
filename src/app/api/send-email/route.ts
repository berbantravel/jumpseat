// app/api/send-email/route.ts

import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: Request) {
  const { userInfo, tripDetails } = await request.json()

  // Configure nodemailer with your email service
  const transporter = nodemailer.createTransport({
    host: 'smtp.hostinger.com',
    port: 465,
    secure: true, // use SSL
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'admin@berbantravel.com',
    subject: 'New Successful Booking',
    html: `
      <h1>New Booking Details</h1>
      <h2>Trip Information</h2>
      <p>Trip Name: ${tripDetails.name}</p>
      <p>Description: ${tripDetails.description}</p>
      <h2>User Information</h2>
      <p>Name: ${userInfo.firstName} ${userInfo.lastName}</p>
      <p>Email: ${userInfo.email}</p>
      <p>Phone: ${userInfo.phone}</p>
      <p>Address: ${userInfo.address}, ${userInfo.city}, ${userInfo.country}</p>
    `,
  }

  try {
    await transporter.sendMail(mailOptions)
    console.log('Email sent successfully')
    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
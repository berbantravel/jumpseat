// pages/api/send-email.ts

import type { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { userInfo, tripDetails } = req.body

    // Configure nodemailer with your email service
    const transporter = nodemailer.createTransport({
      // Add your email service configuration here
      // For example, using Gmail:
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

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
      res.status(200).json({ success: true })
    } catch (error) {
      console.error('Error sending email:', error)
      res.status(500).json({ success: false, error: 'Failed to send email' })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: Request) {
  const { userInfo, tripDetails, paymentDetails, ipay88Payload } = await request.json()

  const transporter = nodemailer.createTransport({
    host: 'smtp.hostinger.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const adminMailOptions = {
    from: process.env.EMAIL_USER,
    to: 'admin@berbantravel.com',
    subject: 'New Successful Booking',
    html: `
    <div style="font-family: Arial, sans-serif; background-color: #ffffff; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
      <div style="max-width: 480px; margin: 0 auto;">
        <p style="font-size: 32px; font-weight: 700; margin-top: 8px; line-height: 1.2;">
          New Booking Details
        </p>
        <p style="margin-top: 8px; color: #6b7280; font-size: 16px;">
          Transaction Reference:  ${ipay88Payload?.RefNo || 'N/A'}
        </p>

        <div style="margin-top: 40px; border-top: 1px solid #e5e7eb; padding-top: 40px;">
          <h2 style="font-size: 0px; height: 1px; overflow: hidden;">Trip Information</h2>

          <div style="display: flex; border-bottom: 1px solid #e5e7eb; padding-bottom: 40px;">
            <img src="${tripDetails?.imageSrc || ''}" alt="${tripDetails?.name || 'Trip'}" style="width: 160px; height: 160px; object-fit: cover; border-radius: 8px;">
            <div style="margin-left: 24px;">
              <h4 style="font-size: 16px; font-weight: 500; color: #111827;">${tripDetails?.name || 'N/A'}</h4>
              <p style="margin-top: 8px; font-size: 14px; color: #4b5563;">${tripDetails?.description || 'N/A'}</p>
              <div style="margin-top: 24px; display: flex; justify-content: space-between; font-size: 14px;">
                <div>
                  <span style="font-weight: 500; color: #111827;">Quantity</span>
                  <span style="margin-left: 8px; color: #4b5563;">${ipay88Payload?.Quantity || 'N/A'}</span>
                </div>
                <div style="margin-left: 24px;">
                  <span style="font-weight: 500; color: #111827;">Price</span>
                  <span style="margin-left: 8px; color: #4b5563;">PHP ${tripDetails?.price?.toFixed(2) || 'N/A'}</span>
                </div>
              </div>
            </div>
          </div>

          <div style="margin-top: 40px;">
            <h3 style="font-size: 16px; font-weight: 500; color: #111827;">User information</h3>
            <p style="margin-top: 8px; font-size: 14px; color: #4b5563;">
              ${userInfo?.firstName || 'N/A'} ${userInfo?.lastName || 'N/A'}<br>
              ${userInfo?.email || 'N/A'}<br>
              ${userInfo?.phone || 'N/A'}<br>
              ${userInfo?.company || ''}
            </p>

            <h3 style="margin-top: 24px; font-size: 16px; font-weight: 500; color: #111827;">Shipping address</h3>
            <p style="margin-top: 8px; font-size: 14px; color: #4b5563;">
              ${userInfo?.address || 'N/A'}<br>
              ${userInfo?.apartment ? userInfo.apartment + '<br>' : ''}
              ${userInfo?.city || 'N/A'}, ${userInfo?.region || 'N/A'} ${userInfo?.postalCode || 'N/A'}<br>
              ${userInfo?.country || 'N/A'}
            </p>

            <h3 style="margin-top: 24px; font-size: 16px; font-weight: 500; color: #111827;">User Notes</h3>
            <p style="margin-top: 8px; font-size: 14px; color: #4b5563;">
              ${ipay88Payload?.Remark || 'N/A'}<br>
            </p>

          <table cellpadding="0" cellspacing="0" border="0" width="100%" style="font-size: 14px; margin-top: 40px; border-top: 1px solid #e5e7eb; padding-top: 20px;">
            <tr>
              <td style="padding: 10px 0;">
                <table cellpadding="0" cellspacing="0" border="0" width="100%">
                  <tr>
                    <td style="font-weight: 500; color: #111827;"><strong>Subtotal</strong></td>
                    <td style="text-align: right; color: #4b5563;">${ipay88Payload?.Currency} ${ipay88Payload?.SubTotal?.toFixed(2) || 'N/A'}</td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0;">
                <table cellpadding="0" cellspacing="0" border="0" width="100%">
                  <tr>
                    <td style="font-weight: 500; color: #111827;"><strong>Processing Fee</strong></td>
                    <td style="text-align: right; color: #4b5563;">${ipay88Payload?.Currency} ${ipay88Payload?.ProcessingFee?.toFixed(2) || 'N/A'}</td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0;">
                <table cellpadding="0" cellspacing="0" border="0" width="100%">
                  <tr>
                    <td style="font-weight: 500; color: #111827;"><strong>Total</strong></td>
                    <td style="text-align: right; font-weight: 500; color: #111827;">${ipay88Payload?.Currency} ${ipay88Payload?.Amount || 'N/A'}</td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
          </div>
        </div>
    </div>
  `,
  }

  const customerMailOptions = {
    from: process.env.EMAIL_USER,
    to: userInfo?.email || 'customer@example.com',
    subject: 'Booking Confirmation - BerBan Travel Corporation',
    html: `
    <div style="font-family: Arial, sans-serif; background-color: #ffffff; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
      <div style="max-width: 480px; margin: 0 auto;">
        <h1 style="color: #ff9e39; font-size: 16px; font-weight: 500;">Thank you!</h1>
        <p style="font-size: 32px; font-weight: 700; margin-top: 8px; line-height: 1.2;">
          It's on the way!
        </p>
        <p style="margin-top: 8px; color: #6b7280; font-size: 16px;">
          Your order ${ipay88Payload?.RefNo || 'N/A'} has been confirmed and will be processed soon.
        </p>

        <div style="margin-top: 48px;">
          <p style="font-size: 14px; font-weight: 500; color: #111827;">Transaction Reference</p>
          <p style="margin-top: 8px; color: #ff9e39; font-size: 14px; font-weight: 500;">${ipay88Payload?.RefNo || 'N/A'}</p>
        </div>

        <div style="margin-top: 40px; border-top: 1px solid #e5e7eb; padding-top: 40px;">
          <h2 style="font-size: 0px; height: 1px; overflow: hidden;">Your order</h2>

          <div style="display: flex; border-bottom: 1px solid #e5e7eb; padding-bottom: 40px;">
            <img src="${tripDetails?.imageSrc || ''}" alt="${tripDetails?.name || 'Trip'}" style="width: 160px; height: 160px; object-fit: cover; border-radius: 8px;">
            <div style="margin-left: 24px;">
              <h4 style="font-size: 16px; font-weight: 500; color: #111827;">${tripDetails?.name || 'N/A'}</h4>
              <p style="margin-top: 8px; font-size: 14px; color: #4b5563;">${tripDetails?.description || 'N/A'}</p>
              <div style="margin-top: 24px; display: flex; justify-content: space-between; font-size: 14px;">
                <div>
                  <span style="font-weight: 500; color: #111827;">Quantity</span>
                  <span style="margin-left: 8px; color: #4b5563;">${ipay88Payload?.Quantity || 'N/A'}</span>
                </div>
                <div style="margin-left: 24px;">
                  <span style="font-weight: 500; color: #111827;">Price</span>
                  <span style="margin-left: 8px; color: #4b5563;">PHP ${tripDetails?.price?.toFixed(2) || 'N/A'}</span>
                </div>
              </div>
            </div>
          </div>

          <div style="margin-top: 40px;">
            <h3 style="font-size: 16px; font-weight: 500; color: #111827;">Contact information</h3>
            <p style="margin-top: 8px; font-size: 14px; color: #4b5563;">
              ${userInfo?.firstName || 'N/A'} ${userInfo?.lastName || 'N/A'}<br>
              ${userInfo?.email || 'N/A'}<br>
              ${userInfo?.phone || 'N/A'}<br>
              ${userInfo?.company || ''}
            </p>

            <h3 style="margin-top: 24px; font-size: 16px; font-weight: 500; color: #111827;">Shipping address</h3>
            <p style="margin-top: 8px; font-size: 14px; color: #4b5563;">
              ${userInfo?.address || 'N/A'}<br>
              ${userInfo?.apartment ? userInfo.apartment + '<br>' : ''}
              ${userInfo?.city || 'N/A'}, ${userInfo?.region || 'N/A'} ${userInfo?.postalCode || 'N/A'}<br>
              ${userInfo?.country || 'N/A'}
            </p>

            <h3 style="margin-top: 24px; font-size: 16px; font-weight: 500; color: #111827;">Additional Notes</h3>
            <p style="margin-top: 8px; font-size: 14px; color: #4b5563;">
              ${ipay88Payload?.Remark || 'N/A'}<br>
            </p>

          <table cellpadding="0" cellspacing="0" border="0" width="100%" style="font-size: 14px; margin-top: 40px; border-top: 1px solid #e5e7eb; padding-top: 20px;">
            <tr>
              <td style="padding: 10px 0;">
                <table cellpadding="0" cellspacing="0" border="0" width="100%">
                  <tr>
                    <td style="font-weight: 500; color: #111827;"><strong>Subtotal</strong></td>
                    <td style="text-align: right; color: #4b5563;">${ipay88Payload?.Currency} ${ipay88Payload?.SubTotal?.toFixed(2) || 'N/A'}</td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0;">
                <table cellpadding="0" cellspacing="0" border="0" width="100%">
                  <tr>
                    <td style="font-weight: 500; color: #111827;"><strong>Processing Fee</strong></td>
                    <td style="text-align: right; color: #4b5563;">${ipay88Payload?.Currency} ${ipay88Payload?.ProcessingFee?.toFixed(2) || 'N/A'}</td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0;">
                <table cellpadding="0" cellspacing="0" border="0" width="100%">
                  <tr>
                    <td style="font-weight: 500; color: #111827;"><strong>Total</strong></td>
                    <td style="text-align: right; font-weight: 500; color: #111827;">${ipay88Payload?.Currency} ${ipay88Payload?.Amount || 'N/A'}</td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
          </div>
        </div>

        <div style="margin-top: 40px; text-align: center;">
          <p style="font-size: 14px; color: #4b5563;">
            If you have any questions or special requests, please don't hesitate to contact us.<br>
            We look forward to providing you with an unforgettable travel experience!
          </p>
          <p style="margin-top: 24px; font-size: 14px; color: #4b5563;">
            Best regards,<br>BerBan Travel Corporation Team
          </p>
        </div>

        <div style="margin-top: 40px; border-top: 1px solid #e5e7eb; padding-top: 20px;">
          <p style="font-size: 12px; color: #6b7280; text-align: center;">
            This is an automated message. Please do not reply to this email. If you need assistance, please contact our customer support at support@berbantravel.com or call +1234567890.
          </p>
        </div>
      </div>
    </div>
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
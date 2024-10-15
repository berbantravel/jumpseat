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

  // const transporter = nodemailer.createTransport({
  //   host: 'localhost',
  //   port: 1025,
  //   secure: false,
  //   ignoreTLS: true,
  // });

  const formatPrice = (price: number | undefined) => {
    return price ? price.toFixed(2) : 'N/A';
  };

  const emailStyle = `
    <style>
      body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
      .container { max-width: 600px; margin: 0 auto; padding: 20px; }
      h1 { color: #ff9e39; }
      h2 { margin-top: 20px; }
      .order-details { margin-top: 20px; border-top: 1px solid #ddd; padding-top: 20px; }
      .item { display: flex; border-bottom: 1px solid #ddd; padding: 10px 0; }
      .item-details { flex-grow: 1; }
      .item-price { text-align: right; }
      .total { font-weight: bold; margin-top: 10px; text-align: right; }
      .address { margin-top: 20px; }
    </style>
  `;

  const adminMailOptions = {
    from: process.env.EMAIL_USER,
    to: 'admin@berbantravel.com',
    // from: 'angelicramirez@su.edu.ph',
    // to: 'darrelmendoza85@gmail.com',
    subject: 'New Successful Booking',
    html: `
      ${emailStyle}
      <div class="container">
        <h1>New Booking Details</h1>
        <p>Transaction Reference: ${ipay88Payload?.RefNo || 'N/A'}</p>
        
        <div class="order-details">
          <h2>Trip Information</h2>
          <div class="item">
            <div class="item-details">
              <h3>${tripDetails?.name || 'N/A'}</h3>
              <p>${tripDetails?.description || 'N/A'}</p>
              <p>Quantity: ${ipay88Payload?.Quantity || 'N/A'}</p>
            </div>
            <div class="item-price">
              <p>PHP ${formatPrice(tripDetails?.price)}</p>
            </div>
          </div>
          
          <div class="total">
            <p>Subtotal: ${ipay88Payload?.Currency} ${ipay88Payload?.SubTotal || 'N/A'}</p>
            <p>Processing Fee: ${ipay88Payload?.Currency} ${ipay88Payload?.ProcessingFee || 'N/A'}</p>
            <p>Total: ${ipay88Payload?.Currency} ${ipay88Payload?.Amount || 'N/A'}</p>
          </div>
        </div>

        <div class="address">
          <h2>Customer Information</h2>
          <p><strong>Name:</strong> ${userInfo?.firstName || 'N/A'} ${userInfo?.lastName || 'N/A'}</p>
          <p><strong>Email:</strong> ${userInfo?.email || 'N/A'}</p>
          <p><strong>Phone:</strong> ${userInfo?.phone || 'N/A'}</p>
          <p><strong>Address:</strong><br>
            ${userInfo?.address || 'N/A'}<br>
            ${userInfo?.apartment || 'N/A'}<br>
            ${userInfo?.city || 'N/A'}, ${userInfo?.region || 'N/A'} ${userInfo?.postalCode || 'N/A'}<br>
            ${userInfo?.country || 'N/A'}
          </p>
        </div>

        <div>
          <h2>Payment Information</h2>
          <p><strong>Payment Method:</strong> ${paymentDetails?.method || 'N/A'}</p>
          <p><strong>Transaction ID:</strong> ${paymentDetails?.transactionId || 'N/A'}</p>
          <p><strong>Payment Status:</strong> ${paymentDetails?.status || 'N/A'}</p>
        </div>

        <div>
          <h2>Additional Information</h2>
          <p><strong>Order Notes:</strong> ${userInfo?.message || 'No additional notes'}</p>
        </div>
      </div>
    `,
  }

  // const customerMailOptions = {
  //   from: process.env.EMAIL_USER,
  //   // from: 'angelicramirez@su.edu.ph',
  //   to: userInfo?.email || 'customer@example.com',
  //   subject: 'Booking Confirmation - BerBan Travel Corporation',
  //   html: `
  //     <style>
  //     body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
  //     .container { max-width: 600px; margin: 0 auto; padding: 20px; }
  //     h1 { color: #ff9e39; }
  //     h2 { margin-top: 20px; }
  //     .order-details { margin-top: 20px; border-top: 1px solid #ddd; padding-top: 20px; }
  //     .item { display: flex; border-bottom: 1px solid #ddd; padding: 10px 0; }
  //     .item-details { flex-grow: 1; }
  //     .item-price { text-align: right; }
  //     .total { font-weight: bold; margin-top: 10px; text-align: right; }
  //     .address { margin-top: 20px; }
  //   </style>
  //     <div class="container">
  //       <h1>Thank you!</h1>
  //       <p>Your order ${ipay88Payload?.RefNo} has been confirmed and will be processed soon.</p>

  //       <p><strong>Transaction Reference:</strong> ${ipay88Payload?.RefNo || 'N/A'}</p>

  //       <div class="order-details">
  //         <h2>Your Order</h2>
  //         <div class="item">
  //           <div class="item-details">
  //             <h3>${tripDetails?.name || 'N/A'}</h3>
  //             <p>${tripDetails?.description || 'N/A'}</p>
  //             <p>Quantity: ${ipay88Payload?.Quantity || 'N/A'}</p>
  //           </div>
  //           <div class="item-price">
  //             <p>PHP ${formatPrice(tripDetails?.price)}</p>
  //           </div>
  //         </div>

  //         <div class="total">
  //           <p>Subtotal: ${ipay88Payload?.Currency} ${ipay88Payload?.SubTotal || 'N/A'}</p>
  //           <p>Processing Fee: ${ipay88Payload?.Currency} ${ipay88Payload?.ProcessingFee || 'N/A'}</p>
  //           <p>Total: ${ipay88Payload?.Currency} ${ipay88Payload?.Amount || 'N/A'}</p>
  //         </div>
  //       </div>

  //       <div class="address">
  //         <h2>Your Information</h2>
  //         <h3>Contact Information</h3>
  //         <p>${userInfo?.firstName || 'N/A'} ${userInfo?.lastName || 'N/A'}</p>
  //         <p>${userInfo?.email || 'N/A'}</p>
  //         <p>${userInfo?.phone || 'N/A'}</p>

  //         <h3>Shipping Address</h3>
  //         <p>${userInfo?.address || 'N/A'}</p>
  //         <p>${userInfo?.apartment || 'N/A'}</p>
  //         <p>${userInfo?.city || 'N/A'}, ${userInfo?.region || 'N/A'} ${userInfo?.postalCode || 'N/A'}</p>
  //         <p>${userInfo?.country || 'N/A'}</p>
  //       </div>

  //       <div>
  //         <h2>What's Next?</h2>
  //         <p>Our team will process your booking and send you a detailed itinerary within the next 24 hours. If you have any questions or special requests, please don't hesitate to contact us.</p>
  //         <p>We look forward to providing you with an unforgettable travel experience!</p>
  //       </div>

  //       <p>Best regards,<br>BerBan Travel Corporation Team</p>

  //       <hr>
  //       <p style="font-size: 0.8em; color: #666;">
  //         This is an automated message. Please do not reply to this email. If you need assistance, please contact our customer support at support@berbantravel.com or call +1234567890.
  //       </p>
  //     </div>
  //   `,
  // }

  const customerMailOptions = {
    from: process.env.EMAIL_USER,
    to: userInfo?.email || 'customer@example.com',
    subject: 'Booking Confirmation - BerBan Travel Corporation',
    html: `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h1 style="color: #ff9e39;">Thank you!</h1>
      <p>Your order ${ipay88Payload?.RefNo} has been confirmed and will be processed soon.</p>
      
      <p><strong>Transaction Reference:</strong> ${ipay88Payload?.RefNo || 'N/A'}</p>
      
      <div style="margin-top: 20px; border-top: 1px solid #ddd; padding-top: 20px;">
        <h2 style="margin-top: 20px;">Your Order</h2>
        <div style="display: flex; border-bottom: 1px solid #ddd; padding: 10px 0;">
          <div style="flex-grow: 1;">
            <h3>${tripDetails?.name || 'N/A'}</h3>
            <p>${tripDetails?.description || 'N/A'}</p>
            <p>Quantity: ${ipay88Payload?.Quantity || 'N/A'}</p>
          </div>
          <div style="text-align: right;">
            <p>PHP ${formatPrice(tripDetails?.price)}</p>
          </div>
        </div>
        
        <div style="font-weight: bold; margin-top: 10px; text-align: right;">
          <p>Subtotal: ${ipay88Payload?.Currency} ${ipay88Payload?.SubTotal || 'N/A'}</p>
          <p>Processing Fee: ${ipay88Payload?.Currency} ${ipay88Payload?.ProcessingFee || 'N/A'}</p>
          <p>Total: ${ipay88Payload?.Currency} ${ipay88Payload?.Amount || 'N/A'}</p>
        </div>
      </div>

      <div style="margin-top: 20px;">
        <h2>Your Information</h2>
        <h3>Contact Information</h3>
        <p>${userInfo?.firstName || 'N/A'} ${userInfo?.lastName || 'N/A'}</p>
        <p>${userInfo?.email || 'N/A'}</p>
        <p>${userInfo?.phone || 'N/A'}</p>

        <h3>Shipping Address</h3>
        <p>${userInfo?.address || 'N/A'}</p>
        <p>${userInfo?.apartment || 'N/A'}</p>
        <p>${userInfo?.city || 'N/A'}, ${userInfo?.region || 'N/A'} ${userInfo?.postalCode || 'N/A'}</p>
        <p>${userInfo?.country || 'N/A'}</p>
      </div>

      <div>
        <h2>What's Next?</h2>
        <p>Our team will process your booking and send you a detailed itinerary within the next 24 hours. If you have any questions or special requests, please don't hesitate to contact us.</p>
        <p>We look forward to providing you with an unforgettable travel experience!</p>
      </div>

      <p>Best regards,<br>BerBan Travel Corporation Team</p>

      <hr>
      <p style="font-size: 0.8em; color: #666;">
        This is an automated message. Please do not reply to this email. If you need assistance, please contact our customer support at support@berbantravel.com or call +1234567890.
      </p>
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
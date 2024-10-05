// app/api/payment-backend/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { generateSignature } from '@/lib/ipay88';

export async function POST(request: NextRequest) {
  const body = await request.json();
  
  // Log the received data (remove in production)
  console.log('Received payment notification:', body);

  // Extract relevant fields
  const {
    MerchantCode,
    PaymentId,
    RefNo,
    Amount,
    Currency,
    Status,
    Signature,
    // Add any other fields you expect from iPay88
  } = body;

  // Verify the signature
  const merchantKey = process.env.IPAY88_MERCHANT_KEY as string;
  const calculatedSignature = generateSignature({
    MerchantCode,
    RefNo,
    Amount,
    Currency,
  }, merchantKey);

  if (calculatedSignature !== Signature) {
    console.error('Invalid signature');
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  // Process the payment status
  if (Status === '1') {
    // Payment successful
    // Update your database, fulfill the order, etc.
    console.log(`Payment successful for RefNo: ${RefNo}`);
    // Implement your logic here
  } else {
    // Payment failed or other status
    console.log(`Payment failed or other status for RefNo: ${RefNo}`);
    // Implement your logic here
  }

  // Respond to iPay88
  // iPay88 expects to receive 'RECEIVEOK' if the notification was processed successfully
  return NextResponse.json({ message: 'RECEIVEOK' });
}
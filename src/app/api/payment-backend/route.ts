import { NextRequest, NextResponse } from 'next/server';
import { generateSignature } from '@/lib/ipay88';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const {
    MerchantCode,
    RefNo,
    Amount,
    Currency,
    Status,
    Signature,
  } = body;

  const merchantKey = process.env.NEXT_PUBLIC_IPAY88_MERCHANT_KEY as string;
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

  if (Status === '1') {
    // Payment successful
    console.log(`Payment successful for RefNo: ${RefNo}`);
    // Implement logic here
  } else {
    // Payment failed or other status
    console.log(`Payment failed or other status for RefNo: ${RefNo}`);
    // Implement logic here
  }

  return NextResponse.json({ message: 'RECEIVEOK' });
}
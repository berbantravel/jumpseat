import { NextRequest, NextResponse } from 'next/server';
import { generateResponseSignature } from '@/lib/ipay88';

export async function POST(request: NextRequest) {
  let body;
  try {
    // Parse raw body as URL-encoded data from iPay88
    const rawBody = await request.text();
    body = Object.fromEntries(new URLSearchParams(rawBody));
  } catch (error) {
    console.error('Failed to parse form-encoded body:', error);
    return NextResponse.json({ error: 'Invalid body format' }, { status: 400 });
  }

  console.log('Received body:', body);

  const {
    MerchantCode,
    PaymentId,
    RefNo,
    Amount,
    Currency,
    Status,
    Signature,  // This is the signature sent by iPay88
  } = body;

  const merchantKey = process.env.NEXT_PUBLIC_IPAY88_MERCHANT_KEY as string;

  // Recreate the signature based on received data
  const calculatedSignature = generateResponseSignature({
    MerchantCode,
    PaymentId,
    RefNo,
    Amount,
    Currency,
    Status,
  }, merchantKey);

  console.log('Calculated Signature:', calculatedSignature);
  console.log('Received Signature:', Signature);

  // Compare received signature with calculated one
  if (calculatedSignature !== Signature) {
    console.error('Invalid signature');
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  // Process payment status
  if (Status === '1') {
    console.log(`Payment successful for RefNo: ${RefNo}`);
    // Implement successful payment logic
  } else {
    console.log(`Payment failed or other status for RefNo: ${RefNo}`);
    // Implement failed payment logic
  }

  console.log('Returning: RECEIVEOK');
  return NextResponse.json({ message: 'RECEIVEOK' });
}


// import { NextRequest, NextResponse } from 'next/server';
// import { generateSignature } from '@/lib/ipay88';

// export async function POST(request: NextRequest) {
//   const body = await request.json();
//   console.log('Received body:', body); // Log the incoming request body
  
//   const {
//     MerchantCode,
//     RefNo,
//     Amount,
//     Currency,
//     Status,
//     Signature,
//   } = body;

//   const merchantKey = process.env.NEXT_PUBLIC_IPAY88_MERCHANT_KEY as string;
//   const calculatedSignature = generateSignature({
//     MerchantCode,
//     RefNo,
//     Amount,
//     Currency,
//   }, merchantKey);

//  // Log the calculated signature
//  console.log('Calculated Signature:', calculatedSignature);
//  console.log('Received Signature:', Signature);


//   if (calculatedSignature !== Signature) {
//     console.error('Invalid signature');
//     return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
//   }

//   if (Status === '1') {
//     // Payment successful
//     console.log(`Payment successful for RefNo: ${RefNo}`);
//     // Implement logic here
//   } else {
//     // Payment failed or other status
//     console.log(`Payment failed or other status for RefNo: ${RefNo}`);
//     // Implement logic here
//   }

//   console.log('Returning: RECEIVEOK');
//   return NextResponse.json({ message: 'RECEIVEOK' });
// }
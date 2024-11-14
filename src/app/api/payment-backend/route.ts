// app/api/payment-response/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { generateResponseSignature } from '@/lib/ipay88';  // Use the response signature function

export async function POST(request: NextRequest) {
  const body = await request.json();
  console.log('Received body:', body); // Log the incoming request body
  
  const {
    MerchantCode,
    PaymentId,
    RefNo,
    Amount,
    Currency,
    Status,
    Signature,
  } = body;

  const merchantKey = process.env.NEXT_PUBLIC_IPAY88_MERCHANT_KEY as string;

  // Calculate the response signature
  const calculatedSignature = generateResponseSignature({
    MerchantCode,
    PaymentId,
    RefNo,
    Amount,
    Currency,
    Status,
  }, merchantKey);

  // Log the calculated and received signature for debugging
  console.log('Calculated Signature:', calculatedSignature);
  console.log('Received Signature:', Signature);

  // Check if the calculated signature matches the received signature
  if (calculatedSignature !== Signature) {
    console.error('Invalid signature');
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  // Handle the payment status
  if (Status === '1') {
    console.log(`Payment successful for RefNo: ${RefNo}`);
    // Implement logic for successful payment (e.g., updating order status)
  } else {
    console.log(`Payment failed or other status for RefNo: ${RefNo}`);
    // Implement logic for failed payment (e.g., notify user)
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
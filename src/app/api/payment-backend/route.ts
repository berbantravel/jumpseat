import { NextRequest, NextResponse } from 'next/server';
import { generateSignature } from '@/lib/ipay88';

export async function POST(request: NextRequest) {
  let body: Record<string, string>;

  if (request.headers.get('content-type') === 'application/json') {
    // Parse as JSON if the content type is JSON
    body = await request.json();
  } else {
    // Otherwise, assume it's URL encoded and parse it as form data
    const formData = await request.formData();
    body = Object.fromEntries(formData.entries()) as Record<string, string>;
  }

  console.log('Received body:', body);

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

  console.log('Calculated Signature:', calculatedSignature);
  console.log('Received Signature:', Signature);

  if (calculatedSignature !== Signature) {
    console.error('Invalid signature');
    return new Response('Invalid signature', { status: 400 });
  }

  if (Status === '1') {
    console.log(`Payment successful for RefNo: ${RefNo}`);
    // Implement logic here, like updating order status
  } else {
    console.log(`Payment failed or other status for RefNo: ${RefNo}`);
    // Implement logic here if needed
  }

  console.log('Returning plain-text RECEIVEOK');
  return new Response('RECEIVEOK', { status: 200 });
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
import { NextRequest, NextResponse } from 'next/server';
import { generateSignature } from '@/lib/ipay88';

export async function POST(request: NextRequest) {
  let body: Record<string, string>;

  const contentType = request.headers.get('content-type');
  console.log('Content-Type:', contentType);

  // Determine how to parse the request body based on content type
  if (contentType?.includes('application/json')) {
    body = await request.json();
  } else if (contentType?.includes('application/x-www-form-urlencoded')) {
    const formData = await request.formData();
    body = Object.fromEntries(
      Array.from(formData.entries()).map(([key, value]) => [key, String(value)])
    );
  } else {
    return NextResponse.json({ error: 'Unsupported content type' }, { status: 400 });
  }

  console.log('Received body:', body);

  // Destructure necessary fields from the body
  const {
    MerchantCode,
    RefNo,
    Amount,
    Currency,
    Status,
    Signature,
    PaymentId,
  } = body; 

  const merchantKey = process.env.NEXT_PUBLIC_IPAY88_MERCHANT_KEY as string;

  // Format the amount correctly (remove commas and ensure two decimals)
  const formattedAmount = Number(Amount).toFixed(2).replace(',', '').trim();

  // Generate the calculated signature based on iPay88 response signature requirements
  const calculatedSignature = generateSignature(
    {
      MerchantCode,
      RefNo,
      Amount: formattedAmount,
      Currency,
 
    },
    merchantKey
  );

  console.log('Calculated Signature:', calculatedSignature);
  console.log('Received Signature:', Signature);

  // Compare calculated and received signatures
  if (calculatedSignature !== Signature) {
    console.error('Invalid signature');
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  // Handle payment success or failure
  if (Status === '1') {
    console.log(`Payment successful for RefNo: ${RefNo}`);
    // Implement logic for successful payment
  } else {
    console.log(`Payment failed or other status for RefNo: ${RefNo}`);
    // Implement logic for failed payment
  }

  // Respond with 'RECEIVEOK' to acknowledge the payment status
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
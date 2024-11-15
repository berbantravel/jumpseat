// import { NextRequest, NextResponse } from 'next/server';
// import { generateSignature } from '@/lib/ipay88';

// export async function POST(request: NextRequest) {
//   // Parse request body depending on content type
//   let body: Record<string, string>;

//   const contentType = request.headers.get('content-type');
//   console.log('Content-Type:', contentType);

//   if (contentType?.includes('application/json')) {
//     // Parse as JSON if content type is JSON
//     body = await request.json();
//   } else if (contentType?.includes('application/x-www-form-urlencoded')) {
//     // Parse as URL encoded if content type is application/x-www-form-urlencoded
//     const formData = await request.formData();

//     // Convert formData to an object with string values
//     body = Object.fromEntries(
//       Array.from(formData.entries()).map(([key, value]) => [key, String(value)])
//     );
//   } else {
//     // Return error if content type is unsupported
//     return NextResponse.json({ error: 'Unsupported content type' }, { status: 400 });
//   }

//   console.log('Received body:', body);

//   const {
//     MerchantCode,
//     RefNo,
//     Amount,
//     Currency,
//     Status,
//     Signature,
//     PaymentId,
//   } = body;

//   const merchantKey = process.env.NEXT_PUBLIC_IPAY88_MERCHANT_KEY as string;

//   // Ensure amount is formatted correctly (no commas, two decimals)
//   const formattedAmount = Amount.replace(',', '').trim();

//   // Generate signature for response (correct field order)
//   const calculatedSignature = generateSignature({
//     MerchantCode,
//     PaymentId,
//     RefNo,
//     Amount: formattedAmount,
//     Currency,
//     Status,
//   }, merchantKey); // Pass the merchantKey as the second argument

//   console.log('Calculated Signature:', calculatedSignature);
//   console.log('Received Signature:', Signature);

//   // Validate the signature
//   if (calculatedSignature !== Signature) {
//     console.error('Invalid signature');
//     return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
//   }

//   // Handle payment success or failure
//   if (Status === '1') {
//     console.log(`Payment successful for RefNo: ${RefNo}`);
//     // Implement logic for successful payment
//   } else {
//     console.log(`Payment failed or other status for RefNo: ${RefNo}`);
//     // Implement logic for failed payment
//   }

//   return NextResponse.json({ message: 'RECEIVEOK' });
// }


// import { NextRequest, NextResponse } from 'next/server';

// export async function POST(request: NextRequest) {
//   try {
//     const formData = await request.formData();
//     const data = Object.fromEntries(formData);

//     // Process the payment data here if needed
//     // Update your database or perform other actions

//     const searchParams = new URLSearchParams(data as Record<string, string>);
//     return NextResponse.redirect(`${request.nextUrl.origin}/payment-response?${searchParams.toString()}`, 303);
//   } catch (error) {
//     console.error('Error processing payment response:', error);
//     return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
//   }
// }
// payment-response route

// app/api/payment-response/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { generateSignature } from '@/lib/ipay88';

export async function POST(request: NextRequest) {
  let body: Record<string, string>;

  if (request.headers.get('content-type') === 'application/json') {
    body = await request.json();
  } else if (request.headers.get('content-type') === 'application/x-www-form-urlencoded') {
    const formData = await request.formData();
    body = Object.fromEntries(formData.entries()) as Record<string, string>;
  } else {
    console.error('Unsupported content type');
    return NextResponse.json({ error: 'Unsupported content type' }, { status: 400 });
  }

  console.log('Received body:', body);

  const { MerchantCode, RefNo, Amount, Currency, Signature: receivedSignature } = body;
  const merchantKey = process.env.NEXT_PUBLIC_IPAY88_MERCHANT_KEY as string;

  if (!merchantKey) {
    console.error('Merchant key is missing');
    return NextResponse.json({ error: 'Merchant key not found' }, { status: 500 });
  }

  // Generate the expected signature
  const calculatedSignature = generateSignature({ MerchantCode, RefNo, Amount, Currency }, merchantKey);

  console.log('Calculated Signature:', calculatedSignature);
  console.log('Received Signature:', receivedSignature);

  // Validate the signature
  if (calculatedSignature !== receivedSignature) {
    console.error('Invalid signature');
    return new Response('Invalid signature', { status: 400 });
  }

  console.log('Signature verified successfully');
  // Send RECEIVEOK response to acknowledge the backend post
  return new Response('RECEIVEOK', { status: 200 });
}


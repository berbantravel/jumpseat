// app/api/payment-response/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { generateResponseSignature } from '@/lib/ipay88';

export async function POST(request: NextRequest) {
  let body: Record<string, string>;

  // Parse the request body based on content type
  if (request.headers.get('content-type') === 'application/json') {
    body = await request.json();
  } else {
    const formData = await request.formData();
    body = Object.fromEntries(formData.entries()) as Record<string, string>;
  }

  console.log('Received body:', body);

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

  // Generate the response signature using the same parameters
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

  // Validate the signature
  if (calculatedSignature !== Signature) {
    console.error('Invalid signature');
    return new Response('Invalid signature', { status: 400 });
  }

  // Handle payment success or failure
  if (Status === '1') {
    console.log(`Payment successful for RefNo: ${RefNo}`);
    // Implement logic here for successful payment (e.g., update order status)
  } else {
    console.log(`Payment failed or other status for RefNo: ${RefNo}`);
    // Implement logic here for payment failure (e.g., notify user)
  }

  console.log('Returning: RECEIVEOK');
  return new Response('RECEIVEOK', { status: 200 });
}


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
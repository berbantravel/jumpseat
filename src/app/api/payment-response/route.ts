// app/api/payment-response/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { generateResponseSignature } from '@/lib/ipay88';  // Ensure this function is correct

export async function POST(request: NextRequest) {
  const contentType = request.headers.get('content-type');
  console.log('Content-Type:', contentType);

  let body;
  if (contentType === 'application/json') {
    body = await request.json();
  } else if (contentType === 'application/x-www-form-urlencoded') {
    const formData = await request.formData();
    body = Object.fromEntries(formData.entries());
  } else {
    return NextResponse.json({ error: 'Unsupported content type' }, { status: 400 });
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

  // Ensure amount is formatted correctly (no commas, two decimals)
  const formattedAmount = Amount.replace(',', '').trim();

  // Generate signature for response
  const calculatedSignature = generateResponseSignature({
    MerchantCode,
    PaymentId,
    RefNo,
    Amount: formattedAmount,  // Ensure proper formatting
    Currency,
    Status,
  }, merchantKey);

  console.log('Calculated Signature:', calculatedSignature);
  console.log('Received Signature:', Signature);

  // Validate the signature
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

  return NextResponse.json({ message: 'RECEIVEOK' });
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
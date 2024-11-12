import { NextRequest, NextResponse } from 'next/server';
import { generateSignature } from '@/lib/ipay88';

export async function POST(request: NextRequest) {
  let body: Record<string, string>;

  // Check content-type header to determine parsing method
  const contentType = request.headers.get('content-type');
  console.log('Content-Type:', contentType);

  if (contentType?.includes('application/json')) {
    // Parse as JSON if the content type is JSON
    body = await request.json();
  } else if (contentType?.includes('application/x-www-form-urlencoded')) {
    // Parse as URL encoded if the content type is application/x-www-form-urlencoded
    const formData = await request.formData();

    // Convert formData to a plain object with string values
    body = Object.fromEntries(
      Array.from(formData.entries()).map(([key, value]) => [key, String(value)])
    );
  } else {
    // Return error if the content type is not supported
    return NextResponse.json({ error: 'Unsupported content type' }, { status: 400 });
  }

  console.log('Received body:', body); // Log the incoming request body

  const {
    MerchantCode,
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
  const calculatedSignature = generateSignature({
    MerchantCode,
    RefNo,
    Amount: formattedAmount,  // Ensure proper formatting
    Currency,
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
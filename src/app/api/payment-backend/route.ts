import { NextRequest, NextResponse } from 'next/server';
import { generateSignature } from '@/lib/ipay88';

export async function POST(request: NextRequest) {
  let body: Record<string, string>;

  try {
    // Parse the request body based on content type
    const formData = await request.formData();
    body = Object.fromEntries(formData.entries()) as Record<string, string>;

    console.log('Received body:', body);

    const {
      MerchantCode,
      PaymentId,
      RefNo,
      Amount,
      Currency,
      Status,
      Signature, // This is the signature received from iPay88
    } = body;

    const merchantKey = process.env.IPAY88_MERCHANT_KEY as string;
    if (!merchantKey) {
      console.error('Merchant key not found');
      return new Response('Server configuration issue', { status: 500 });
    }

    // Calculate the signature using the received parameters
    const calculatedSignature = generateSignature({
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
  } catch (error) {
    console.error('Error processing request:', error);
    return new Response('Internal server error', { status: 500 });
  }
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
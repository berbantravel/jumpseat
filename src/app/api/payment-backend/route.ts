// app/api/payment-backend/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { generateSignature } from '@/lib/ipay88';

export async function POST(request: NextRequest) {
  let body: Record<string, string>;

  // Log the content type for debugging
  const contentType = request.headers.get('content-type');
  console.log('Received Content-Type:', contentType);

  try {
    // Parse the request body based on content type
    if (contentType === 'application/json') {
      body = await request.json();
    } else if (contentType === 'application/x-www-form-urlencoded' || contentType?.includes('form')) {
      const formData = await request.formData();
      body = Object.fromEntries(formData.entries()) as Record<string, string>;
    } else {
      console.error('Unsupported content type:', contentType);
      return NextResponse.json({ error: `Unsupported content type: ${contentType}` }, { status: 400 });
    }

    console.log('Received body:', body);

    const {
      MerchantCode,
      RefNo,
      Amount,
      Currency,
      Signature: receivedSignature,
      Status
    } = body;

    const merchantKey = process.env.NEXT_PUBLIC_IPAY88_MERCHANT_KEY as string;

    if (!merchantKey) {
      console.error('Merchant key is missing');
      return NextResponse.json({ error: 'Merchant key not found' }, { status: 500 });
    }

    // Generate the expected signature using the received parameters
    const calculatedSignature = generateSignature({ MerchantCode, RefNo, Amount, Currency }, merchantKey);

    console.log('Calculated Signature:', calculatedSignature);
    console.log('Received Signature:', receivedSignature);

    // Validate the signature to ensure the data integrity
    if (calculatedSignature !== receivedSignature) {
      console.error('Invalid signature');
      return new Response('Invalid signature', { status: 400 });
    }

    // Check if the payment status is '1' (successful)
    if (Status === '1') {
      console.log(`Payment successful for RefNo: ${RefNo}`);
      // Implement logic here to update the order status if it has not been updated yet
      // Example: const order = await getOrder(RefNo);
      // if (order.status !== 'completed') { await updateOrderStatus(RefNo, 'completed'); }
    } else {
      console.log(`Payment failed or other status for RefNo: ${RefNo}`);
      // Implement logic for failed or other statuses if needed
    }

    // Respond with RECEIVEOK to acknowledge receipt of the payment status
    console.log('Returning: RECEIVEOK');
    return new Response('RECEIVEOK', { status: 200 });

  } catch (error) {
    console.error('Error parsing request body:', error);
    return NextResponse.json({ error: 'Error parsing request body' }, { status: 500 });
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
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

// Payment Response handler
export async function POST(request: NextRequest) {
  try {
    // Step 1: Parse the form data received from iPay88
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    // Step 2: Extract parameters from the form data
    const {
      MerchantCode,
      RefNo,
      Amount,
      Currency,
      Status,
      Signature: receivedSignature,
    } = data as Record<string, string>;

    // Step 3: Get the merchant key from the environment
    const merchantKey = process.env.NEXT_PUBLIC_IPAY88_MERCHANT_KEY as string;

    // Check if Merchant Key exists
    if (!merchantKey) {
      console.error('Merchant Key is missing');
      return new Response('Merchant Key is missing', { status: 500 });
    }

    // Step 4: Recalculate the signature using the received data and merchant key
    const calculatedSignature = generateSignature(merchantKey, {
      MerchantCode,
      RefNo,
      Amount,
      Currency,
    });

    console.log('Calculated Signature:', calculatedSignature);
    console.log('Received Signature:', receivedSignature);

    // Step 5: Compare the calculated signature with the received signature
    if (calculatedSignature !== receivedSignature) {
      console.error('Signature mismatch:');
      console.error(`Calculated: ${calculatedSignature}`);
      console.error(`Received: ${receivedSignature}`);
      return new Response('Invalid signature', { status: 400 });
    }

    // Step 6: Take appropriate actions (e.g., updating the order status)
    if (Status === '1') {
      console.log(`Payment successful for RefNo: ${RefNo}`);
      // Update order status to 'completed'
    } else {
      console.log(`Payment failed for RefNo: ${RefNo}`);
      // Update order status to 'failed'
    }

    // Step 7: Send acknowledgment back to iPay88
    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Error processing payment response:', error);
    return NextResponse.json({ error: 'Error processing payment response' }, { status: 500 });
  }
}

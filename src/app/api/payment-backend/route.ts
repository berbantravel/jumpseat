import { NextRequest, NextResponse } from 'next/server';
import { generateSignature } from '@/lib/ipay88';

// Function to check if the order has already been updated
async function isOrderAlreadyUpdated(refNo: string): Promise<boolean> {
  // Implement your database query or logic here
  console.log(`Checking if order ${refNo} has already been updated...`);
  return false; // Example: always returns false for simplicity
}

// Function to update the order status in your database
async function updateOrderStatus(refNo: string, status: string): Promise<void> {
  // Implement your database update logic here
  console.log(`Order ${refNo} status updated to ${status}`);
}

export async function POST(request: NextRequest) {
  try {
    let body: Record<string, string>;

    // Parse the request body based on content type
    const contentType = request.headers.get('content-type');
    if (contentType === 'application/json') {
      body = await request.json();
    } else if (contentType === 'application/x-www-form-urlencoded' || contentType?.includes('form')) {
      const formData = await request.formData();
      body = Object.fromEntries(formData.entries()) as Record<string, string>;
    } else {
      console.error('Unsupported content type:', contentType);
      return new Response('Unsupported content type', { status: 400 });
    }

    console.log('Received body:', body);

    // Extract required fields from the request body
    const {
      MerchantCode,
      RefNo,
      Amount,
      Currency,
      Status,
      Signature: receivedSignature,
    } = body;

    // Validate required fields
    if (!MerchantCode || !RefNo || !Amount || !Currency || !Status || !receivedSignature) {
      console.error('Missing required fields in the request body');
      return new Response('Missing required fields', { status: 400 });
    }

    // Retrieve the merchant key from environment variables
    const merchantKey = process.env.NEXT_PUBLIC_IPAY88_MERCHANT_KEY;
    if (!merchantKey) {
      console.error('Merchant key is missing in environment variables');
      return new Response('Merchant key is not configured', { status: 500 });
    }

    // Format the amount as required by iPay88
    const formattedAmount = Number(Amount).toFixed(2).replace('.', '');

    // Generate the expected signature using the received parameters
    const calculatedSignature = generateSignature(merchantKey, {
      MerchantCode,
      RefNo,
      Amount: formattedAmount,
      Currency,
    });

    console.log('Calculated Signature:', calculatedSignature);
    console.log('Received Signature:', receivedSignature);

    // Validate the received signature
    if (calculatedSignature !== receivedSignature) {
      console.error('Signature mismatch! Invalid signature.');
      return new Response('Invalid signature', { status: 400 });
    }

    // Check if the order has already been updated
    if (await isOrderAlreadyUpdated(RefNo)) {
      console.log(`Order ${RefNo} has already been updated. Skipping further processing.`);
      return new Response('RECEIVEOK'); // Plain text acknowledgment
    }

    // Update the order status based on the payment status
    if (Status === '1') {
      console.log(`Payment successful for RefNo: ${RefNo}`);
      await updateOrderStatus(RefNo, 'completed');
    } else {
      console.log(`Payment failed or other status for RefNo: ${RefNo}`);
      await updateOrderStatus(RefNo, 'failed');
    }

    // Respond with plain text acknowledgment
    return new Response('RECEIVEOK');
  } catch (error: unknown) {
    console.error('Error processing payment-backend request:', error);
    return new Response('Error processing request', { status: 500 });
  }
}


// import { NextRequest, NextResponse } from 'next/server';
// import { generateSignature } from '@/lib/ipay88';

// // Mock function for checking if the order has already been updated
// async function isOrderAlreadyUpdated(refNo: string): Promise<boolean> {
//   // Implement logic here to check if the order with the given `refNo` has been updated
//   // Example: Query the database to see if the order status is already 'completed' or updated
//   return false; // Change this based on actual logic
// }

// // Mock function for updating the order status
// async function updateOrderStatus(refNo: string, status: string) {
//   // Implement logic here to update the order status in your database
//   console.log(`Order ${refNo} status updated to ${status}`);
// }

// export async function POST(request: NextRequest) {
//   let body: Record<string, string>;

//   try {
//     // Parse the request body based on content type
//     const contentType = request.headers.get('content-type');
//     if (contentType === 'application/json') {
//       body = await request.json();
//     } else if (contentType === 'application/x-www-form-urlencoded' || contentType?.includes('form')) {
//       const formData = await request.formData();
//       body = Object.fromEntries(formData.entries()) as Record<string, string>;
//     } else {
//       console.error('Unsupported content type:', contentType);
//       return new Response('Unsupported content type', { status: 400 });
//     }

//     console.log('Received body:', body);

//     const {
//       MerchantCode,
//       RefNo,
//       Amount,
//       Currency,
//       Status,
//       Signature: receivedSignature,
//     } = body;

//     const merchantKey = process.env.NEXT_PUBLIC_IPAY88_MERCHANT_KEY as string;
//     if (!merchantKey) {
//       console.error('Merchant key is missing');
//       return new Response('Merchant key not found', { status: 500 });
//     }

//     // Generate the expected signature using the received parameters
//     const calculatedSignature = generateSignature({ MerchantCode, RefNo, Amount, Currency }, merchantKey);
//     console.log('Calculated Signature:', calculatedSignature);
//     console.log('Received Signature:', receivedSignature);

//     // Validate the signature
//     if (calculatedSignature !== receivedSignature) {
//       console.error('Invalid signature');
//       return new Response('Invalid signature', { status: 400 });
//     }

//     // Check if the order has already been updated to avoid duplicate processing
//     if (await isOrderAlreadyUpdated(RefNo)) {
//       console.log(`Order ${RefNo} has already been updated. Skipping processing.`);
//       return new Response('RECEIVEOK'); // Return plain text acknowledgment
//     }

//     // Update the order status if payment was successful (Status '1' indicates success)
//     if (Status === '1') {
//       console.log(`Payment successful for RefNo: ${RefNo}`);
//       await updateOrderStatus(RefNo, 'completed');
//     } else {
//       console.log(`Payment failed or other status for RefNo: ${RefNo}`);
//       await updateOrderStatus(RefNo, 'failed');
//     }

//     // Respond with plain text 'RECEIVEOK' to acknowledge the response
//     return new Response('RECEIVEOK');
//   } catch (error) {
//     console.error('Error handling the request:', error);
//     return new Response('Error processing request', { status: 500 });
//   }
// }


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
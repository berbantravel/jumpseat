import { NextApiRequest, NextApiResponse } from 'next';
import { generateSignature } from '@/lib/ipay88';

/**
 * Payment Backend Handler
 * Handles iPay88's response to the BackendURL.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  try {
    const contentType = req.headers['content-type'];

    // Parse the request body
    let body: Record<string, string>;
    if (contentType === 'application/json') {
      body = req.body;
    } else if (
      contentType === 'application/x-www-form-urlencoded' ||
      contentType?.includes('form')
    ) {
      const rawBody = await new Promise<string>((resolve, reject) => {
        let data = '';
        req.on('data', (chunk) => {
          data += chunk;
        });
        req.on('end', () => resolve(data));
        req.on('error', (err) => reject(err));
      });
      const formData = new URLSearchParams(rawBody);
      body = Object.fromEntries(formData.entries());
    } else {
      console.error('Unsupported Content-Type:', contentType);
      return res.status(400).send('Unsupported Content-Type');
    }

    console.log('Received Body:', body);

    // Destructure parameters
    const {
      MerchantCode,
      RefNo,
      Amount,
      Currency,
      Status,
      Signature: receivedSignature,
    } = body;

    if (!MerchantCode || !RefNo || !Amount || !Currency || !Status || !receivedSignature) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    const merchantKey = process.env.NEXT_PUBLIC_IPAY88_MERCHANT_KEY as string;
    if (!merchantKey) {
      throw new Error('MerchantKey is not set in environment variables.');
    }

    // Format the amount to match iPay88's format
    const formattedAmount = Number(Amount).toFixed(2).replace('.', '');

    // Generate the signature for verification
    const calculatedSignature = generateSignature({
      merchantKey,
      merchantCode: MerchantCode,
      refNo: RefNo,
      amount: formattedAmount,
      currency: Currency,
    });

    console.log('Calculated Signature:', calculatedSignature);
    console.log('Received Signature:', receivedSignature);

    // Validate the signature
    if (calculatedSignature !== receivedSignature) {
      console.error('Signature mismatch!');
      return res.status(400).send('Invalid Signature');
    }

    // Process the transaction based on the Status
    if (Status === '1') {
      console.log(`Payment successful for RefNo: ${RefNo}`);
      // Add logic to update your order as "paid" in your database
    } else {
      console.log(`Payment failed or has a different status for RefNo: ${RefNo}`);
      // Add logic to update your order as "failed" or "pending"
    }

    // Acknowledge receipt of the backend post with "RECEIVEOK"
    return res.status(200).send('RECEIVEOK');
  } catch (error: any) {
    console.error('Error in payment backend:', error.message);
    res.status(500).send('Internal Server Error');
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
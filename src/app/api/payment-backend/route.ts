import { NextRequest } from 'next/server';
import { generateSignature } from '@/lib/ipay88';

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const payload = Object.fromEntries(formData.entries());

        // Log the raw payload for debugging
        console.log('Raw Payment Notification:', payload);

        const {
            MerchantCode,
            PaymentId,
            RefNo,
            Amount,
            Currency,
            Status,
            Signature: receivedSignature,
            TransId,
            AuthCode,
        } = payload as Record<string, string>;

        // Log formatted payment details
        console.log('Payment Details:', {
            refNo: RefNo,
            transId: TransId,
            amount: `${Amount} ${Currency}`,
            status: Status === '1' ? 'SUCCESS' : 'FAILED',
            timestamp: new Date().toISOString()
        });

        // Validate Merchant Key
        const merchantKey = process.env.IPAY88_MERCHANT_KEY; // Remove NEXT_PUBLIC_
        if (!merchantKey) {
            console.error('Missing Merchant Key');
            // Still return RECEIVEOK even if key is missing
            return new Response('RECEIVEOK', {
                status: 200,
                headers: {
                    'Content-Type': 'text/plain',
                    'Cache-Control': 'no-store'
                }
            });
        }

        // Verify signature
        const calculatedSignature = generateSignature(
            merchantKey,
            {
                MerchantCode,
                PaymentId,
                RefNo,
                Amount,
                Currency,
                Status
            },
            'response'
        );

        // Log signature verification
        console.log('Signature Check:', {
            match: calculatedSignature === receivedSignature,
            refNo: RefNo
        });

        // Process payment status
        if (Status === '1') {
            console.log('✅ Payment Success:', {
                refNo: RefNo,
                transId: TransId,
                amount: Amount,
                authCode: AuthCode
            });
        } else {
            console.log('❌ Payment Failed:', {
                refNo: RefNo,
                error: payload.ErrDesc || 'Unknown error'
            });
        }

        // Always return RECEIVEOK with correct headers
        return new Response('RECEIVEOK', {
            status: 200,
            headers: {
                'Content-Type': 'text/plain',
                'Cache-Control': 'no-store',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST'
            }
        });

    } catch (error) {
        // Log the error but still return RECEIVEOK
        console.error('Backend Error:', error);
        
        return new Response('RECEIVEOK', {
            status: 200,
            headers: {
                'Content-Type': 'text/plain',
                'Cache-Control': 'no-store',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST'
            }
        });
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
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

import { NextRequest, NextResponse } from 'next/server';
import { generateSignature } from '@/lib/ipay88';

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get('content-type') || '';

    if (contentType.includes('application/x-www-form-urlencoded')) {
      const formData = await request.formData();
      const data = Object.fromEntries(
        Array.from(formData.entries()).map(([key, value]) => [key, String(value)])
      ) as Record<string, string>;

      console.log('Received body:', data);

      const {
        MerchantCode,
        RefNo,
        Amount,
        Currency,
        Status,
        Signature,
      } = data;

      const merchantKey = process.env.NEXT_PUBLIC_IPAY88_MERCHANT_KEY as string;
      const formattedAmount = Number(Amount).toFixed(2).replace(',', '').replace('.', '').trim();
      // Debug formattedAmount
      console.log('Original Amount:', Amount);
      console.log('Formatted Amount:', formattedAmount);

      // Generate the string to hash
      const stringToHash = `${merchantKey}${MerchantCode}${RefNo}${formattedAmount}${Currency}`;
      console.log('String to Hash:', stringToHash);

      const calculatedSignature = generateSignature(
        {
          MerchantCode,
          RefNo,
          Amount: formattedAmount,
          Currency,
        },
        merchantKey
      );

      console.log('Calculated Signature:', calculatedSignature);
      console.log('Received Signature:', Signature);
      console.log('MerchantCode:', MerchantCode);
      console.log('RefNo:', RefNo);
      console.log('Formatted Amount:', formattedAmount);
      console.log('Currency:', Currency);
      console.log('Status:', Status);

      if (calculatedSignature !== Signature) {
        console.error('Invalid signature');
        return new NextResponse("Invalid signature", { status: 400 });
      }

      if (Status === '1') {
        console.log(`Payment successful for RefNo: ${RefNo}`);
        // Implement logic for successful payment
      } else {
        console.log(`Payment failed or other status for RefNo: ${RefNo}`);
        // Implement logic for failed payment
      }

      // Return plain text "RECEIVEOK"
      return new NextResponse('RECEIVEOK', { status: 200, headers: { 'Content-Type': 'text/plain' } });
    } else {
      return new NextResponse('Unsupported content type', { status: 400 });
    }
  } catch (error) {
    console.error('Error processing payment response:', error);
    return new NextResponse('Internal server error', { status: 500 });
  }
}

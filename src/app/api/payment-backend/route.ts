// File: pages/api/payment-backend.ts
import { NextRequest, NextResponse } from 'next/server';
import { generateSignature } from '@/lib/ipay88';

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get('content-type') || '';

    let body: Record<string, string>;

    if (contentType.indexOf('application/json') !== -1) {
      body = await request.json();
    } else if (contentType.indexOf('application/x-www-form-urlencoded') !== -1) {
      const formData = await request.formData();
      body = Object.fromEntries(
        Array.from(formData.entries()).map(([key, value]) => [key, String(value)])
      );
    } else {
      return NextResponse.json({ error: 'Unsupported content type' }, { status: 400 });
    }

    console.log('Received body:', body);

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
    const formattedAmount = Number(Amount.replace(',', '').trim()).toFixed(2).replace('.', '');

    // Debug formattedAmount and stringToHash
    console.log('Original Amount:', Amount);
    console.log('Formatted Amount:', formattedAmount);

    // Ensure formattedAmount is included in stringToHash
    const stringToHash = `${merchantKey}${MerchantCode}${RefNo}${formattedAmount}${Currency}`;
    console.log('String to Hash:', stringToHash);

    // Generate the signature for the response
    const calculatedSignature = generateSignature({
      MerchantCode,
      RefNo,
      Amount: formattedAmount,
      Currency,
    }, merchantKey);

    console.log('Calculated Signature:', calculatedSignature);
    console.log('Received Signature:', Signature);
    console.log('MerchantCode:', MerchantCode);
    console.log('RefNo:', RefNo);
    console.log('Formatted Amount:', formattedAmount);
    console.log('Currency:', Currency);
    console.log('Status:', Status);

    if (calculatedSignature !== Signature) {
      console.error('Invalid signature');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    if (Status === '1') {
      // Payment successful
      console.log(`Payment successful for RefNo: ${RefNo}`);
      // Implement logic here, like updating order status
    } else {
      // Payment failed or other status
      console.log(`Payment failed or other status for RefNo: ${RefNo}`);
      // Implement logic here if needed
    }

    console.log('Returning plain-text RECEIVEOK');
    return new NextResponse('RECEIVEOK', { status: 200, headers: { 'Content-Type': 'text/plain' } });

  } catch (error) {
    console.error('Error processing payment response:', error);
    return new NextResponse('Internal server error', { status: 500 });
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
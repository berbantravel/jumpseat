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

      const stringToHash = `${merchantKey}${MerchantCode}${RefNo}${formattedAmount}${Currency}`;
      console.log('String to Hash:', stringToHash);  // Verify the string

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
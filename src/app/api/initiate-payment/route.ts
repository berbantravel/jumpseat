import { NextRequest, NextResponse } from 'next/server';
import { generateSignature } from '@/lib/ipay88';

interface PaymentRequestBody {
  MerchantCode: string;
  RefNo: string;
  Amount: string;
  Currency: string;
  // Only include the necessary fields
  [key: string]: string;
}

export async function POST(request: NextRequest) {
  const body: PaymentRequestBody = await request.json();
  const { MerchantCode, RefNo, Amount, Currency } = body;
  const merchantKey = process.env.NEXT_PUBLIC_IPAY88_MERCHANT_KEY as string;

  // Format Amount: Remove commas and ensure the correct format
  const formattedAmount = Number(Amount).toFixed(2).replace(',', '').replace('.', '');

  // Generate signature using formatted amount and required parameters
  const signature = generateSignature({
    MerchantCode,
    RefNo,
    Amount: formattedAmount, // Use formatted amount
    Currency,
  }, merchantKey);

  // Log the signature for debugging
  console.log('Generated Signature:', signature);

  const paymentPayload = {
    ...body,
    Signature: signature,  // Attach signature to the payload
  };

  // Return the payment payload with the signature
  return NextResponse.json({ success: true, payload: paymentPayload });
}


// app/api/initiate-payment/route.ts
// import { NextRequest, NextResponse } from 'next/server';
// import { generateSignature } from '@/lib/ipay88';

// interface PaymentRequestBody {
//     MerchantCode: string;
//     RefNo: string;
//     Amount: string;
//     Currency: string;
//     [key: string]: string;
// }

// export async function POST(request: NextRequest) {
//     const body: PaymentRequestBody = await request.json();
//     const { MerchantCode, RefNo, Amount, Currency } = body;
//     const merchantKey = process.env.NEXT_PUBLIC_IPAY88_MERCHANT_KEY as string;
    
//     // console.log(merchantKey);
//     const signature = generateSignature({ MerchantCode, RefNo, Amount, Currency }, merchantKey);
//     // console.log(signature);

//     const paymentPayload = {
//         ...body,
//         Signature: signature
//     };

//     return NextResponse.json({ success: true, payload: paymentPayload });
// }
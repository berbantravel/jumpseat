// app/api/initiate-payment/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { generateSignature } from '@/lib/ipay88';

interface PaymentRequestBody {
  MerchantCode: string;
  RefNo: string;
  Amount: string;
  Currency: string;
  [key: string]: string; // Allows for additional dynamic fields
}

export async function POST(request: NextRequest) {
  try {
    // Step 1: Parse the request body
    const body: PaymentRequestBody = await request.json();
    const { MerchantCode, RefNo, Amount, Currency } = body;

    // Step 2: Retrieve the merchantKey from the environment variables
    const merchantKey = process.env.NEXT_PUBLIC_IPAY88_MERCHANT_KEY as string;

    if (!merchantKey || !MerchantCode || !RefNo || !Amount || !Currency) {
      console.error('Missing required fields for signature generation');
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Step 3: Generate the signature
    const signature = generateSignature(merchantKey, {
      MerchantCode,
      RefNo,
      Amount,
      Currency,
    });
    console.log('Generated Signature:', signature);

    // Step 4: Construct the payment payload
    const paymentPayload = {
      ...body,
      Signature: signature,
    };
    console.log('Payload sent to iPay88:', paymentPayload);

    // Step 5: Return the constructed payload
    return NextResponse.json({ success: true, payload: paymentPayload });
  } catch (error) {
    console.error('Error in initiate-payment:', error);
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

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
// app/api/initiate-payment/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { generateSignature } from '@/lib/ipay88';

interface PaymentRequestBody {
  MerchantCode: string;
  RefNo: string;
  Amount: string;
  Currency: string;
  [key: string]: string;
}

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body: PaymentRequestBody = await request.json();
    const { MerchantCode, RefNo, Amount, Currency } = body;

    // Validate required fields
    if (!MerchantCode || !RefNo || !Amount || !Currency) {
      console.error('Missing required parameters in initiate-payment');
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
    }

    // Retrieve the merchant key from environment variables
    const merchantKey = process.env.NEXT_PUBLIC_IPAY88_MERCHANT_KEY;
    if (!merchantKey) {
      console.error('Merchant key is missing in environment variables');
      return NextResponse.json({ error: 'Merchant key is not configured' }, { status: 500 });
    }

    // Generate the signature
    const signature = generateSignature(merchantKey, {
      MerchantCode,
      RefNo,
      Amount: Number(Amount).toFixed(2).replace('.', ''), // Format the amount as required
      Currency,
    });

    console.log('Generated Signature:', signature);

    // Construct the payload to be sent to iPay88
    const paymentPayload = {
      ...body,
      Signature: signature,
    };

    console.log('Payload sent to iPay88:', paymentPayload);

    return NextResponse.json({ success: true, payload: paymentPayload });
  } catch (error) {
    console.error('Error in initiate-payment:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
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
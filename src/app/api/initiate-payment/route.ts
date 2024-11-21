import { NextRequest, NextResponse } from 'next/server';
import { generateSignature } from '@/lib/ipay88';

// This is the POST handler for the initiate-payment API
export async function POST(req: NextRequest) {
  try {
    // Step 1: Parse incoming JSON body
    const body = await req.json();
    const { MerchantCode, RefNo, Amount, Currency, PaymentId } = body;

    // Validate required parameters
    if (!MerchantCode || !RefNo || !Amount || !Currency || !PaymentId) {
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
    }

    // Step 2: Format Amount to match iPay88's format
    const formattedAmount = Number(Amount).toFixed(2).replace('.', '');

    // Step 3: Generate the signature
    const merchantKey = process.env.NEXT_PUBLIC_IPAY88_MERCHANT_KEY;
    if (!merchantKey) {
      return NextResponse.json({ error: 'MerchantKey not set in environment variables' }, { status: 500 });
    }
    const signature = generateSignature({
      merchantKey,
      merchantCode: MerchantCode,
      refNo: RefNo,
      amount: formattedAmount,
      currency: Currency,
    });

    console.log('Generated Signature:', signature);

    // Step 4: Construct the payload to be sent to iPay88
    const payload = {
      MerchantCode,
      PaymentId,
      RefNo,
      Amount: formattedAmount,
      Currency,
      Signature: signature,
      Lang: process.env.NEXT_PUBLIC_IPAY88_LANG,
      ResponseURL: `${process.env.NEXT_PUBLIC_SITE_URL}/api/payment-response`,
      BackendURL: `${process.env.NEXT_PUBLIC_SITE_URL}/api/payment-backend`,
    };

    // Step 5: Return the payload for client-side form submission
    return NextResponse.json({ success: true, payload });
  } catch (error: any) {
    console.error('Error in initiate-payment route:', error.message);
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
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
    // Extract the request body
    const body: PaymentRequestBody = await request.json();
    const { MerchantCode, RefNo, Amount, Currency } = body;

    // Retrieve merchant key from the environment
    const merchantKey = process.env.NEXT_PUBLIC_IPAY88_MERCHANT_KEY as string;

    // Validate required fields
    if (!merchantKey) {
        console.error('Merchant Key is missing');
        return new Response('Merchant Key not found', { status: 500 });
    }

    // Generate the signature using the request parameters
    const signature = generateSignature(merchantKey, { MerchantCode, RefNo, Amount, Currency });
    console.log("Generated Signature:", signature);

    // Prepare the payload to be sent to iPay88
    const paymentPayload = {
        ...body,
        Signature: signature,  // Add the signature to the payload
    };

    // Log the payload being sent to iPay88 for debugging
    console.log('Payload sent to iPay88:', paymentPayload);

    // Return the response as JSON
    return NextResponse.json({ success: true, payload: paymentPayload });
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
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

// src/app/api/initiate-payment/route.ts
export async function POST(request: NextRequest) {
    try {
        const body: PaymentRequestBody = await request.json();
        const { MerchantCode, RefNo, Amount, Currency } = body;
        const merchantKey = process.env.IPAY88_MERCHANT_KEY; // Remove NEXT_PUBLIC_
        
        if (!merchantKey) {
            throw new Error('Merchant key not configured');
        }

        const signature = generateSignature(merchantKey, {
            MerchantCode,
            RefNo,
            Amount,
            Currency
        }, 'request');

        const paymentPayload = {
            ...body,
            ResponseURL: `${process.env.NEXT_PUBLIC_SITE_URL}/api/payment-response`,
            BackendURL: `${process.env.NEXT_PUBLIC_SITE_URL}/api/payment-backend`,
            Signature: signature
        };

        console.log('Payment Initiation:', {
            refNo: RefNo,
            amount: Amount,
            signature: signature.substring(0, 10) + '...'
        });

        return NextResponse.json({ success: true, payload: paymentPayload });
    } catch (error) {
        console.error('Payment Initiation Error:', error);
        return NextResponse.json({ error: 'Payment initiation failed' }, { status: 500 });
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
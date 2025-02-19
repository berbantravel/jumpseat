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
    const body: PaymentRequestBody = await request.json();
    const { MerchantCode, RefNo, Amount, Currency } = body;
    // const merchantKey = process.env.NEXT_PUBLIC_IPAY88_MERCHANT_KEY as string;
    const merchantKey = "NVRs7KlAsV";


    // console.log(merchantKey);
    const signature = generateSignature(merchantKey,{MerchantCode,RefNo,Amount,Currency});
    console.log('Initiate Payment Signature:', signature);
    console.log('Environment variables:', {
        merchantCode: "PH01663",
        nodeEnv: process.env.NODE_ENV
    });
    const paymentPayload = {
        ...body,
        Signature: signature
        
    };
    console.log('Payload sent to iPay88:', paymentPayload);

    return NextResponse.json({ success: true, payload: paymentPayload });
}

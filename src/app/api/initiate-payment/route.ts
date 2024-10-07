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
    const merchantKey = process.env.IPAY88_MERCHANT_KEY as string;

    const signature = generateSignature({ MerchantCode, RefNo, Amount, Currency }, merchantKey);
    
    const paymentPayload = {
        ...body,
        Signature: signature
    };

    return NextResponse.json({ success: true, payload: paymentPayload });
}
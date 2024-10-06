// app/api/initiate-payment/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { generateSignature } from '@/lib/ipay88';

interface PaymentRequestBody {
    MerchantCode: string;
    RefNo: string;
    Amount: string;
    Currency: string;
    [key: string]: string; // For any additional fields
}

export async function POST(request: NextRequest) {
    const body: PaymentRequestBody = await request.json();
    const { MerchantCode, RefNo, Amount, Currency } = body;
    const merchantKey = process.env.NEXT_PUBLIC_IPAY88_MERCHANT_KEY as string;

    const signature = generateSignature({ MerchantCode, RefNo, Amount, Currency }, merchantKey);
    console.log('Generated Signature:', signature);

    // Add the signature to your payment request payload
    const paymentPayload = {
        ...body,
        Signature: signature
    };
    console.log('Full Payment Payload:', paymentPayload);

    // Here you would typically send paymentPayload to iPay88 API
    // For now, we'll just return it
    return NextResponse.json({ success: true, payload: paymentPayload });
}
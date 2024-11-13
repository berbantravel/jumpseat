// app/api/initiate-payment/route.ts
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
    const body: PaymentRequestBody = await request.json();
    const { MerchantCode, RefNo, Amount, Currency } = body;

    const merchantKey = process.env.NEXT_PUBLIC_IPAY88_MERCHANT_KEY as string;
    const formattedAmount = Number(Amount).toFixed(2).replace(',', '').trim();

    const signature = generateSignature({ MerchantCode, RefNo, Amount: formattedAmount, Currency }, merchantKey);

    // Prepare the payload for iPay88 request
    const paymentPayload = {
      ...body,
      Amount: formattedAmount,
      Signature: signature,
    };

    console.log('Payment request payload:', paymentPayload);

    return NextResponse.json({ success: true, payload: paymentPayload });
  } catch (error) {
    console.error('Error processing payment request:', error);
    return NextResponse.json({ success: false, error: 'Failed to process payment request' });
  }
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
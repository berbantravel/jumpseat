// app/api/initiate-payment/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { generateSignature } from '@/lib/ipay88';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { MerchantCode, RefNo, Amount, Currency } = body;
  const merchantKey = process.env.NEXT_PUBLIC_IPAY88_MERCHANT_KEY as string;

  if (!merchantKey) {
    console.error('Merchant key is missing');
    return NextResponse.json({ success: false, error: 'Merchant key not found' });
  }

  const signature = generateSignature({ MerchantCode, RefNo, Amount, Currency }, merchantKey);
  console.log('Generated Signature:', signature);

  const paymentPayload = {
    ...body,
    Signature: signature
  };

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
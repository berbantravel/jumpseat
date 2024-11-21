import { NextRequest, NextResponse } from 'next/server';
import { generateSignature } from '@/lib/ipay88';

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();

    const {
      MerchantCode,
      RefNo,
      Amount,
      Currency,
      PaymentId,
      ProdDesc,
      UserName,
      UserEmail,
      UserContact,
      Remark,
    } = body;

    // Validate required fields
    if (
      !MerchantCode ||
      !RefNo ||
      !Amount ||
      !Currency ||
      !PaymentId ||
      !ProdDesc ||
      !UserName ||
      !UserEmail ||
      !UserContact
    ) {
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
    }

    // Format amount for iPay88 (remove decimals)
    const formattedAmount = Number(Amount).toFixed(2).replace('.', '');

    // Generate the signature
    const merchantKey = process.env.NEXT_PUBLIC_IPAY88_MERCHANT_KEY as string;
    const signature = generateSignature({
      merchantKey,
      merchantCode: MerchantCode,
      refNo: RefNo,
      amount: formattedAmount,
      currency: Currency,
    });

    // Prepare payload
    const payload = {
      MerchantCode,
      RefNo,
      Amount: formattedAmount,
      Currency,
      PaymentId,
      ProdDesc,
      UserName,
      UserEmail,
      UserContact,
      Remark,
      Lang: process.env.NEXT_PUBLIC_IPAY88_LANG,
      Signature: signature,
      ResponseURL: `${process.env.NEXT_PUBLIC_SITE_URL}/api/payment-response`,
      BackendURL: `${process.env.NEXT_PUBLIC_SITE_URL}/api/payment-backend`,
    };

    console.log('Payload:', payload);

    // Return the payload
    return NextResponse.json({ success: true, payload });
  } catch (error) {
    console.error('Error in initiate-payment:', error instanceof Error ? error.message : error);
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
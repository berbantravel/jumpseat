import { NextApiRequest, NextApiResponse } from 'next';
import { generateSignature } from '@/lib/ipay88';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      MerchantCode,
      RefNo,
      Amount,
      Currency,
      ProdDesc,
      UserName,
      UserEmail,
      UserContact,
      Remark,
    } = req.body;

    const merchantKey = process.env.NEXT_PUBLIC_IPAY88_MERCHANT_KEY as string;

    if (!merchantKey) {
      throw new Error('MerchantKey is not set in environment variables.');
    }

    const signature = generateSignature({
      merchantKey,
      merchantCode: MerchantCode,
      refNo: RefNo,
      amount: Amount,
      currency: Currency,
    });

    const payload = {
      MerchantCode,
      RefNo,
      Amount,
      Currency,
      ProdDesc,
      UserName,
      UserEmail,
      UserContact,
      Remark,
      Signature: signature,
    };

    console.log('Payload sent to iPay88:', payload);
    res.status(200).json({ success: true, payload });
  } catch (error: any) {
    console.error('Error initiating payment:', error.message);
    res.status(500).json({ error: error.message });
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
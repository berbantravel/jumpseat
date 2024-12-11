// src/lib/ipay88.ts
import crypto from 'crypto';

interface SignatureParams {
    MerchantCode: string;
    RefNo: string;
    Amount: string;
    Currency: string;
    PaymentId?: string;
    Status?: string;
}

// Test function to verify signature generation
export function testSignatureGeneration() {
    const testData = {
        merchantKey: process.env.NEXT_PUBLIC_IPAY88_MERCHANT_KEY as string, // 'NVRs7KlAsV'
        merchantCode: process.env.NEXT_PUBLIC_IPAY88_MERCHANT_CODE as string, // 'PH01663'
        refNo: 'REF-1733883936533-1',
        amount: '20112.00',
        currency: process.env.NEXT_PUBLIC_IPAY88_CURRENCY as string, // 'PHP'
        paymentId: '1',
        status: '1'
    };

    console.log('Test Data:', testData);

    // Test request signature
    const requestSignature = generateSignature(
        testData.merchantKey,
        {
            MerchantCode: testData.merchantCode,
            RefNo: testData.refNo,
            Amount: testData.amount,
            Currency: testData.currency
        },
        'request'
    );

    // Test response signature
    const responseSignature = generateSignature(
        testData.merchantKey,
        {
            MerchantCode: testData.merchantCode,
            PaymentId: testData.paymentId,
            RefNo: testData.refNo,
            Amount: testData.amount,
            Currency: testData.currency,
            Status: testData.status
        },
        'response'
    );

    return {
        request: requestSignature,
        response: responseSignature
    };
}

export function generateSignature(merchantKey: string, params: SignatureParams, type: 'request' | 'response' = 'request'): string {
    // 1. Log input parameters
    console.log('\nSignature Generation Input:', {
        type,
        merchantKey: `${merchantKey.substring(0, 4)}...${merchantKey.substring(-4)}`,
        params
    });

    // 2. Format amount (remove decimal point and commas)
    const rawAmount = params.Amount.toString();
    const cleanAmount = rawAmount
        .replace(/,/g, '')    // Remove commas
        .replace(/\./g, '');  // Remove decimal point

    console.log('\nAmount Processing:', {
        raw: rawAmount,
        cleaned: cleanAmount,
        multiplied: (parseFloat(rawAmount) * 100).toString()
    });

    // 3. Build signature string
    let signatureString = '';
    if (type === 'request') {
        // MerchantKey + MerchantCode + RefNo + Amount + Currency
        signatureString = `${merchantKey}${params.MerchantCode}${params.RefNo}${cleanAmount}${params.Currency}`;
    } else {
        // MerchantKey + MerchantCode + PaymentId + RefNo + Amount + Currency + Status
        signatureString = `${merchantKey}${params.MerchantCode}${params.PaymentId}${params.RefNo}${cleanAmount}${params.Currency}${params.Status}`;
    }

    console.log('\nSignature String Components:', {
        merchantKey,
        merchantCode: params.MerchantCode,
        paymentId: params.PaymentId || 'N/A',
        refNo: params.RefNo,
        amount: cleanAmount,
        currency: params.Currency,
        status: params.Status || 'N/A'
    });

    console.log('\nFinal Signature String:', signatureString);

    // 4. Generate SHA256 hash
    const signature = crypto
        .createHash('sha256')
        .update(signatureString)
        .digest('hex');

    console.log('\nGenerated Signature:', signature);

    return signature;
}

// import crypto from 'crypto';
// interface SignatureParams {
//   MerchantCode: string;
//   RefNo: string;
//   Amount: string;
//   Currency: string;
// }

// export function generateSignature(params: SignatureParams, merchantKey: string): string {
//   const { MerchantCode, RefNo, Amount, Currency } = params;
  
//   const formattedAmount = Number(Amount).toFixed(2).replace(',', '').replace('.', '');
  
//   const stringToHash = `${merchantKey}${MerchantCode}${RefNo}${formattedAmount}${Currency}`;
  
//   // Generate SHA256 hash
//   const signature = crypto.createHash('sha256').update(stringToHash).digest('hex');
//   return signature;
// }
// import crypto from 'crypto';
// interface SignatureParams {
//   MerchantCode: string;
//   RefNo: string;
//   Amount: string;
//   Currency: string;
// }

// export function generateSignature(params: SignatureParams, merchantKey: string): string {
//   const { MerchantCode, RefNo, Amount, Currency } = params;
  
//   const formattedAmount = Number(Amount).toFixed(2).replace(',', '').replace('.', '');
  
//   const stringToHash = `${merchantKey}${MerchantCode}${RefNo}${formattedAmount}${Currency}`;
  
//   // Generate SHA256 hash
//   const signature = crypto.createHash('sha256').update(stringToHash).digest('hex');
//   return signature;
// }
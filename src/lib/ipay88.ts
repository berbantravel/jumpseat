// ===== IPAY88 UTILITY FILE (src/lib/ipay88.ts) =====
import crypto from 'crypto';

interface SignatureParams {
    MerchantCode: string;
    RefNo: string;
    Amount: string;
    Currency: string;
    PaymentId?: string;
    Status?: string;
}

export function generateSignature(
    merchantKey: string, 
    params: SignatureParams,
    type: 'request' | 'response' = 'request'
): string {
    // Format amount
    const numericAmount = parseFloat(params.Amount).toFixed(2);
    const cleanAmount = numericAmount.replace(/\./g, '');

    let signatureString = '';
    
    if (type === 'request') {
        // For payment initiation
        signatureString = `${merchantKey}${params.MerchantCode}${params.RefNo}${cleanAmount}${params.Currency}`;
    } else {
        // For payment response/backend
        signatureString = `${merchantKey}${params.MerchantCode}${params.PaymentId}${params.RefNo}${cleanAmount}${params.Currency}${params.Status}`;
    }

    console.log('Generating Signature:', {
        type,
        components: {
            merchantCode: params.MerchantCode,
            paymentId: type === 'response' ? params.PaymentId : 'N/A',
            refNo: params.RefNo,
            amount: {
                original: params.Amount,
                formatted: numericAmount,
                cleaned: cleanAmount
            },
            currency: params.Currency,
            status: type === 'response' ? params.Status : 'N/A'
        },
        signatureString
    });

    return crypto
        .createHash('sha256')
        .update(signatureString)
        .digest('hex');
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
import crypto from 'crypto';
interface SignatureParams {
  MerchantCode: string;
  RefNo: string;
  Amount: string;
  Currency: string;
  PaymentId?: string;  // Add this line
  Status?: string;     // Keep this optional
}

export function generateSignature(merchantKey: string, params: SignatureParams, type: 'request' | 'response' = 'request'): string {
  // Format amount
  const numericAmount = parseFloat(params.Amount).toFixed(2);
  const cleanAmount = numericAmount.replace(/\./g, '');

  // Build signature string
  let signatureString = '';
  
  if (type === 'request') {
      signatureString = `${merchantKey}${params.MerchantCode}${params.RefNo}${cleanAmount}${params.Currency}`;
  } else {
      // Ensure PaymentId exists for response signature
      if (!params.PaymentId) {
          throw new Error('PaymentId is required for response signature');
      }
      signatureString = `${merchantKey}${params.MerchantCode}${params.PaymentId}${params.RefNo}${cleanAmount}${params.Currency}${params.Status}`;
  }

  // Generate hash
  const signature = crypto
      .createHash('sha256')
      .update(signatureString)
      .digest('hex');

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
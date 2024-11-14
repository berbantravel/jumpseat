// lib/ipay88.ts
import crypto from 'crypto';

interface SignatureParams {
  MerchantCode: string;
  RefNo: string;
  Amount: string;
  Currency: string;
}

interface ResponseSignatureParams {
  MerchantCode: string;
  PaymentId: string;
  RefNo: string;
  Amount: string;
  Currency: string;
  Status: string;
}

// Generate the signature for payment requests (Request Signature)
export function generateSignature(params: SignatureParams, merchantKey: string): string {
  const { MerchantCode, RefNo, Amount, Currency } = params;
  const formattedAmount = Number(Amount).toFixed(2).replace(',', '').replace('.', '');  // Format Amount
  
  const stringToHash = `${merchantKey}${MerchantCode}${RefNo}${formattedAmount}${Currency}`;
  const signature = crypto.createHash('sha256').update(stringToHash).digest('hex');  // SHA256 for request
  return signature;
}

// Generate the signature for payment responses (Response Signature)
export function generateResponseSignature(params: ResponseSignatureParams, merchantKey: string): string {
  const { MerchantCode, PaymentId, RefNo, Amount, Currency, Status } = params;
  const formattedAmount = Number(Amount).toFixed(2).replace(',', '').replace('.', '');  // Format Amount
  
  const stringToHash = `${merchantKey}${MerchantCode}${PaymentId}${RefNo}${formattedAmount}${Currency}${Status}`;
  const signature = crypto.createHash('sha1').update(stringToHash).digest('hex');  // SHA1 for response
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
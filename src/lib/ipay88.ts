import crypto from 'crypto';
interface SignatureParams {
  MerchantCode: string;
  RefNo: string;
  Amount: string;
  Currency: string;
}
export function generateSignature(merchantKey: string, params: SignatureParams): string {
  const { MerchantCode, RefNo, Amount, Currency } = params;
  
  // Remove any commas and periods from Amount (just as iPay88 specifies)
  const formattedAmount = Amount.replace(',', '').replace('.', '');
  
  const stringToHash = `${merchantKey}${MerchantCode}${RefNo}${formattedAmount}${Currency}`;
  
  // Generate SHA256 hash and return it in Base64 encoding
  const signatureBuffer = crypto.createHash('sha256').update(stringToHash).digest();
  return signatureBuffer.toString('base64');  // Return Base64 encoded signature
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
import crypto from 'crypto';

interface SignatureParams {
  MerchantCode: string;
  RefNo: string;
  Amount: string;
  Currency: string;
}

export function generateSignature(merchantKey: string, params: SignatureParams): string {
  const { MerchantCode, RefNo, Amount, Currency } = params;

  // Ensure amount is formatted as '10000' for hashing
  const formattedAmount = Number(Amount).toFixed(2).replace('.', '');

  // Create the string to hash
  const stringToHash = `${merchantKey}${MerchantCode}${RefNo}${formattedAmount}${Currency}`;
  console.log('String to Hash:', stringToHash); // Log for debugging

  // Generate the hash
  const signature = crypto.createHash('sha256').update(stringToHash).digest('hex');
  console.log('Generated Signature:', signature); // Log for debugging
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
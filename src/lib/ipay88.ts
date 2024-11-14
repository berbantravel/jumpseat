import crypto from 'crypto';

interface SignatureParams {
  MerchantCode: string;
  RefNo: string;
  Amount: string;
  Currency: string;
}


export function generateSignature(params: SignatureParams, merchantKey: string): string {
  const { MerchantCode, RefNo, Amount, Currency } = params;

  // Format Amount to match iPay88's expected format (no commas, no decimals)
  const formattedAmount = Number(Amount).toFixed(2).replace(',', '').replace('.', '');

  // Construct the string for hashing using the specified fields
  const stringToHash = `${merchantKey}${MerchantCode}${RefNo}${formattedAmount}${Currency}`;

  // Create the SHA256 hash as required for the request signature
  return crypto.createHash('sha256').update(stringToHash).digest('hex');
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
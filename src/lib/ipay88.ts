import crypto from 'crypto';
interface SignatureParams {
  MerchantCode: string;
  RefNo: string;
  Amount: string;
  Currency: string;
}

export function generateSignature(merchantKey: string, params: { MerchantCode: string, RefNo: string, Amount: string, Currency: string }): string {
  const { MerchantCode, RefNo, Amount, Currency } = params;

  // Format Amount as integer (no decimal, as expected by iPay88)
  const formattedAmount = Number(Amount).toFixed(2).replace('.', '');

  // Concatenate the values in the exact order specified by iPay88 (MerchantKey + MerchantCode + RefNo + Amount + Currency)
  const stringToHash = `${merchantKey}${MerchantCode}${RefNo}${formattedAmount}${Currency}`;
  
  console.log('String to Hash:', stringToHash); // Debugging log to check what you're hashing

  // Generate SHA256 hash of the concatenated string
  const hash = crypto.createHash('sha256').update(stringToHash).digest('hex');
  console.log('Generated Hash:', hash); // Log the SHA256 hash

  // Base64 encode the hash
  const base64EncodedHash = Buffer.from(hash, 'hex').toString('base64');
  console.log('Base64-Encoded Secret Key:', base64EncodedHash); // Log the final secret key

  return base64EncodedHash;
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
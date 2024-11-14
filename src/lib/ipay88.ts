import crypto from 'crypto';

interface SignatureParams {
  MerchantCode: string;
  PaymentId?: string; // Optional for initiate payment
  RefNo: string;
  Amount: string;
  Currency: string;
  Status?: string; // Optional for initiate payment, required for response verification
}

export function generateSignature(params: SignatureParams, merchantKey: string): string {
  const { MerchantCode, PaymentId, RefNo, Amount, Currency, Status } = params;

  // Format Amount (no commas, no decimals)
  const formattedAmount = Number(Amount).toFixed(2).replace('.', '').replace(',', '');

  // Construct the string for hashing
  const stringToHash = Status
    ? `${merchantKey}${MerchantCode}${PaymentId}${RefNo}${formattedAmount}${Currency}${Status}`
    : `${merchantKey}${MerchantCode}${RefNo}${formattedAmount}${Currency}`;

  // Log the string for debugging
  console.log('String to hash:', stringToHash);

  // Create the SHA256 hash and return it as a Base64-encoded string
  return crypto.createHash('sha256').update(stringToHash, 'utf8').digest('base64');
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
import crypto from 'crypto';

interface SignatureParams {
  MerchantCode: string;
  RefNo: string;
  Amount: string;
  Currency: string;
}

export function generateSignature(merchantKey: string, params: SignatureParams): string {
  const { MerchantCode, RefNo, Amount, Currency } = params;

  // Step 1: Format the Amount to remove decimals and commas
  const formattedAmount = Number(Amount).toFixed(2).replace('.', '').replace(',', '');
  console.log('Formatted Amount:', formattedAmount);

  // Step 2: Construct the string to hash
  const stringToHash = `${merchantKey}${MerchantCode}${RefNo}${formattedAmount}${Currency}`;
  console.log('String to Hash:', stringToHash);

  // Step 3: Generate the SHA256 hash
  const hash = crypto.createHash('sha256').update(stringToHash).digest('hex');
  console.log('Generated Hash:', hash);

  return hash;
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
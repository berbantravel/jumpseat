import crypto from 'crypto';

interface SignatureParams {
  MerchantCode: string;
  RefNo: string;
  Amount: string;
  Currency: string;
}

/**
 * Generates the iPay88 signature for secure communication.
 * 
 * @param merchantKey - The Merchant Key provided by iPay88.
 * @param params - The required parameters for generating the signature.
 * @returns The generated SHA256 hash as a string.
 */
export function generateSignature(merchantKey: string, params: SignatureParams): string {
  const { MerchantCode, RefNo, Amount, Currency } = params;

  // Validate input parameters
  if (!merchantKey || !MerchantCode || !RefNo || !Amount || !Currency) {
    throw new Error('Missing required parameters for signature generation.');
  }

  // Ensure amount is formatted correctly
  const formattedAmount = Number(Amount).toFixed(2).replace('.', '');
  console.log('Parameters:', merchantKey, MerchantCode, RefNo, formattedAmount, Currency);

  // Construct the string to hash
  const stringToHash = `${merchantKey}${MerchantCode}${RefNo}${formattedAmount}${Currency}`;
  console.log('String to Hash:', stringToHash);

  // Generate SHA256 hash
  const signature = crypto.createHash('sha256').update(stringToHash).digest('hex');
  console.log('Generated Signature:', signature);

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
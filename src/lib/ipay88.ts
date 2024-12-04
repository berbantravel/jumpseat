import crypto from 'crypto';

interface BackendSignatureParams {
  MerchantCode: string;
  RefNo: string;
  Amount: string;
  Currency: string;
  Status: string; // Add Status
  AuthCode: string; // Add AuthCode
  TransId: string; // Add TransId
}

export function generateSignature(
  merchantKey: string,
  params: BackendSignatureParams
): string {
  const { MerchantCode, RefNo, Amount, Currency, Status, AuthCode, TransId } = params;

  // Format amount
  const formattedAmount = Number(Amount).toFixed(2).replace(',', '').replace('.', '');

  // Construct the string for hashing
  const stringToHash = `${merchantKey}${MerchantCode}${RefNo}${formattedAmount}${Currency}${Status}${AuthCode}${TransId}`;
  console.log('String to Hash:', stringToHash);

  // Generate SHA256 hash
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
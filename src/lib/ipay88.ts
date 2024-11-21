import crypto from 'crypto';

/**
 * Generate the signature for payment requests (used for payment initiation)
 *
 * @param {Object} params - The required parameters
 * @param {string} params.merchantKey - MerchantKey provided by iPay88
 * @param {string} params.merchantCode - MerchantCode provided by iPay88
 * @param {string} params.refNo - Reference number for the transaction
 * @param {string} params.amount - Transaction amount
 * @param {string} params.currency - Currency code (e.g., PHP)
 * @returns {string} - The generated signature (SHA256 hex hash)
 */
export function generateSignature({
  merchantKey,
  merchantCode,
  refNo,
  amount,
  currency,
}: {
  merchantKey: string;
  merchantCode: string;
  refNo: string;
  amount: string;
  currency: string;
}): string {
  if (!merchantKey || !merchantCode || !refNo || !amount || !currency) {
    throw new Error('Missing required parameters for generating signature.');
  }

  const formattedAmount = Number(amount).toFixed(2).replace('.', '');
  const stringToHash = `${merchantKey}${merchantCode}${refNo}${formattedAmount}${currency}`;
  console.log('String to Hash for Signature:', stringToHash);

  const signature = crypto.createHash('sha256').update(stringToHash).digest('hex');
  console.log('Generated Signature:', signature);

  return signature;
}

/**
 * Generate the secret key for Inquiry API requests (used for requerying transaction statuses)
 *
 * @param {string} merchantKey - MerchantKey provided by iPay88
 * @param {string} merchantCode - MerchantCode provided by iPay88
 * @returns {string} - The generated secret key (Base64-encoded SHA256 hash)
 */
export function generateSecretKey(merchantKey: string, merchantCode: string): string {
  if (!merchantKey || !merchantCode) {
    throw new Error('MerchantKey or MerchantCode is missing.');
  }

  const stringToHash = `${merchantKey}${merchantCode}`;
  console.log('String to Hash for Secret Key:', stringToHash);

  const sha256Hash = crypto.createHash('sha256').update(stringToHash).digest('hex');
  console.log('SHA256 Hash:', sha256Hash);

  const secretKey = Buffer.from(sha256Hash, 'hex').toString('base64');
  console.log('Base64 Secret Key:', secretKey);

  return secretKey;
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
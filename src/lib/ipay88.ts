import crypto from 'crypto';
interface SignatureParams {
  MerchantCode: string;
  RefNo: string;
  Amount: string;
  Currency: string;
}

export function generateSignature(params: SignatureParams, merchantKey: string): string {
  const { MerchantCode, RefNo, Amount, Currency } = params;

  // Ensure Amount is formatted correctly (remove decimal and comma)
  const formattedAmount = Number(Amount).toFixed(2).replace(',', '').replace('.', '');

  // Concatenate the parameters with the merchant key (verify order in the iPay88 docs)
  const stringToHash = `${merchantKey}${MerchantCode}${RefNo}${formattedAmount}${Currency}`;
  
  // Log the string being hashed
  console.log('String to hash for signature:', stringToHash);

  // Generate MD5 hash
  const signature = crypto.createHash('md5').update(stringToHash).digest('hex').toUpperCase();

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
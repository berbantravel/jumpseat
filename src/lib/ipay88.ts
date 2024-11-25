import crypto from 'crypto';

interface SignatureParams {
    MerchantCode: string;
    RefNo: string;
    Amount: string;
    Currency: string;
}

export function generateSignature(merchantKey: string, params: SignatureParams): string {
    const { MerchantCode, RefNo, Amount, Currency } = params;

    // Ensure that Amount is formatted as a whole number (remove decimals and commas)
    const formattedAmount = Number(Amount).toFixed(2).replace('.', '').replace(',', '');

    // Concatenate parameters in the correct order: MerchantKey + MerchantCode + RefNo + Amount + Currency
    const stringToHash = `${merchantKey}${MerchantCode}${RefNo}${formattedAmount}${Currency}`;
    console.log("String to Hash:", stringToHash);

    // Generate SHA256 hash of the concatenated string
    const hash = crypto.createHash('sha256').update(stringToHash).digest('hex');
    console.log("Generated SHA256 Hash:", hash);

    // Base64 encode the SHA256 hash as required by iPay88
    const signature = Buffer.from(hash, 'hex').toString('base64');
    console.log("Base64-Encoded Signature:", signature);

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
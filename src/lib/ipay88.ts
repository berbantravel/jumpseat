// import crypto from 'crypto';

// interface PaymentRequestSignatureParams  {
//   MerchantCode: string;
//   RefNo: string;
//   Amount: string;
//   Currency: string;
// }

// interface PaymentResponseSignatureParams  {
//   MerchantCode: string;
//   PaymentId: string;
//   RefNo: string;
//   Amount: string;
//   Currency: string;
//   Status: string;
// }

// // Generate the signature for payment requests (Request Signature)
// export function generateSignature(params: PaymentRequestSignatureParams , merchantKey: string): string {
//   const { MerchantCode,RefNo, Amount, Currency } = params;
//   const formattedAmount = Number(Amount).toFixed(2).replace(',', '').replace('.', ''); // Format Amount

//   const stringToHash = `${merchantKey}${MerchantCode}${RefNo}${formattedAmount}${Currency}`;
//   console.log(`String to Hash: ${stringToHash}`);  // Print string to verify

//   const signature = crypto.createHash('sha256').update(stringToHash).digest('hex'); // SHA256 for request
//   return signature;
// }

// // Generate the signature for payment responses (Response Signature)
// export function generateResponseSignature(params: PaymentResponseSignatureParams , merchantKey: string): string {
//   const { MerchantCode, PaymentId, RefNo, Amount, Currency, Status } = params;
//   const formattedAmount = Number(Amount).toFixed(2).replace(',', '').replace('.', ''); // Format Amount



//   const stringToHash = `${merchantKey}${MerchantCode}${PaymentId}${RefNo}${formattedAmount}${Currency}${Status}`;
//   console.log(`String to Hash: ${stringToHash}`);  // Print string to verify

//   const signature = crypto.createHash('sha1').update(stringToHash).digest('hex'); // SHA1 for response
//   return signature;
// }



// lib/ipay88.ts
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

  // Generate MD5 hash
  const signature = crypto.createHash('md5').update(stringToHash).digest('hex').toUpperCase();
  
  return signature;
}
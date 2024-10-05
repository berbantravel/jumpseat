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
  
  // Ensure Amount is in the correct format (two decimal places, no thousands separator)
  const formattedAmount = Number(Amount).toFixed(2).replace(',', '').replace('.', '');
  
  const stringToHash = `${merchantKey}${MerchantCode}${RefNo}${formattedAmount}${Currency}`;
  console.log('stringToHash', stringToHash);
  
  // Generate SHA256 hash
  const signature = crypto.createHash('sha256').update(stringToHash).digest('hex');
  
  // Log the generated signature
  console.log('Generated Signature:', signature);
  
  return signature;
}
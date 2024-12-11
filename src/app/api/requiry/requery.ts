// // pages/api/requery.ts
// import axios from 'axios';
// import { NextApiRequest, NextApiResponse } from 'next';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const { MerchantCode, RefNo, Amount } = req.query;

//   // Validate query parameters
//   if (!MerchantCode || !RefNo || !Amount) {
//     return res.status(400).json({ error: 'Missing required parameters' });
//   }

//   const queryString = `MerchantCode=${MerchantCode}&RefNo=${RefNo}&Amount=${Amount}`;
//   const apiUrl = `https://payment.ipay88.com.ph/MerchantService/Payment/Inquiry`;
//   // const apiUrl = `https://payment.ipay88.com.ph/epayment/enquiry.asp?${queryString}`;
//   try {
//     // Make the request to iPay88 sandbox URL
//     const response = await axios.get(apiUrl);

//     // Return the result back to the frontend
//     res.status(200).json(response.data);
//   } catch (error) {
//     // Log the error for debugging purposes (optional, but useful for backend diagnostics)
//     console.error('Error during requery:', error);

//     // Send a generic error message without exposing the details
//     res.status(500).json({ error: 'There was an issue fetching requery data. Please try again later.' });
//   }
// }

// pages/api/requery.ts
// ===== PAYMENT REQUERY HANDLER (src/app/api/requery/route.ts) =====
import { NextRequest } from 'next/server';
import crypto from 'crypto';

// Constants
const INQUIRY_URL = 'https://sandbox.ipay88.com.ph/MerchantService/Payment/Inquiry';
const BATCH_INQUIRY_URL = 'https://sandbox.ipay88.com.ph/MerchantService/Payment/BatchInquiry';

function generateSecretKey(merchantKey: string, merchantCode: string): string {
  // Step 1: Concatenate merchantKey and merchantCode
  const concatenated = `${merchantKey}${merchantCode}`;
  
  // Step 2: Generate SHA256 hash
  const sha256Hash = crypto
      .createHash('sha256')
      .update(concatenated)
      .digest('hex');
  
  // Step 3: Convert to Base64
  const secretKey = Buffer.from(sha256Hash).toString('base64');
  
  console.log('Secret Key Generation:', {
      input: concatenated,
      sha256: sha256Hash,
      base64: `${secretKey.substring(0, 10)}...` // Log partial key for security
  });
  
  return secretKey;
}

export async function POST(request: NextRequest) {
  try {
      // 1. Get form data
      const formData = await request.formData();
      
      const merchantCode = formData.get('MerchantCode') as string;
      const refNo = formData.get('RefNo') as string;
      let amount = formData.get('Amount') as string;

      console.log('Requery Request:', { merchantCode, refNo, amount });

      // 2. Validate required parameters
      if (!merchantCode || !refNo || !amount) {
          return Response.json({ 
              error: 'Missing required parameters' 
          }, { status: 400 });
      }

      // 3. Validate amount range (100-10,000)
      const amountNum = parseFloat(amount);
      if (isNaN(amountNum) || amountNum < 100 || amountNum > 30000) {
          return Response.json({ 
              error: 'Amount must be between 100 and 30,000' 
          }, { status: 400 });
      }

      // 4. Format amount to 2 decimal places
      amount = amountNum.toFixed(2);

      // 5. Generate secret key
      const merchantKey = process.env.NEXT_PUBLIC_IPAY88_MERCHANT_KEY;
      if (!merchantKey) {
          throw new Error('Merchant key not configured');
      }
      
      const secretKey = generateSecretKey(merchantKey, merchantCode);

      // 6. Prepare request body (exactly as per iPay88 docs)
      const requestBody = {
          merchantCode,
          refNo,
          amount,
          secretkey: secretKey // lowercase 'k' as specified
      };

      console.log('Sending Request:', {
          url: INQUIRY_URL,
          body: {
              ...requestBody,
              secretkey: `${secretKey.substring(0, 10)}...` // Partial key for logging
          }
      });

      // 7. Make request to iPay88
      const response = await fetch(INQUIRY_URL, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
          },
          body: JSON.stringify(requestBody)
      });

      // 8. Get raw response for logging
      const rawResponse = await response.text();
      console.log('iPay88 Response:', {
          status: response.status,
          headers: Object.fromEntries(response.headers.entries()),
          body: rawResponse
      });

      // 9. Parse response
      let result;
      try {
          result = JSON.parse(rawResponse);
          
          // Log transaction status
          if (result.transactions?.[0]) {
              const transaction = result.transactions[0];
              console.log('Transaction Status:', {
                  refNo,
                  status: transaction.status,
                  description: transaction.errDesc,
                  transId: transaction.transId
              });
          }

      } catch (parseError) {
          console.error('Response Parse Error:', parseError);
          return Response.json({
              error: 'Invalid response from payment gateway',
              details: rawResponse
          }, { status: 502 });
      }

      return Response.json(result);

  } catch (error) {
      console.error('Requery Error:', error);
      return Response.json({
          error: 'Payment verification failed',
          message: error instanceof Error ? error.message : 'Unknown error'
      }, { status: 500 });
  }
}
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
// pages/api/requery.ts
import { NextRequest } from 'next/server';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        console.log('Requery Request Body:', body);

        // Get merchant key from environment variable
        const merchantKey = process.env.IPAY88_MERCHANT_KEY;
        if (!merchantKey) {
            throw new Error('Merchant key not configured');
        }

        // Generate secret key (SHA256 + Base64)
        const secretKey = generateSecretKey(merchantKey, body.merchantCode);
        console.log('Generated Secret Key (first 10 chars):', secretKey.substring(0, 10) + '...');

        // Prepare request to iPay88
        const requestBody = {
            merchantCode: body.merchantCode,
            refNo: body.refNo,
            amount: body.amount,
            secretKey: secretKey  // Use generated secret key
        };

        const response = await fetch('https://sandbox.ipay88.com.ph/MerchantService/Payment/Inquiry', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        const rawResponse = await response.text();
        console.log('iPay88 Response:', rawResponse);

        const result = JSON.parse(rawResponse);
        return Response.json(result);

    } catch (error) {
        console.error('Requery Error:', error);
        return Response.json({
            error: 'Payment verification failed',
            message: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}

function generateSecretKey(merchantKey: string, merchantCode: string): string {
    // Step 1: Concatenate merchantKey and merchantCode
    const concatenated = `${merchantKey}${merchantCode}`;
    
    // Step 2: Generate SHA256 hash
    const sha256Hash = crypto
        .createHash('sha256')
        .update(concatenated)
        .digest('base64');  // Direct base64 encoding
    
    console.log('Secret Key Generation:', {
        merchantCode,
        hashLength: sha256Hash.length,
        sampleHash: sha256Hash.substring(0, 10) + '...'
    });
    
    return sha256Hash;
}
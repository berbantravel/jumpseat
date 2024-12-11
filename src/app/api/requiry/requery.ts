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
const SINGLE_INQUIRY_URL = 'https://payment.ipay88.com.ph/MerchantService/Payment/Inquiry';
const BATCH_INQUIRY_URL = 'https://payment.ipay88.com.ph/MerchantService/Payment/BatchInquiry';

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        
        const merchantCode = formData.get('MerchantCode') as string;
        const refNo = formData.get('RefNo') as string;
        let amount = formData.get('Amount') as string;

        console.log('Requery Request:', {
            merchantCode,
            refNo,
            amount
        });

        // Validate inputs
        if (!merchantCode || !refNo || !amount) {
            return Response.json({ 
                error: 'Missing required parameters' 
            }, { status: 400 });
        }

        // Format amount properly
        amount = parseFloat(amount).toFixed(2);

        // Generate secret key
        const merchantKey = process.env.NEXT_PUBLIC_IPAY88_MERCHANT_KEY as string;
        const concatenated = `${merchantKey}${merchantCode}`;
        const sha256Hash = crypto
            .createHash('sha256')
            .update(concatenated)
            .digest('hex');
        const secretKey = Buffer.from(sha256Hash).toString('base64');

        // Prepare request body
        const requestBody = {
            merchantCode,
            refNo,
            amount,
            secretkey: secretKey // lowercase 'k' as per iPay88 spec
        };

        console.log('Sending Request:', {
            url: SINGLE_INQUIRY_URL,
            body: {
                ...requestBody,
                secretkey: `${secretKey.substring(0, 10)}...` // Log partial key
            }
        });

        // Make request to iPay88
        const response = await fetch(SINGLE_INQUIRY_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        // Log raw response
        const rawResponse = await response.text();
        console.log('iPay88 Response:', {
            status: response.status,
            headers: Object.fromEntries(response.headers.entries()),
            body: rawResponse
        });

        // Parse response
        let result;
        try {
            result = JSON.parse(rawResponse);
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

// Batch inquiry function (if needed)
async function batchInquiry(transactions: Array<{
    merchantCode: string;
    refNo: string;
    amount: string;
}>) {
    // Implementation for batch inquiry
    const response = await fetch(BATCH_INQUIRY_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            transactions
        })
    });

    return response.json();
}
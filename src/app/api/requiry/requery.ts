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
// ===== PAYMENT REQUERY HANDLER (src/app/api/requery/route.ts) =====
import { NextRequest } from 'next/server';
import crypto from 'crypto';

function generateSecretKey(merchantKey: string, merchantCode: string): string {
    // Step 1: Concatenate merchantKey and merchantCode
    const concatenated = `${merchantKey}${merchantCode}`;
    
    // Step 2: Generate SHA256 hash
    const sha256Hash = crypto
        .createHash('sha256')
        .update(concatenated)
        .digest('hex');
    
    // Step 3: Convert the hex hash to Base64
    const base64Secret = Buffer.from(sha256Hash).toString('base64');
    
    console.log('Secret Key Generation:', {
        input: concatenated,
        sha256: sha256Hash,
        base64: base64Secret
    });
    
    return base64Secret;
}

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        
        const merchantCode = formData.get('MerchantCode') as string;
        const refNo = formData.get('RefNo') as string;
        const amount = formData.get('Amount') as string;

        console.log('Requery Request:', {
            merchantCode,
            refNo,
            amount
        });

        if (!merchantCode || !refNo || !amount) {
            return Response.json({ 
                error: 'Missing required parameters' 
            }, { status: 400 });
        }

        const merchantKey = process.env.NEXT_PUBLIC_IPAY88_MERCHANT_KEY as string;
        const secretKey = generateSecretKey(merchantKey, merchantCode);

        // Format amount to 2 decimal places
        const formattedAmount = parseFloat(amount).toFixed(2);

        const requestBody = {
            merchantCode,
            refNo,
            amount: formattedAmount,
            secretkey: secretKey  // Note: iPay88 expects 'secretkey' (lowercase 'k')
        };

        console.log('Sending Request:', {
            ...requestBody,
            secretkey: `${secretKey.substring(0, 10)}...` // Log partial secret key for security
        });

        const response = await fetch('https://payment.ipay88.com.ph/MerchantService/Payment/Inquiry', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        const result = await response.json();

        console.log('Requery Response:', result);

        return Response.json(result);

    } catch (error) {
        console.error('Requery Error:', error);
        return Response.json({
            error: 'Payment verification failed',
            message: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}
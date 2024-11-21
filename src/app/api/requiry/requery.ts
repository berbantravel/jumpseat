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
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { generateSecretKey } from '@/lib/ipay88';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { MerchantCode, RefNo, Amount } = req.query;

  if (!MerchantCode || !RefNo || !Amount) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  try {
    const formattedAmount = Number(Amount).toFixed(2).replace('.', '');
    const merchantKey = process.env.NEXT_PUBLIC_IPAY88_MERCHANT_KEY as string;

    if (!merchantKey) {
      throw new Error('MerchantKey is not set in environment variables.');
    }

    const secretKey = generateSecretKey(merchantKey, MerchantCode as string);

    const queryString = new URLSearchParams({
      MerchantCode: MerchantCode as string,
      RefNo: RefNo as string,
      Amount: formattedAmount,
      secretkey: secretKey,
    }).toString();

    const apiUrl = `https://sandbox.ipay88.com.ph/MerchantService/Payment/Inquiry?${queryString}`;

    const response = await axios.get(apiUrl);
    res.status(200).json(response.data);
  } catch (error: any) {
    console.error('Error during requery:', error.message);
    res.status(500).json({ error: error.message });
  }
}

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

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { MerchantCode, RefNo, Amount } = req.query;

    // Validate query parameters
    if (!MerchantCode || !RefNo || !Amount || isNaN(Number(Amount))) {
      return res.status(400).json({ error: 'Missing or invalid required parameters' });
    }

    // Format Amount with two decimal places
    const formattedAmount = Number(Amount).toFixed(2); // Ensures two decimal places
    const queryString = `MerchantCode=${encodeURIComponent(MerchantCode as string)}&RefNo=${encodeURIComponent(RefNo as string)}&Amount=${encodeURIComponent(formattedAmount)}`;

    // Use the `NEXT_PUBLIC_IPAY88_URL` from your `.env` file
    const baseUrl = process.env.NEXT_PUBLIC_IPAY88_URL || 'https://sandbox.ipay88.com.ph';
    const apiUrl = `${baseUrl.replace('/epayment/entry.asp', '')}/MerchantService/Payment/Inquiry?${queryString}`;

    console.log('Requery API URL:', apiUrl);

    // Make the request to iPay88
    const response = await axios.get(apiUrl);

    // Log response for debugging
    console.log('Requery Response:', response.data);

    // Return the result back to the frontend
    res.status(200).json(response.data);
  } catch (error) {
    // Enhanced error handling
    console.error('Error during requery:', error);

    if (axios.isAxiosError(error)) {
      return res.status(error.response?.status || 500).json({
        error: error.response?.data || 'Error from iPay88 API',
      });
    }

    res.status(500).json({ error: 'There was an issue fetching requery data. Please try again later.' });
  }
}

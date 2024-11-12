// pages/api/requery.ts
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { MerchantCode, RefNo, Amount } = req.query;

  // Validate query parameters
  if (!MerchantCode || !RefNo || !Amount) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  const queryString = `MerchantCode=${MerchantCode}&RefNo=${RefNo}&Amount=${Amount}`;
  const apiUrl = `https://payment.ipay88.com.ph/MerchantService/Payment/Inquiry`;
  // const apiUrl = `https://payment.ipay88.com.ph/epayment/enquiry.asp?${queryString}`;
  try {
    // Make the request to iPay88 sandbox URL
    const response = await axios.get(apiUrl);

    // Return the result back to the frontend
    res.status(200).json(response.data);
  } catch (error) {
    // Log the error for debugging purposes (optional, but useful for backend diagnostics)
    console.error('Error during requery:', error);

    // Send a generic error message without exposing the details
    res.status(500).json({ error: 'There was an issue fetching requery data. Please try again later.' });
  }
}

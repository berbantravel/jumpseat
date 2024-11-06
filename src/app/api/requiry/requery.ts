// pages/api/requery.ts
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { MerchantCode, RefNo, Amount } = req.query;

  // Check for required query parameters
  if (!MerchantCode || !RefNo || !Amount) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  // Build the query string
  const queryString = `MerchantCode=${MerchantCode}&RefNo=${RefNo}&Amount=${Amount}`;
  const apiUrl = `https://payment.ipay88.com.ph/epayment/enquiry.asp?${queryString}`;

  try {
    // Make the API request to iPay88
    const response = await axios.get(apiUrl);
    
    // Return the result to the client
    res.status(200).json(response.data);
  } catch (error: unknown) {
    // Handle the error when it occurs
    if (error instanceof Error) {
      // If the error is an instance of Error, access the message property
      res.status(500).json({ error: 'Error making the requery request', details: error.message });
    } else {
      // Fallback for unknown error types (non-Error objects)
      res.status(500).json({ error: 'Error making the requery request', details: 'An unknown error occurred' });
    }
  }
}

// pages/api/requery.ts
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { MerchantCode, RefNo, Amount } = req.query;

  // Check if parameters are provided
  if (!MerchantCode || !RefNo || !Amount) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  // Build the API URL with query parameters
  const queryString = `MerchantCode=${MerchantCode}&RefNo=${RefNo}&Amount=${Amount}`;
  const apiUrl = `https://payment.ipay88.com.ph/epayment/enquiry.asp?${queryString}`;

  try {
    // Send the request to the ipay88 API
    const response = await axios.get(apiUrl);
    // Check if the response contains data
    if (response.data) {
      res.status(200).json(response.data); // Return the result to the frontend
    } else {
      res.status(500).json({ error: 'No data returned from the iPay88 API' });
    }
  } catch (error: any) {
    // Handle different error scenarios
    if (error.response) {
      // Server responded with a status code outside 2xx range
      res.status(500).json({ error: 'Error making the requery request', details: error.response.data });
    } else if (error.request) {
      // No response was received
      res.status(500).json({ error: 'No response received from the iPay88 API' });
    } else {
      // Other errors during setting up the request
      res.status(500).json({ error: 'Unexpected error during request setup', details: error.message });
    }
  }
}

import React, { useState } from 'react';

interface RequeryResponse {
  [key: string]: any; // Define the structure of your expected response here
}

const PaymentRequery: React.FC = () => {
  const [requeryData, setRequeryData] = useState<RequeryResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleRequery = async (MerchantCode: string, RefNo: string, Amount: string) => {
    try {
      const response = await fetch(`/api/requery?MerchantCode=${MerchantCode}&RefNo=${RefNo}&Amount=${Amount}`);
      if (!response.ok) {
        throw new Error('Failed to fetch requery data');
      }

      const data: RequeryResponse = await response.json();
      setRequeryData(data); // Update the state with the result
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message); // If the error is an instance of Error, use the message property
      } else {
        setError('An unknown error occurred'); // Fallback error message if the error is not an instance of Error
      }
    }
  };

  return (
    <div>
      <button onClick={() => handleRequery('PH01663', 'REF-1234567890', '10000')}>
        Trigger Requery
      </button>

      {error && <p>Error: {error}</p>}
      {requeryData && <pre>{JSON.stringify(requeryData, null, 2)}</pre>}
    </div>
  );
};

export default PaymentRequery;

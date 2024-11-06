import React, { useState } from 'react';

interface RequeryResponse {
  [key: string]: any; // Define the structure of your expected response here
}

const PaymentRequery: React.FC = () => {
  const [merchantCode, setMerchantCode] = useState<string>('');
  const [refNo, setRefNo] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [requeryData, setRequeryData] = useState<RequeryResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleRequery = async () => {
    if (!merchantCode || !refNo || !amount) {
      setError('All fields are required');
      return;
    }

    setLoading(true);
    setError(null); // Reset error before making a request

    try {
      // Call the backend API to make the requery request
      const response = await fetch(`/api/requery?MerchantCode=${merchantCode}&RefNo=${refNo}&Amount=${amount}`);
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
    } finally {
      setLoading(false); // Turn off loading indicator
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
      <h1>Payment Requery</h1>
      
      {/* Merchant Code Input */}
      <div>
        <label>Merchant Code</label>
        <input
          type="text"
          value={merchantCode}
          onChange={(e) => setMerchantCode(e.target.value)}
          placeholder="Enter Merchant Code"
          style={{ width: '100%', padding: '8px', margin: '10px 0' }}
        />
      </div>
      
      {/* Reference No. Input */}
      <div>
        <label>Reference No.</label>
        <input
          type="text"
          value={refNo}
          onChange={(e) => setRefNo(e.target.value)}
          placeholder="Enter Reference Number"
          style={{ width: '100%', padding: '8px', margin: '10px 0' }}
        />
      </div>

      {/* Amount Input */}
      <div>
        <label>Amount</label>
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter Amount"
          style={{ width: '100%', padding: '8px', margin: '10px 0' }}
        />
      </div>

      {/* Trigger Requery Button */}
      <button 
        onClick={handleRequery} 
        disabled={loading}
        style={{ padding: '10px 15px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}
      >
        {loading ? 'Loading...' : 'Trigger Requery'}
      </button>

      {/* Error Display */}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {/* Display Requery Data */}
      {requeryData && (
        <div style={{ marginTop: '20px' }}>
          <h3>Requery Response:</h3>
          <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
            {JSON.stringify(requeryData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default PaymentRequery;

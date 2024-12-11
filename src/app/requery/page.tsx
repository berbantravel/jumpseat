'use client'
import React, { useState } from 'react'

interface Transaction {
  paymentId: number
  amount: number
  currency: string
  transId: string
  createDate: string
  remark: string
  authCode: string
  status: number
  errDesc: string
  signature: string
}

interface RequeryResponse {
  merchantCode: string
  refNo: string
  transactions: Transaction[]
  errorCode: string | null
  errorMessage: string | null
}

const PaymentRequery: React.FC = () => {
  const [refNo, setRefNo] = useState<string>('')
  const [amount, setAmount] = useState<string>('')
  const [requeryData, setRequeryData] = useState<RequeryResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const handleRequery = async () => {
    // Validate inputs
    if (!refNo || !amount) {
      setError('Reference number and amount are required')
      return
    }

    try {
      setLoading(true)
      setError(null)

      // Format amount properly
      const formattedAmount = parseFloat(amount).toFixed(2)

      const requestBody = {
        refNo: refNo,
        amount: formattedAmount,
      }

      console.log('Sending request:', requestBody)

      const response = await fetch('/api/requery', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log('Received response:', data)

      if (data.errorCode) {
        setError(`${data.errorCode}: ${data.errorMessage}`)
      } else {
        setRequeryData(data)
        setError(null)
      }
    } catch (error) {
      console.error('Requery error:', error)
      setError(error instanceof Error ? error.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-2xl p-6">
      <h1 className="mb-6 text-2xl font-bold">Payment Requery</h1>

      <div className="space-y-4">
        {/* Reference No. Input */}
        <div>
          <label className="mb-1 block text-sm font-medium">
            Reference No.
          </label>
          <input
            type="text"
            value={refNo}
            onChange={(e) => setRefNo(e.target.value)}
            placeholder="Enter Reference Number"
            className="w-full rounded border p-2"
            disabled={loading}
          />
        </div>

        {/* Amount Input */}
        <div>
          <label className="mb-1 block text-sm font-medium">Amount</label>
          <input
            type="number"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter Amount"
            className="w-full rounded border p-2"
            disabled={loading}
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleRequery}
          disabled={loading}
          className={`w-full rounded p-3 text-white ${
            loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {loading ? 'Checking...' : 'Check Payment Status'}
        </button>

        {/* Error Display */}
        {error && (
          <div className="rounded border border-red-400 bg-red-100 p-3 text-red-700">
            {error}
          </div>
        )}

        {/* Response Display */}
        {requeryData && (
          <div className="mt-6 rounded bg-gray-50 p-4">
            <h3 className="mb-3 text-lg font-semibold">Payment Details</h3>
            {requeryData.transactions.map((transaction, index) => (
              <div key={index} className="space-y-2">
                <p>Transaction ID: {transaction.transId}</p>
                <p>
                  Amount: {transaction.amount} {transaction.currency}
                </p>
                <p>Date: {new Date(transaction.createDate).toLocaleString()}</p>
                <p>Status: {transaction.status === 1 ? 'Success' : 'Failed'}</p>
                {transaction.errDesc && <p>Error: {transaction.errDesc}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default PaymentRequery

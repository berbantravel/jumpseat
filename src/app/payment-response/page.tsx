'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

function PaymentResponseContent() {
  const searchParams = useSearchParams()
  const [paymentStatus, setPaymentStatus] = useState<string>('Processing...')

  useEffect(() => {
    // Extract payment response parameters
    const status = searchParams.get('Status')
    const refNo = searchParams.get('RefNo')
    const transId = searchParams.get('TransId')

    console.log('Payment response:', Object.fromEntries(searchParams.entries()))

    // Update payment status based on the response
    if (status === '1') {
      setPaymentStatus('Payment Successful')
    } else if (status === '0') {
      setPaymentStatus('Payment Failed')
    } else {
      setPaymentStatus('Payment Status Unknown')
    }

    // Here you would typically make an API call to your backend to verify the payment
    // and update your database accordingly
  }, [searchParams])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Payment Response</h1>
        <p className="text-xl mb-4">{paymentStatus}</p>
        <Link href="/checkout" className="text-blue-600 hover:underline">
          Return to Checkout
        </Link>
      </div>
    </div>
  )
}

export default function PaymentResponse() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentResponseContent />
    </Suspense>
  )
}
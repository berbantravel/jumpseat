'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import PaymentSuccess from '@/components/PaymentSuccess'
import PaymentFailed from '@/components/PaymentFailed'
import jumpseatIcon from '@/images/logos/jumpseat-icon.png'
import Image from 'next/image'
import CircleLoader from '@/components/CircleLoader'
import { OrderDetails } from '@/types/models'

function PaymentResponseContent() {
  const searchParams = useSearchParams()
  const [paymentStatus, setPaymentStatus] = useState<string>('Processing...')
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null)


  useEffect(() => {
    const status = searchParams.get('Status')
    const refNo = searchParams.get('RefNo')
    const transId = searchParams.get('TransId')

    const sendEmailOnSuccess = async () => {
      const userInfo = JSON.parse(localStorage.getItem('USER_INFORMATION') || '{}')
      const tripDetails = JSON.parse(localStorage.getItem('SELECTED_DESTINATION') || '{}')
      const ipay88Payload = JSON.parse(localStorage.getItem('IPAY88_PAYLOAD') || '{}')

      try {
        const response = await fetch('/api/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userInfo, tripDetails, ipay88Payload }),
        })

        if (!response.ok) {
          console.error('Failed to send email')
        }
      } catch (error) {
        console.error('Error sending email:', error)
      }

      // Set order details for PaymentSuccess component
      setOrderDetails({
        userInfo,
        tripDetails,
        ipay88Payload,
        paymentDetails: {
          refNo: refNo || '',
          transId: transId || '',
          status: 'Success',
        },
      })
    }

    if (status === '1') {
      setPaymentStatus('Success')
      sendEmailOnSuccess()
    } else if (status === '0') {
      setPaymentStatus('Failed')
    } else {
      setPaymentStatus('Unknown')
    }

    // Clear local storage after setting the order details
    return () => {
      localStorage.removeItem('SELECTED_DESTINATION')
      localStorage.removeItem('USER_INFORMATION')
      localStorage.removeItem('IPAY88_PAYLOAD')
    }
  }, [searchParams])

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        {paymentStatus === 'Success' && <PaymentSuccess orderDetails={orderDetails} />}
        {paymentStatus === 'Failed' && <PaymentFailed />}
        {paymentStatus === 'Unknown' && (
          <div className="bg-white">
            <main className="mx-auto w-full max-w-7xl px-6 pb-8 pt-10 sm:pb-20 lg:px-8">
              <Image
                className="mx-auto h-20 w-auto"
                src={jumpseatIcon}
                alt="Your Company Icon"
              />
              <div className="mx-auto mt-10 max-w-2xl text-center sm:mt-14">
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                  Payment Status Unknown
                </h1>
                <p className="mt-4 text-base leading-7 text-gray-600 sm:mt-6 sm:text-lg sm:leading-8">
                  We couldn&apos;t determine the status of your payment. Please
                  contact support.
                </p>
              </div>
            </main>
          </div>
        )}
        {paymentStatus === 'Processing...' && <CircleLoader></CircleLoader>}
      </div>
    </div>
  )
}

export default function PaymentResponse() {
  return (
    <Suspense fallback={<CircleLoader></CircleLoader>}>
      <PaymentResponseContent />
    </Suspense>
  )
}
'use client'

import HeroSection from '@/components/HeroSection'
import PaymentSuccess from '@/components/PaymentSuccess'
import { useEffect, useState } from 'react'
import { OrderDetails } from '@/types/models'

const Home = () => {
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null)

  useEffect(() => {
    // Read from localStorage
    const userInfo = JSON.parse(localStorage.getItem('USER_INFORMATION') || '{}')
    const tripDetails = JSON.parse(localStorage.getItem('SELECTED_DESTINATION') || '{}')
    const ipay88Payload = JSON.parse(localStorage.getItem('IPAY88_PAYLOAD') || '{}')

    // Log the values to console for checking
    console.log('User Info:', userInfo)
    console.log('Trip Details:', tripDetails)

    // Set order details
    setOrderDetails({
      userInfo,
      tripDetails,
      ipay88Payload,
      paymentDetails: {
        refNo: 'TEST_REF_NO',
        transId: 'TEST_TRANS_ID',
        status: 'Success',
      },
    })
  }, [])

  // Log the orderDetails state to console
  console.log('Order Details State:', orderDetails)

  return (
    <>
      <HeroSection />
      {/* {orderDetails && <PaymentSuccess orderDetails={orderDetails} />} */}
    </>
  )
}

export default Home
'use client'
import Link from "next/link"
import { OrderDetails } from "@/types/models"
import Image from "next/image"

interface PaymentSuccessProps {
  orderDetails: OrderDetails | null;
}

export default function PaymentSuccess({ orderDetails }: PaymentSuccessProps) {
  const { userInfo, tripDetails, paymentDetails, ipay88Payload } = orderDetails || {}

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="max-w-xl">
          <h1 className="text-base font-medium text-[#ff9e39]">Thank you!</h1>
          <p className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
            It&apos;s on the way!
          </p>
          <p className="mt-2 text-base text-gray-500">
            Your order {ipay88Payload?.RefNo} has been confirmed and will be processed soon.
          </p>

          <dl className="mt-12 text-sm font-medium">
            <dt className="text-gray-900">Transaction Reference</dt>
            <dd className="mt-2 text-[#ff9e39]">{ipay88Payload?.RefNo}</dd>
          </dl>
        </div>

        <div className="mt-10 border-t border-gray-200">
          <h2 className="sr-only">Your order</h2>

          <h3 className="sr-only">Items</h3>
          <div className="flex space-x-6 border-b border-gray-200 py-10">
          <Image
                alt='test'
                src={tripDetails?.imageSrc || ''}
                width={1000}
                height={1000}
                className="h-20 w-20 flex-none rounded-lg bg-gray-100 object-cover object-center sm:h-40 sm:w-40"
              />
            <div className="flex flex-auto flex-col">
              <div>
                <h4 className="font-medium text-gray-900">{tripDetails?.name}</h4>
                <p className="mt-2 text-sm text-gray-600">{tripDetails?.description}</p>
              </div>
              <div className="mt-6 flex flex-1 items-end">
                <dl className="flex space-x-4 divide-x divide-gray-200 text-sm sm:space-x-6">
                  <div className="flex">
                    <dt className="font-medium text-gray-900">Quantity</dt>
                    <dd className="ml-2 text-gray-700">{ipay88Payload?.Quantity}</dd>
                  </div>
                  <div className="flex pl-4 sm:pl-6">
                    <dt className="font-medium text-gray-900">Price</dt>
                    <dd className="ml-2 text-gray-700">PHP {tripDetails?.price}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>

          <div className="sm:ml-40 sm:pl-6">
            <h3 className="sr-only">Your information</h3>

            <h4 className="sr-only">Contact information</h4>
            <dl className="grid grid-cols-2 gap-x-6 py-10 text-sm">
              <div>
                <dt className="font-medium text-gray-900">Contact information</dt>
                <dd className="mt-2 text-gray-700">
                  <p>{userInfo?.firstName} {userInfo?.lastName}</p>
                  <p>{userInfo?.email}</p>
                  <p>{userInfo?.phone}</p>
                </dd>
              </div>
              <div>
                <dt className="font-medium text-gray-900">Shipping address</dt>
                <dd className="mt-2 text-gray-700">
                  <address className="not-italic">
                    <span className="block">{userInfo?.address}</span>
                    <span className="block">{userInfo?.apartment}</span>
                    <span className="block">{userInfo?.city}, {userInfo?.region} {userInfo?.postalCode}</span>
                    <span className="block">{userInfo?.country}</span>
                  </address>
                </dd>
              </div>
            </dl>

            <h3 className="sr-only">Summary</h3>

            <dl className="space-y-6 border-t border-gray-200 pt-10 text-sm">
              <div className="flex justify-between">
                <dt className="font-medium text-gray-900">Subtotal</dt>
                <dd className="text-gray-700">{ipay88Payload?.Currency} {ipay88Payload?.SubTotal}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-medium text-gray-900">Processing Fee</dt>
                <dd className="text-gray-700">{ipay88Payload?.Currency} {ipay88Payload?.ProcessingFee}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-medium text-gray-900">Total</dt>
                <dd className="text-gray-900">{ipay88Payload?.Currency} {ipay88Payload?.Amount}</dd>
              </div>
            </dl>
          </div>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/experiences"
              className="mt-4 w-full rounded-md bg-[#ff9e39] px-32 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-[#ff9e39] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
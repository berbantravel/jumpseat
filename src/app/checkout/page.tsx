'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { useProductContext } from '@/contexts/ProductContext'
function CheckoutContent() {
  const { productDetails } = useProductContext();
  const [quantity, setQuantity] = useState(1)

  if (!productDetails) {
    return <div>No product selected. Please go back and select a product.</div>
  }

  const subtotal = productDetails.price * quantity
  const total = subtotal

  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQuantity(parseInt(e.target.value, 10))
  }

  //IPAY88 INTEGRATION TESTING

  const initiatePayment = async () => {
    try {
      const response = await fetch('/api/initiate-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          MerchantCode: 'PH01663', // Replace with your actual merchant code
          PaymentId: '1',
          RefNo: `REF-${Date.now()}-BRBTEST00001`, // Generate a unique reference number
          // Amount: total.toFixed(2),
          Amount: '15.00',
          Currency: 'PHP', // Adjust if you're using a different currency
          // ProductDescription: productDetails.name,
          ProdDesc: 'Test 1',
          UserName: 'Darrel Mendoza', // You might want to get this from a form input
          UserEmail: 'darrelmendoza85@gmail.com', // You might want to get this from a form input
          UserContact: '09176510945', // You might want to get this from a form input
          Remark: `Test 1 Remarks`,
          Lang: 'UTF-8',
          SignatureType: 'SHA256',
          // ResponseURL: `${window.location.origin}/payment-response`, // Adjust this to your actual response URL
          // BackendURL: `${window.location.origin}/api/payment-backend`, // Adjust this to your actual backend URL
          // ResponseURL: `${window.location.origin}/checkout`, // Adjust this to your actual response URL
          ResponseURL: `${window.location.origin}/api/payment-response`,
          BackendURL: `${window.location.origin}/api/payment-backend`, // Adjust this to your actual backend URL
        }),
      });

      const data: PaymentResponse = await response.json();
      if (data.success) {
        console.log('Payment initiated:', data.payload);
        submitToIPay88(data.payload);
      } else {
        console.error('Failed to initiate payment');
      }
    } catch (error) {
      console.error('Error initiating payment:', error);
    }
  }

  const submitToIPay88 = (payload: PaymentResponse['payload']) => {
    // Create a form element
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = 'https://sandbox.ipay88.com.ph/ePayment/entry.asp'; // Use the appropriate URL for production

    // Create input fields for each parameter
    Object.entries(payload).forEach(([key, value]) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = value;
      form.appendChild(input);
    });

    // Append the form to the body and submit it
    document.body.appendChild(form);
    form.submit();
  };

  //

  function formatPrice(price: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price)
  }

  return (
    <div className="bg-[#f8f8f8]">
      <main className="mx-auto max-w-7xl px-4 pb-24 pt-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <h1 className="sr-only">Checkout</h1>
          <form className="lg:grid lg:grid-cols-1 lg:gap-x-12 xl:gap-x-16">
            <div className="mt-10 lg:mt-0">
              <h2 className="text-lg font-medium text-gray-900">
                Order summary
              </h2>
              <div className="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">
                <h3 className="sr-only">Items in your cart</h3>
                <ul role="list" className="divide-y divide-gray-200">
                  <li
                    key={productDetails.id}
                    className="flex px-4 py-6 sm:px-6"
                  >
                    <div className="flex-shrink-0">
                      <Image
                        alt=""
                        src={productDetails.imageSrc}
                        className="w-20 rounded-md"
                        width={800}
                        height={600}
                      />
                    </div>
                    <div className="ml-6 flex flex-1 flex-col">
                      <div className="flex">
                        <div className="min-w-0 flex-1">
                          <h4 className="text-sm">
                            <div className="font-bold text-gray-700 hover:text-gray-800">
                              {productDetails.name}
                            </div>
                          </h4>
                        </div>
                        {/* <div className="ml-4 flow-root flex-shrink-0">
                  <button
                    type="button"
                    className="-m-2.5 flex items-center justify-center bg-white p-2.5 text-gray-400 hover:text-gray-500"
                  >
                    <span className="sr-only">Remove</span>
                    <TrashIcon aria-hidden="true" className="h-5 w-5" />
                  </button>
                </div> */}
                      </div>
                      <div className="flex flex-1 items-start justify-between">
                        <p className="mt-1 text-sm font-medium text-gray-900">
                          Php {formatPrice(productDetails.price)}/ pax
                        </p>

                        <div className="ml-4">
                          <label htmlFor="quantity" className="sr-only">
                            Quantity
                          </label>
                          <select
                            id="quantity"
                            name="quantity"
                            value={quantity}
                            onChange={handleQuantityChange}
                            className="rounded-md border border-gray-300 text-left text-base font-medium text-gray-700 shadow-sm focus:border-[#ff9e39] focus:outline-none focus:ring-1 focus:ring-[#ff9e39] sm:text-sm"
                          >
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                              <option key={num} value={num}>
                                {num}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
                <dl className="space-y-6 border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div className="flex items-center justify-between">
                    <dt className="text-sm">Subtotal</dt>
                    <dd className="text-sm font-medium text-gray-900">
                      Php {formatPrice(subtotal)}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                    <dt className="text-base font-medium">Total</dt>
                    <dd className="text-base font-medium text-gray-900">
                      Php {formatPrice(total)}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
            <div>
              <div>
                <h2 className="mt-10 text-lg font-medium text-gray-900">
                  Contact information
                </h2>
                <div className="mt-4">
                  <label
                    htmlFor="email-address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      id="email-address"
                      name="email-address"
                      type="email"
                      autoComplete="email"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#ff9e39] focus:ring-[#ff9e39] sm:text-sm"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-10 border-t border-gray-200 pt-10">
                <h2 className="text-lg font-medium text-gray-900">
                  Shipping information
                </h2>
                <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                  <div>
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      First name
                    </label>
                    <div className="mt-1">
                      <input
                        id="first-name"
                        name="first-name"
                        type="text"
                        autoComplete="given-name"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#ff9e39] focus:ring-[#ff9e39] sm:text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="last-name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Last name
                    </label>
                    <div className="mt-1">
                      <input
                        id="last-name"
                        name="last-name"
                        type="text"
                        autoComplete="family-name"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#ff9e39] focus:ring-[#ff9e39] sm:text-sm"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="company"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Company
                    </label>
                    <div className="mt-1">
                      <input
                        id="company"
                        name="company"
                        type="text"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#ff9e39] focus:ring-[#ff9e39] sm:text-sm"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Address
                    </label>
                    <div className="mt-1">
                      <input
                        id="address"
                        name="address"
                        type="text"
                        autoComplete="street-address"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#ff9e39] focus:ring-[#ff9e39] sm:text-sm"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="apartment"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Apartment, suite, etc.
                    </label>
                    <div className="mt-1">
                      <input
                        id="apartment"
                        name="apartment"
                        type="text"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#ff9e39] focus:ring-[#ff9e39] sm:text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium text-gray-700"
                    >
                      City
                    </label>
                    <div className="mt-1">
                      <input
                        id="city"
                        name="city"
                        type="text"
                        autoComplete="address-level2"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#ff9e39] focus:ring-[#ff9e39] sm:text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="country"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Country
                    </label>
                    <div className="mt-1">
                      <select
                        id="country"
                        name="country"
                        autoComplete="country-name"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#ff9e39] focus:ring-[#ff9e39] sm:text-sm"
                      >
                        <option>United States</option>
                        <option>Canada</option>
                        <option>Mexico</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="region"
                      className="block text-sm font-medium text-gray-700"
                    >
                      State / Province
                    </label>
                    <div className="mt-1">
                      <input
                        id="region"
                        name="region"
                        type="text"
                        autoComplete="address-level1"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#ff9e39] focus:ring-[#ff9e39] sm:text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="postal-code"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Postal code
                    </label>
                    <div className="mt-1">
                      <input
                        id="postal-code"
                        name="postal-code"
                        type="text"
                        autoComplete="postal-code"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#ff9e39] focus:ring-[#ff9e39] sm:text-sm"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Phone
                    </label>
                    <div className="mt-1">
                      <input
                        id="phone"
                        name="phone"
                        type="text"
                        autoComplete="tel"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#ff9e39] focus:ring-[#ff9e39] sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
                <div className="relative mt-10 flex items-start">
                  <div className="flex h-6 items-center">
                    <input
                      id="offers"
                      name="offers"
                      type="checkbox"
                      aria-describedby="offers-description"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div className="ml-3 text-sm leading-6">
                    <label
                      htmlFor="offers"
                      className="font-medium text-gray-900"
                    >
                      Terms and Conditions
                    </label>
                    <p id="offers-description" className="text-gray-500">
                      I certify that I have read and accept the Terms of Use and
                      Privacy Statement and I have read and understand the Rate
                      Description and Rate Rules for my reservation. I am at
                      least 18 years of age and at least one guest in my party
                      will meet the minimum check-in age requirement for the
                      hotel upon arrival. Minimum Check-ln Age: 18
                    </p>
                  </div>
                </div>
                <div className="mt-10 border-t border-gray-200 py-6">
                  <button
                    // type="submit"
                    type="button"
                    onClick={initiatePayment}
                    className="w-full rounded-md border border-transparent bg-[#ff9e39] px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-[#ff9e39] focus:outline-none focus:ring-2 focus:ring-[#ff9e39] focus:ring-offset-2 focus:ring-offset-gray-50"
                  >
                    Confirm order
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}

export default function Checkout() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CheckoutContent />
    </Suspense>
  )
}

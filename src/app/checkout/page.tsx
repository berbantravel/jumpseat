'use client'

import { useState, Suspense, useEffect } from 'react'
import Image from 'next/image'
import { useProductContext } from '@/contexts/ProductContext'
import { CheckoutProvider, useCheckoutContext } from '@/contexts/CheckoutContext'

type PaymentResponse = {
  success: boolean;
  payload: {
    [key: string]: string;
  };
};

function CheckoutContent() {
  const { productDetails, setProductDetails } = useProductContext();
  const { formData, setFormData } = useCheckoutContext();
  const [quantity, setQuantity] = useState(1)
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);

  const isFormValid = () => {
    return (
      isValidEmail(formData.email) &&
      formData.firstName &&
      formData.lastName &&
      formData.address &&
      formData.city &&
      formData.country &&
      formData.postalCode &&
      formData.phone &&
      termsAccepted
    );
  };

  useEffect(() => {
    if (!productDetails) {
      const stored = localStorage.getItem('SELECTED_DESTINATION');
      if (stored) {
        setProductDetails(JSON.parse(stored));
      }
    }
    setIsLoading(false);
  }, [productDetails, setProductDetails]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!productDetails) {
    return <div>No product selected. Please go back and select a product.</div>;
  }

  const subtotal = productDetails.price * quantity
  const total = subtotal

  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQuantity(parseInt(e.target.value, 10))
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const generateRefNo = () => {
    const timestamp = Date.now()
    const fullName = `${formData.firstName}${formData.lastName}`.replace(/\s+/g, '').toUpperCase()
    return `REF-${timestamp}-${productDetails.id}`
  }

  const initiatePayment = async () => {
    try {
      localStorage.setItem('USER_INFORMATION', JSON.stringify(formData));

      setIsProcessing(true);

      const response = await fetch('/api/initiate-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          MerchantCode: process.env.NEXT_PUBLIC_IPAY88_MERCHANT_CODE,
          PaymentId: '1', // Pending Business Requirements
          RefNo: generateRefNo(),
          Amount: total.toFixed(2),
          Currency: process.env.NEXT_PUBLIC_IPAY88_CURRENCY,
          ProdDesc: `${productDetails.name} - ${productDetails.description}`,
          UserName: `${formData.firstName} ${formData.lastName}`,
          UserEmail: formData.email,
          UserContact: formData.phone,
          Remark: `Test 1 Remarks`, // Add new field
          Lang: process.env.NEXT_PUBLIC_IPAY88_LANG,
          SignatureType: process.env.NEXT_PUBLIC_IPAY88_SIGNATURE_TYPE,
          ResponseURL: `${window.location.origin}/api/payment-response`,
          BackendURL: `${window.location.origin}/api/payment-backend`,
        }),
      });

      const data: PaymentResponse = await response.json();
      if (data.success) {
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

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

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
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      onBlur={() => setEmailTouched(true)}
                      className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-[#ff9e39] focus:ring-[#ff9e39] sm:text-sm ${emailTouched && !isValidEmail(formData.email) ? 'border-red-500' : ''
                        }`}
                    />
                    {emailTouched && !isValidEmail(formData.email) && (
                      <p className="mt-2 text-sm text-red-600">Please enter a valid email address.</p>
                    )}
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
                      htmlFor="firstName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      First name
                    </label>
                    <div className="mt-1">
                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        autoComplete="given-name"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#ff9e39] focus:ring-[#ff9e39] sm:text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Last name
                    </label>
                    <div className="mt-1">
                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        autoComplete="family-name"
                        value={formData.lastName}
                        onChange={handleInputChange}
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
                        value={formData.company}
                        onChange={handleInputChange}
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
                        value={formData.address}
                        onChange={handleInputChange}
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
                        value={formData.apartment}
                        onChange={handleInputChange}
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
                        value={formData.city}
                        onChange={handleInputChange}
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
                        value={formData.country}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#ff9e39] focus:ring-[#ff9e39] sm:text-sm"
                      >
                        <option value="">- Please select country -</option>
                        <option value="United States">United States</option>
                        <option value="Canada">Canada</option>
                        <option value="Mexico">Mexico</option>
                        {/* Add more countries as needed */}
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
                        value={formData.region}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#ff9e39] focus:ring-[#ff9e39] sm:text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="postalCode"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Postal code
                    </label>
                    <div className="mt-1">
                      <input
                        id="postalCode"
                        name="postalCode"
                        type="text"
                        autoComplete="postal-code"
                        value={formData.postalCode}
                        onChange={handleInputChange}
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
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#ff9e39] focus:ring-[#ff9e39] sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
                <div className="relative mt-10 flex items-start">
                  <div className="flex h-6 items-center">
                    <input
                      id="terms"
                      name="terms"
                      type="checkbox"
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
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
                    type="button"
                    onClick={initiatePayment}
                    disabled={isProcessing || !isFormValid()}
                    className={`w-full rounded-md border border-transparent px-4 py-3 text-base font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ff9e39] focus:ring-offset-2 focus:ring-offset-gray-50 ${isProcessing || !isFormValid()
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-[#ff9e39] hover:bg-[#ff9e39]'
                      }`}
                  >
                    {isProcessing ? 'Processing...' : 'Confirm order'}
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
    <CheckoutProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <CheckoutContent />
      </Suspense>
    </CheckoutProvider>
  )
}

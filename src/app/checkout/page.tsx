'use client'

import { useState, Suspense, useEffect } from 'react'
import Image from 'next/image'
import { useProductContext } from '@/contexts/ProductContext'
import {
  CheckoutProvider,
  useCheckoutContext,
} from '@/contexts/CheckoutContext'
import { countries } from '@/constants/countries'
import NoProductSeletcted from '@/components/NoProductSelected'
import CircleLoader from '@/components/CircleLoader'
import PaymentMethodSection from '@/components/PaymentMethodSection'
import MainBerbanLogo from '@/images/logos/berbanSuitcase.png'

type PaymentResponse = {
  success: boolean
  payload: {
    [key: string]: string
  }
}

function CheckoutContent() {
  const { productDetails, setProductDetails } = useProductContext()
  const { formData, setFormData } = useCheckoutContext()
  const [quantity, setQuantity] = useState(1)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [checkoutConfirmed, setcheckoutConfirmed] = useState(false)
  const [emailTouched, setEmailTouched] = useState(false)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    number | null
  >(null)

  const handlePaymentMethodSelect = (methodId: number) => {
    setSelectedPaymentMethod(methodId)

    // If BPI Installment direct integration is selected
    if (methodId === 107) {
      // The tenor selection will be handled on iPay88's page
      // No additional action needed here
    }

    // For specific tenor selections (Option 2)
    const bpiInstallmentIds = [80, 81, 82, 83] // Add all BPI installment IDs
    if (bpiInstallmentIds.includes(methodId)) {
      // These already have specific tenors associated with their IDs
      // The PaymentId will be sent directly to iPay88
    }
  }

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
      termsAccepted &&
      checkoutConfirmed &&
      selectedPaymentMethod !== null
    )
  }

  useEffect(() => {
    if (!productDetails) {
      const stored = localStorage.getItem('SELECTED_DESTINATION')
      if (stored) {
        setProductDetails(JSON.parse(stored))
      }
    }
    setIsLoading(false)
  }, [productDetails, setProductDetails])

  if (isLoading) {
    return <CircleLoader></CircleLoader>
  }

  if (!productDetails) {
    return <NoProductSeletcted />
  }

  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQuantity(parseInt(e.target.value, 10))
  }

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const generateRefNo = () => {
    const timestamp = Date.now()
    const fullName = `${formData.firstName}${formData.lastName}`
      .replace(/\s+/g, '')
      .toUpperCase()
    return `REF-${timestamp}-${productDetails.id}`
  }

  const initiatePayment = async () => {
    try {
      localStorage.setItem('USER_INFORMATION', JSON.stringify(formData))

      setIsProcessing(true)

      const response = await fetch('/api/initiate-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          MerchantCode: process.env.NEXT_PUBLIC_IPAY88_MERCHANT_CODE,
          PaymentId: selectedPaymentMethod,
          RefNo: generateRefNo(),
          Quantity: quantity,
          SubTotal: subtotal,
          Total: total,
          ProcessingFee: processingFee,
          Amount: total.toFixed(2),
          Currency: process.env.NEXT_PUBLIC_IPAY88_CURRENCY,
          ProdDesc: `${productDetails.name} - ${productDetails.description}`,
          UserName: `${formData.firstName} ${formData.lastName}`,
          UserEmail: formData.email,
          UserContact: formData.phone,
          Remark: formData.message, // Add new field
          Lang: process.env.NEXT_PUBLIC_IPAY88_LANG,
          SignatureType: process.env.NEXT_PUBLIC_IPAY88_SIGNATURE_TYPE,
          ResponseURL: `${window.location.origin}/api/payment-response`,
          BackendURL: `${window.location.origin}/api/payment-backend`,
        }),
      })

      const data: PaymentResponse = await response.json()

      

      if (data.success) {
        localStorage.setItem('IPAY88_PAYLOAD', JSON.stringify(data.payload))
        console.log(data)
      } else {
        console.error('Failed to initiate payment')
      }
    } catch (error) {
      console.error('Error initiating payment:', error)
    }
  }

  const submitToIPay88 = (payload: PaymentResponse['payload']) => {
    const form = document.createElement('form')
    form.method = 'POST'
    form.action = 'https://sandbox.ipay88.com.ph/ePayment/entry.asp'
    // form.action = process.env.NEXT_PUBLIC_IPAY88_URL as string

    Object.entries(payload).forEach(([key, value]) => {
      const input = document.createElement('input')
      input.type = 'hidden'
      input.name = key
      input.value = value
      form.appendChild(input)
    })

    document.body.appendChild(form)
    form.submit()
  }

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  function formatPrice(price: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price)
  }

  const getProcessingFee = (
    paymentMethodId: number | null,
    subtotal: number,
  ): number => {
    if (paymentMethodId === null) return 0

    const calculateWithVAT = (percentage: number) => {
      const fee = subtotal * (percentage / 100)
      return fee + fee * 0.12 // 12% VAT
    }

    switch (paymentMethodId) {
      case 1:
      case 7:
      case 37:
      case 94:
      case 72:
      case 104:
      case 97:
      case 134:
      case 139:
        return calculateWithVAT(0.5) // 0.50% + 12% VAT

      case 3: // GCash
        return calculateWithVAT(2.1) // 2.10% + 12% VAT

      case 6: // PayPal
        return 5.0

      case 38: // GrabPay
        return calculateWithVAT(2.3) // 2.30% + 12% VAT

      case 57: // Maya
        return calculateWithVAT(2.0) // 2.00% + 12% VAT

      case 103: // ShopeePay
        return calculateWithVAT(2.0) // Assuming 2.00% + 12% VAT, please adjust if different

      case 129: // WeChatPay QR via AUB
        return subtotal * 0.02 // 2.00%

      case 130: // AliPay QR via AUB
        return subtotal * 0.025 // 2.50%

      case 58: // BPI Online
      case 69: // Brankas Online
        return 25.0 + 25.0 * 0.12 // Php 25.00 + 12% VAT

      case 18: // DragonPay Online
        return 25.0 // Php 25.00 per transaction

      case 19: // DragonPay OTC Non-Bank
        return 25.0 // Php 25.00 per transaction

      case 20: // DragonPay OTC Bank
        return 20.0 // Php 20.00 per transaction

      default:
        return 0
    }
  }

  const getProcessingFeeDescription = (
    paymentMethodId: number | null,
  ): string => {
    if (paymentMethodId === null) return ''

    switch (paymentMethodId) {
      case 1:
      case 7:
      case 37:
      case 94:
      case 72:
      case 104:
      case 97:
      case 134:
      case 139:
        return '0.50% + 12% VAT'
      case 3:
        return '2.10% + 12% VAT'
      case 6:
        return 'Php 5.00'
      case 38:
        return '2.30% + 12% VAT'
      case 57:
      case 103:
        return '2.00% + 12% VAT'
      case 129:
        return '2.00%'
      case 130:
        return '2.50%'
      case 58:
      case 69:
        return 'Php 25.00 + 12% VAT'
      case 18:
      case 19:
        return 'Php 25.00'
      case 20:
        return 'Php 20.00'
      default:
        return ''
    }
  }

  const subtotal = productDetails.price * quantity
  const processingFee = getProcessingFee(selectedPaymentMethod, subtotal)
  const total = subtotal + processingFee

  return (
    <>
      <div className="bg-[#f8f8f8]">
        <main className="mx-auto max-w-7xl px-4 pb-24 pt-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <h1 className="sr-only">Checkout</h1>
            <form className="lg:grid lg:grid-cols-1 lg:gap-x-12 xl:gap-x-16">
              <div>
                <div>
                  <h2 className="text-lg font-medium text-gray-900">
                    Contact information
                  </h2>
                  <div className="mt-4">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email address <span className="text-red-600">*</span>
                    </label>
                    <div className="mt-1">
                      <input
                        required
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        onBlur={() => setEmailTouched(true)}
                        className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-[#ff9e39] focus:ring-[#ff9e39] sm:text-sm ${
                          emailTouched && !isValidEmail(formData.email)
                            ? 'border-red-500'
                            : ''
                        }`}
                      />
                      {emailTouched && !isValidEmail(formData.email) && (
                        <p className="mt-2 text-sm text-red-600">
                          Please enter a valid email address.
                        </p>
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
                        First name <span className="text-red-600">*</span>
                      </label>
                      <div className="mt-1">
                        <input
                          required
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
                        Last name <span className="text-red-600">*</span>
                      </label>
                      <div className="mt-1">
                        <input
                          required
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
                        Address <span className="text-red-600">*</span>
                      </label>
                      <div className="mt-1">
                        <input
                          required
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
                        City <span className="text-red-600">*</span>
                      </label>
                      <div className="mt-1">
                        <input
                          required
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
                        Country <span className="text-red-600">*</span>
                      </label>
                      <div className="mt-1">
                        <select
                          required
                          id="country"
                          name="country"
                          autoComplete="country-name"
                          value={formData.country}
                          onChange={handleInputChange}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#ff9e39] focus:ring-[#ff9e39] sm:text-sm"
                        >
                          <option value="">- Please select country -</option>
                          {countries.map((country) => (
                            <option key={country} value={country}>
                              {country}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="region"
                        className="block text-sm font-medium text-gray-700"
                      >
                        State / Province <span className="text-red-600">*</span>
                      </label>
                      <div className="mt-1">
                        <input
                          required
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
                        Postal code <span className="text-red-600">*</span>
                      </label>
                      <div className="mt-1">
                        <input
                          required
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
                        Phone <span className="text-red-600">*</span>
                      </label>
                      <div className="mt-1">
                        <input
                          required
                          id="phone"
                          name="phone"
                          type="text"
                          autoComplete="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#ff9e39] focus:ring-[#ff9e39] sm:text-sm"
                        />
                      </div>
                      <div className="mt-10 border-t border-gray-200 pt-10">
                        <h2 className="text-lg font-medium text-gray-900">
                          Additional Information
                        </h2>
                        <div className="mt-4">
                          <label
                            htmlFor="message"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Order Notes (optional)
                          </label>
                          <div className="mt-1">
                            <textarea
                              id="message"
                              name="message"
                              value={formData.message}
                              onChange={handleInputChange}
                              rows={4}
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#ff9e39] focus:ring-[#ff9e39] sm:text-sm"
                            />
                          </div>
                        </div>
                      </div>
                      <PaymentMethodSection
                        onPaymentMethodSelect={handlePaymentMethodSelect}
                      />
                      <div className="mt-10 border-t border-gray-200 pt-10 lg:mt-0">
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
                                    <label
                                      htmlFor="quantity"
                                      className="sr-only"
                                    >
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
                            {processingFee > 0 && (
                              <div className="flex items-center justify-between">
                                <dt className="text-sm">
                                  Processing Fee (
                                  {getProcessingFeeDescription(
                                    selectedPaymentMethod,
                                  )}
                                  )
                                </dt>
                                <dd className="text-sm font-medium text-gray-900">
                                  Php {formatPrice(processingFee)}
                                </dd>
                              </div>
                            )}
                            <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                              <dt className="text-base font-medium">Total</dt>
                              <dd className="text-base font-medium text-gray-900">
                                Php {formatPrice(total)}
                              </dd>
                            </div>
                          </dl>
                        </div>
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
                        className="h-4 w-4 rounded border-gray-300 text-[#ff9e39] focus:ring-[#ff9e39]"
                      />
                    </div>
                    <div className="ml-3 text-sm leading-6">
                      <label
                        htmlFor="offers"
                        className="font-medium text-gray-900"
                      >
                        Terms and Conditions{' '}
                        <span className="text-red-600">*</span>
                      </label>
                      <p id="offers-description" className="text-gray-500">
                        I certify that I have read and accept the
                        <a
                          href="/Payment Terms and Conditions_BerBan Travel Corporation 2024.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="cursor-pointer font-medium text-[#ff9e39] hover:underline"
                        >
                          {' '}
                          Terms of Use and Privacy Statement{' '}
                        </a>
                        and I have read and understand the Rate Description and
                        Rate Rules for my reservation. I am at least 18 years of
                        age and at least one guest in my party will meet the
                        minimum check-in age requirement for the hotel upon
                        arrival. Minimum Check-ln Age: 18
                      </p>
                    </div>
                  </div>
                  <div className="relative mt-10 flex items-start">
                    <div className="flex h-6 items-center">
                      <input
                        id="terms"
                        name="terms"
                        type="checkbox"
                        checked={checkoutConfirmed}
                        onChange={(e) => setcheckoutConfirmed(e.target.checked)}
                        className="h-4 w-4 rounded border-gray-300 text-[#ff9e39] focus:ring-[#ff9e39]"
                      />
                    </div>
                    <div className="ml-3 text-sm leading-6">
                      <label
                        htmlFor="offers"
                        className="font-medium text-gray-900"
                      >
                        Confirmation <span className="text-red-600">*</span>
                      </label>
                      <p className="mb-4 text-sm text-gray-600">
                        Please carefully review all the information you&apos;ve
                        provided above to ensure its accuracy. By proceeding,
                        you confirm that all details, including your personal
                        information, shipping address, and order details, are
                        correct. Any errors in this information may result in
                        delays or issues with your order. If you need to make
                        any changes, please do so before confirming your order.
                      </p>
                      <div className="flex items-center sm:items-start flex-row">
                  <Image
                    className="h-8 w-auto cursor-pointer"
                    src={MainBerbanLogo}
                    alt="Your Company Icon"
                  />
                  <p className="caption2Light px-2 text-sm text-gray-600">
                  © Operated and Powered by BerBan Travel Corporation
                  </p>
                </div>
                    </div>
                    
                  </div>
                  <div className="mt-10 border-t border-gray-200 py-6">
                    <button
                      type="button"
                      onClick={initiatePayment}
                      disabled={isProcessing || !isFormValid()}
                      className={`w-full rounded-md border border-transparent px-4 py-3 text-base font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ff9e39] focus:ring-offset-2 focus:ring-offset-gray-50 ${
                        isProcessing || !isFormValid()
                          ? 'cursor-not-allowed bg-gray-400'
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
    </>
  )
}

export default function Checkout() {
  return (
    <CheckoutProvider>
      <Suspense fallback={<CircleLoader></CircleLoader>}>
        <CheckoutContent />
      </Suspense>
    </CheckoutProvider>
  )
}

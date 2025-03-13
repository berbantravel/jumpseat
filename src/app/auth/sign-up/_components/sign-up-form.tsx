'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'

export default function MultiStepForm() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [form, setForm] = useState({
    companyName: '',
    companyAddress: '',
    phoneNumber: '',
    email: '',
    website: '',

    primaryContactTitle: '',
    primaryContactOther: '',
    primaryFirstName: '',
    primaryLastName: '',
    primaryPosition: '',
    primaryEmail: '',
    primaryMobile: '',
    secondaryFirstName: '',
    secondaryLastName: '',
    secondaryPosition: '',
    secondaryEmail: '',
    secondaryMobile: '',
    typeOfOperation: '',
    existingMarkets: [] as string[],
    productsServices: [] as Array<{ type: string; name: string }>,
    newProductServiceType: 'product',
    newProductServiceName: '',
    existingMarketsOther: '',
    companyType: '',
    companyTypeOther: '',
  })

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target
    setForm((prev) => {
      const updatedValues = checked
        ? [...prev.existingMarkets, value]
        : prev.existingMarkets.filter((item) => item !== value)
      return { ...prev, [name]: updatedValues }
    })
  }

  const validateCurrentStep = () => {
    switch (step) {
      case 1:
        if (!form.companyName || !form.email || !form.phoneNumber) {
          toast.error('Please fill in all required company information')
          return false
        }
        break

      case 2:
        if (
          !form.primaryContactTitle ||
          !form.primaryFirstName ||
          !form.primaryLastName ||
          !form.primaryEmail ||
          !form.primaryMobile
        ) {
          toast.error('Please fill in all required primary contact fields')
          return false
        }
        if (form.primaryContactTitle === 'Other' && !form.primaryContactOther) {
          toast.error('Please specify your title')
          return false
        }
        break

      case 3:
        // Secondary contact is optional, no validation needed
        break

      case 4:
        if (!form.typeOfOperation) {
          toast.error('Please select a type of operation')
          return false
        }
        break

      case 5:
        if (form.existingMarkets.length === 0) {
          toast.error('Please select at least one existing market')
          return false
        }
        if (
          form.existingMarkets.includes('Others') &&
          !form.existingMarketsOther
        ) {
          toast.error("Please specify 'Other' markets")
          return false
        }
        break

      case 6:
        if (form.productsServices.length === 0) {
          toast.error('Please add at least one product or service')
          return false
        }
        break

      case 7:
        if (!form.companyType) {
          toast.error('Please select a company type')
          return false
        }
        if (form.companyType === 'Other' && !form.companyTypeOther) {
          toast.error('Please specify your company type')
          return false
        }
        break
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateCurrentStep()) return

    setIsSubmitting(true)
    try {
      // Clean payload with proper null handling
      const payload = {
        ...form,
        productsServices: form.productsServices.map((item) => ({
          type: item.type,
          name: item.name,
        })),
        existingMarkets: form.existingMarkets.includes('Others')
          ? [
              ...form.existingMarkets.filter((m) => m !== 'Others'),
              form.existingMarketsOther,
            ]
          : form.existingMarkets,
        companyTypeOther:
          form.companyType === 'Other' ? form.companyTypeOther : null,
      }

      // Remove temporary fields
      const {
        newProductServiceType,
        newProductServiceName,
        existingMarketsOther,
        ...cleanPayload
      } = payload

      const res = await fetch('/api/auth/sign-up', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cleanPayload),
      })

      if (!res.ok) throw await res.json()

      toast.success('Data saved successfully!')
      router.push('/thank-you')
    } catch (error: any) {
      toast.error(error.message || 'Submission failed')
      console.error('Submission error details:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const nextStep = () => {
    if (!validateCurrentStep()) return
    setStep((prev) => Math.min(prev + 1, 7))
  }

  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1))

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-8 flex flex-col gap-4 text-center">
        <div className="flex flex-col">
          <h1 className="w-full text-center font-poppinsSemiBold text-2xl font-semibold text-gray-800 sm:text-4xl ">
            Join Our Travel Network
          </h1>
        </div>
        <div className="flex justify-center gap-2 ">
          {[1, 2, 3, 4, 5, 6, 7].map((s) => (
            <div
              key={s}
              className={`h-3 w-3 rounded-full ${s <= step ? 'bg-[#ff9e39]' : 'bg-gray-300'}`}
            />
          ))}
        </div>
      </div>

      {/* Step 1: Company Information */}
      {step === 1 && (
        <div>
          <h2 className="mb-6 text-xl font-semibold">Company Information</h2>
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-gray-700">Company Name *</label>
              <input
                name="companyName"
                value={form.companyName}
                onChange={handleChange}
                className="w-full rounded border p-2"
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-gray-700">
                Company Address *
              </label>
              <input
                name="companyAddress"
                value={form.companyAddress}
                onChange={handleChange}
                className="w-full rounded border p-2"
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-gray-700">
                Telephone Number *
              </label>
              <input
                name="phoneNumber"
                value={form.phoneNumber}
                onChange={handleChange}
                className="w-full rounded border p-2"
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-gray-700">
                Email Address *
              </label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className="w-full rounded border p-2"
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-gray-700">Website</label>
              <input
                name="website"
                value={form.website}
                onChange={handleChange}
                className="w-full rounded border p-2"
              />
            </div>
          </div>
          <div className="mt-8 flex justify-end">
            <button
              type="button"
              onClick={nextStep}
              className="w-full rounded bg-[#ff9e39] px-6 py-2 text-white hover:bg-[#ea9030] disabled:bg-gray-400"
            >
              Next
            </button>
          </div>
        </div>
      )}
      {/* Step 2: Primary Contact */}
      {step === 2 && (
        <div>
          <h2 className="mb-6 text-xl font-semibold">Primary Contact Person</h2>
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-gray-700">Title *</label>
              <div className="flex flex-wrap gap-4">
                {['Mr', 'Ms', 'Mrs', 'Rather not say', 'Other'].map((title) => (
                  <label key={title} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="primaryContactTitle" // Changed from primaryTitle
                      value={title}
                      checked={form.primaryContactTitle === title}
                      onChange={handleChange}
                      required
                    />
                    {title}
                  </label>
                ))}
              </div>
              {form.primaryContactTitle === 'Other' && ( // Changed from primaryContactOther
                <input
                  name="primaryContactOther" // Changed from primaryOtherTitle
                  placeholder="Specify Title"
                  value={form.primaryContactOther}
                  onChange={handleChange}
                  className="mt-2 w-full rounded border p-2"
                  required
                />
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block text-gray-700">First Name *</label>
                <input
                  name="primaryFirstName"
                  value={form.primaryFirstName}
                  onChange={handleChange}
                  className="w-full rounded border p-2"
                  required
                />
              </div>
              <div>
                <label className="mb-1 block text-gray-700">Last Name *</label>
                <input
                  name="primaryLastName"
                  value={form.primaryLastName}
                  onChange={handleChange}
                  className="w-full rounded border p-2"
                  required
                />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-gray-700">Position</label>
              <input
                name="primaryPosition"
                value={form.primaryPosition}
                onChange={handleChange}
                className="w-full rounded border p-2"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block text-gray-700">
                  Email Address *
                </label>
                <input
                  name="primaryEmail"
                  type="email"
                  value={form.primaryEmail}
                  onChange={handleChange}
                  className="w-full rounded border p-2"
                  required
                />
              </div>
              <div>
                <label className="mb-1 block text-gray-700">
                  Mobile Number *
                </label>
                <input
                  name="primaryMobile"
                  value={form.primaryMobile}
                  onChange={handleChange}
                  className="w-full rounded border p-2"
                  required
                />
              </div>
            </div>
          </div>
          <div className="mt-8 flex justify-between gap-4">
            <button
              type="button"
              onClick={prevStep}
              className="w-full rounded bg-gray-500 px-6 py-2 text-white hover:bg-gray-600"
            >
              Back
            </button>
            <button
              type="button"
              onClick={nextStep}
              className="w-full rounded bg-[#ff9e39] px-6 py-2 text-white hover:bg-[#ea9030]"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Secondary Contact */}
      {step === 3 && (
        <div>
          <h2 className="mb-6 text-xl font-semibold">
            Secondary Contact Person
          </h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block text-gray-700">First Name</label>
                <input
                  name="secondaryFirstName"
                  value={form.secondaryFirstName}
                  onChange={handleChange}
                  className="w-full rounded border p-2"
                />
              </div>
              <div>
                <label className="mb-1 block text-gray-700">Last Name</label>
                <input
                  name="secondaryLastName"
                  value={form.secondaryLastName}
                  onChange={handleChange}
                  className="w-full rounded border p-2"
                />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-gray-700">Position</label>
              <input
                name="secondaryPosition"
                value={form.secondaryPosition}
                onChange={handleChange}
                className="w-full rounded border p-2"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block text-gray-700">
                  Email Address
                </label>
                <input
                  name="secondaryEmail"
                  type="email"
                  value={form.secondaryEmail}
                  onChange={handleChange}
                  className="w-full rounded border p-2"
                />
              </div>
              <div>
                <label className="mb-1 block text-gray-700">
                  Mobile Number
                </label>
                <input
                  name="secondaryMobile"
                  value={form.secondaryMobile}
                  onChange={handleChange}
                  className="w-full rounded border p-2"
                />
              </div>
            </div>
          </div>
          <div className="mt-8 flex justify-between gap-4">
            <button
              type="button"
              onClick={prevStep}
              className="w-full rounded bg-gray-500 px-6 py-2 text-white hover:bg-gray-600"
            >
              Back
            </button>
            <button
              type="button"
              onClick={nextStep}
              className="w-full rounded bg-[#ff9e39] px-6 py-2 text-white hover:bg-[#ea9030]"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Type of Operation */}
      {step === 4 && (
        <div>
          <h2 className="mb-6 text-xl font-semibold">Type of Operation</h2>
          <div className="space-y-3">
            {['Inbound', 'Outbound', 'Online Travel Agency'].map(
              (operation) => (
                <label key={operation} className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="typeOfOperation"
                    value={operation}
                    checked={form.typeOfOperation === operation}
                    onChange={handleChange}
                    className="h-5 w-5"
                    required
                  />
                  <span className="text-gray-700">{operation}</span>
                </label>
              ),
            )}
          </div>
          <div className="mt-8 flex justify-between gap-4">
            <button
              type="button"
              onClick={prevStep}
              className="w-full rounded bg-gray-500 px-6 py-2 text-white hover:bg-gray-600"
            >
              Back
            </button>
            <button
              type="button"
              onClick={nextStep}
              className="w-full rounded bg-[#ff9e39] px-6 py-2 text-white hover:bg-[#ea9030]"
            >
              Next
            </button>
          </div>
        </div>
      )}
      {/* Step 5: Existing Markets */}
      {step === 5 && (
        <div>
          <h2 className="mb-6 text-xl font-semibold">Existing Market/s</h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              'Local Tourists',
              'Students',
              'MICE',
              'Expats',
              'Business Travelers',
              'International Tourists',
              'Others',
            ].map((market) => (
              <label key={market} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="existingMarkets"
                  value={market}
                  checked={form.existingMarkets.includes(market)}
                  onChange={handleCheckboxChange}
                  className="h-5 w-5"
                />
                <span className="text-gray-700">{market}</span>
              </label>
            ))}
          </div>
          {form.existingMarkets.includes('Others') && (
            <div className="mt-4">
              <input
                name="existingMarketsOther"
                placeholder="Please specify other markets"
                value={form.existingMarketsOther}
                onChange={handleChange}
                className="w-full rounded border p-2"
              />
            </div>
          )}
          <div className="mt-8 flex justify-between gap-4">
            <button
              type="button"
              onClick={prevStep}
              className="w-full rounded bg-gray-500 px-6 py-2 text-white hover:bg-gray-600"
            >
              Back
            </button>
            <button
              type="button"
              onClick={nextStep}
              className="w-full rounded bg-[#ff9e39] px-6 py-2 text-white hover:bg-[#ea9030]"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Step 6: Products & Services */}
      {step === 6 && (
        <div>
          <h2 className="text-xl font-semibold ">
            Name of Product or Services
          </h2>
          <div className="space-y-4">
            {form.productsServices.map((item, index) => (
              <div key={index} className="rounded-lg border bg-gray-50 p-4">
                <div className="mb-2 flex items-start justify-between">
                  <div>
                    <span className="inline-block rounded bg-[#ff9e39] px-2 py-1 text-sm text-white">
                      {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                    </span>
                    <h3 className="mt-2 font-medium text-gray-800">
                      {item.name}
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setForm((prev) => ({
                        ...prev,
                        productsServices: prev.productsServices.filter(
                          (_, i) => i !== index,
                        ),
                      }))
                    }
                    className="text-xl text-red-500 hover:text-red-700"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}

            <div className="mt-4 border-t pt-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="mb-1 block text-gray-700">Type*</label>
                  <select
                    value={form.newProductServiceType}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        newProductServiceType: e.target.value,
                      }))
                    }
                    className="w-full rounded border p-2"
                  >
                    <option value="product">Product</option>
                    <option value="service">Service</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-gray-700">Name* </label>
                  <input
                    value={form.newProductServiceName}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        newProductServiceName: e.target.value,
                      }))
                    }
                    className="w-full rounded border p-2"
                    placeholder="e.g. Travel Insurance, Hotel Booking, Car Rental, Flight Ticket"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => {
                    if (form.newProductServiceName) {
                      setForm((prev) => ({
                        ...prev,
                        productsServices: [
                          ...prev.productsServices,
                          {
                            type: prev.newProductServiceType,
                            name: prev.newProductServiceName,
                          },
                        ],
                        newProductServiceType: 'product',
                        newProductServiceName: '',
                      }))
                    }
                  }}
                  className="rounded bg-[#ff9e39] px-4 py-2 text-white hover:bg-[#ea9030]"
                >
                  Add{' '}
                  {form.newProductServiceType.charAt(0).toUpperCase() +
                    form.newProductServiceType.slice(1)}
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-between gap-4">
            <button
              type="button"
              onClick={prevStep}
              className="w-full rounded bg-gray-500 px-6 py-2 text-white hover:bg-gray-600"
            >
              Back
            </button>
            <button
              type="button"
              onClick={nextStep}
              className="w-full rounded bg-[#ff9e39] px-6 py-2 text-white hover:bg-[#ea9030]"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Step 7: Company Type */}
      {step === 7 && (
        <div>
          <h2 className="mb-6 text-xl font-semibold">Company Type</h2>
          <div className="space-y-3">
            {[
              'Philippine-based Travel Agency',
              'Philippine-based Tour Operator',
              'Foreign-based Travel Agency',
              'Local Tourist Office/Organization',
              'Foreign NTO/Organization',
              'Theme Park/Entertainment',
              'Cruise Liner / Shipping',
              'Airline',
              'Hotel',
              'Resort',
              'Insurance',
              'Other',
            ].map((type) => (
              <label key={type} className="flex items-center gap-3">
                <input
                  type="radio"
                  name="companyType"
                  value={type}
                  checked={form.companyType === type}
                  onChange={handleChange}
                  className="h-4 w-4 text-[#ff9e39]"
                  required
                />
                <span className="text-gray-700">{type}</span>
              </label>
            ))}
          </div>

          {/* Other Company Type Input */}
          {form.companyType === 'Other' && (
            <div className="mt-4">
              <input
                name="companyTypeOther"
                placeholder="Please specify company type"
                value={form.companyTypeOther}
                onChange={handleChange}
                className="w-full rounded border p-2"
                required
              />
            </div>
          )}

          {/* Data Privacy Clause */}
          <div className="mt-6 flex items-start gap-3">
            <input
              type="checkbox"
              id="agreePrivacy"
              className="h-5 w-5"
              required
            />
            <label htmlFor="agreePrivacy" className="text-sm text-gray-700">
              I confirm that I have read and agree to the{' '}
              <a
                href="/privacy-policy"
                target="_blank"
                className="text-[#ff9e39] hover:underline"
              >
                Data Privacy Policy
              </a>
            </label>
          </div>

          {/* Submit and Back Buttons */}
          <div className="mt-8 flex justify-between gap-4">
            <button
              type="button"
              onClick={prevStep}
              className="w-full rounded bg-gray-500 px-6 py-2 text-white hover:bg-gray-600"
            >
              Back
            </button>
            <button
              type="submit"
              className="w-full rounded bg-[#ff9e39] px-6 py-2 text-white hover:bg-[#ea9030] disabled:bg-gray-400"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </div>
      )}
      <div className="mt-6 text-center text-sm text-gray-600">
        Already have an account?{' '}
        <button
          type="button"
          onClick={() => router.push('/auth/sign-in')}
          className="text-[#ff9e39] hover:underline"
        >
          Sign in
        </button>
      </div>
    </form>
  )
}

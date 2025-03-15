'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import jumpseatIcon from '@/images/logos/jumpseat-icon.png'

interface StepProps {
  onNext: (data: any) => void
  onPrev: () => void
  formData?: any
}

export default function MyDetails({ onNext, onPrev, formData }: StepProps) {
  const [personalInfo, setPersonalInfo] = useState({
    firstName: '',
    lastName: '',
    age: '',
    occupation: '',
    email: formData?.email || '',
    phone: ''
  })

  const [tripDetails, setTripDetails] = useState({
    arrivalDate: '',
    lengthOfTrip: '',
    numAdults: '1',
    numChildren: '0',
    noChildren: false,
    travellingFrom: '',
    additionalInfo: ''
  })

  const [errors, setErrors] = useState<string[]>([])

  useEffect(() => {
    // Pre-fill email if available from previous steps
    if (formData?.email) {
      setPersonalInfo(prev => ({
        ...prev,
        email: formData.email
      }))
    }
    
    // Pre-fill name if available
    if (formData?.name) {
      const nameParts = formData.name.split(' ')
      if (nameParts.length > 1) {
        setPersonalInfo(prev => ({
          ...prev,
          firstName: nameParts[0],
          lastName: nameParts.slice(1).join(' ')
        }))
      } else {
        setPersonalInfo(prev => ({
          ...prev,
          firstName: formData.name
        }))
      }
    }
  }, [formData])

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPersonalInfo(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleTripDetailsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined
    
    if (type === 'checkbox' && checked !== undefined) {
      setTripDetails(prev => ({
        ...prev,
        [name]: checked,
        ...(name === 'noChildren' && checked ? { numChildren: '0' } : {})
      }))
    } else {
      setTripDetails(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const validateForm = () => {
    const newErrors = []
    
    // Required fields validation
    if (!personalInfo.firstName) newErrors.push('First name is required')
    if (!personalInfo.lastName) newErrors.push('Last name is required')
    if (!personalInfo.email) newErrors.push('Email is required')
    if (!personalInfo.phone) newErrors.push('Phone number is required')
    if (!tripDetails.arrivalDate) newErrors.push('Arrival date is required')
    if (!tripDetails.lengthOfTrip) newErrors.push('Length of trip is required')
    if (!tripDetails.numAdults) newErrors.push('Number of adults is required')
    if (!tripDetails.travellingFrom) newErrors.push('Travelling from is required')
    
    setErrors(newErrors)
    return newErrors.length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (validateForm()) {
      onNext({
        personalInfo,
        tripDetails
      })
    }
  }

  const greetingName = personalInfo.firstName || ''

  return (
    <div className="w-full max-w-4xl rounded-lg bg-white p-8">
      <h2 className="mb-6 text-3xl font-bold text-gray-900">My Details</h2>
      
      <div className="mb-8">
        <div className="flex items-center gap-4">
          <Image
            src={jumpseatIcon}
            alt="Avatar"
            className="h-12 w-12 rounded-full border border-gray-500 p-1"
          />
          <div>
            <p className="text-black">
              Yes! Almost there.
            </p>
            <p className="text-black">
              To continue, we need this few more details.
            </p>
          </div>
        </div>
      </div>

      {errors.length > 0 && (
      <div className="mb-6 rounded-md bg-red-100 p-4">
        <p className="font-medium text-red-800">Please correct the following errors:</p>
        <ul className="mt-2 list-inside list-disc text-sm text-red-700">
          {errors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      </div>
    )}

      <form onSubmit={handleSubmit}>
        <div className="mb-8">
          <h3 className="mb-4 text-xl font-semibold text-gray-800">Personal Info</h3>
          
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="firstName" className="mb-1 block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={personalInfo.firstName}
                onChange={handlePersonalInfoChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#ff9e39] focus:outline-none"
              />
            </div>
            
            <div>
              <label htmlFor="lastName" className="mb-1 block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={personalInfo.lastName}
                onChange={handlePersonalInfoChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#ff9e39] focus:outline-none"
              />
            </div>
            
            <div>
              <label htmlFor="age" className="mb-1 block text-sm font-medium text-gray-700">
                Age
              </label>
              <input
                type="number"
                id="age"
                name="age"
                value={personalInfo.age}
                onChange={handlePersonalInfoChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#ff9e39] focus:outline-none"
              />
            </div>
            
            <div>
              <label htmlFor="occupation" className="mb-1 block text-sm font-medium text-gray-700">
                Occupation
              </label>
              <input
                type="text"
                id="occupation"
                name="occupation"
                value={personalInfo.occupation}
                onChange={handlePersonalInfoChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#ff9e39] focus:outline-none"
              />
            </div>
          </div>
          
          <div className="mt-4">
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={personalInfo.email}
              onChange={handlePersonalInfoChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#ff9e39] focus:outline-none"
            />
          </div>
          
          <div className="mt-4">
            <label htmlFor="phone" className="mb-1 block text-sm font-medium text-gray-700">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={personalInfo.phone}
              onChange={handlePersonalInfoChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#ff9e39] focus:outline-none"
            />
          </div>
        </div>
        
        <div className="mb-8">
          <h3 className="mb-4 text-xl font-semibold text-gray-800">Trip Details</h3>
          
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="arrivalDate" className="mb-1 block text-sm font-medium text-gray-700">
                Arrival Date
              </label>
              <input
                type="date"
                id="arrivalDate"
                name="arrivalDate"
                value={tripDetails.arrivalDate}
                onChange={handleTripDetailsChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#ff9e39] focus:outline-none"
              />
            </div>
            
            <div>
              <label htmlFor="lengthOfTrip" className="mb-1 block text-sm font-medium text-gray-700">
                Length of Trip
              </label>
              <input
                type="text"
                id="lengthOfTrip"
                name="lengthOfTrip"
                placeholder="e.g. 7 days"
                value={tripDetails.lengthOfTrip}
                onChange={handleTripDetailsChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#ff9e39] focus:outline-none"
              />
            </div>
          </div>
          
          <div className="mt-4">
            <label htmlFor="numAdults" className="mb-1 block text-sm font-medium text-gray-700">
              Number of Adults
            </label>
            <input
              type="number"
              id="numAdults"
              name="numAdults"
              min="1"
              value={tripDetails.numAdults}
              onChange={handleTripDetailsChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#ff9e39] focus:outline-none"
            />
          </div>
          
          <div className="mt-4">
            <label htmlFor="numChildren" className="mb-1 block text-sm font-medium text-gray-700">
              Number of Children
            </label>
            <input
              type="number"
              id="numChildren"
              name="numChildren"
              min="0"
              value={tripDetails.numChildren}
              onChange={handleTripDetailsChange}
              disabled={tripDetails.noChildren}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#ff9e39] focus:outline-none disabled:bg-gray-100"
            />
            <div className="mt-2 flex items-center">
              <input
                type="checkbox"
                id="noChildren"
                name="noChildren"
                checked={tripDetails.noChildren}
                onChange={handleTripDetailsChange}
                className="h-4 w-4 rounded border-gray-300 text-[#ff9e39] focus:ring-[#ff9e39]"
              />
              <label htmlFor="noChildren" className="ml-2 text-sm text-gray-700">
                No-Children
              </label>
            </div>
          </div>
          
          <div className="mt-4">
            <label htmlFor="travellingFrom" className="mb-1 block text-sm font-medium text-gray-700">
              Travelling from
            </label>
            <input
              type="text"
              id="travellingFrom"
              name="travellingFrom"
              value={tripDetails.travellingFrom}
              onChange={handleTripDetailsChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#ff9e39] focus:outline-none"
            />
          </div>
          
          <div className="mt-4">
            <label htmlFor="additionalInfo" className="mb-1 block text-sm font-medium text-gray-700">
              Is there anything else we should know about you?
            </label>
            <input
              type="text"
              id="additionalInfo"
              name="additionalInfo"
              value={tripDetails.additionalInfo}
              onChange={handleTripDetailsChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#ff9e39] focus:outline-none"
            />
          </div>
        </div>
        
        <div className="mt-6 text-sm text-gray-600">
          By clicking the button below, you agree that Jumpseat will contact you via email in
          regards to this inquiry.
        </div>
        
        <div className="mt-8 flex justify-between">
          <button 
            type="button"
            onClick={onPrev}
            className="rounded bg-gray-200 px-8 py-2 text-gray-700 hover:bg-gray-300"
          >
            Back
          </button>
          <button
            type="submit"
            className="rounded bg-[#ff9e39] px-8 py-2 text-white hover:bg-[#ff9e39]/90"
          >
            Let's Go!
          </button>
        </div>
      </form>
    </div>
  )
}
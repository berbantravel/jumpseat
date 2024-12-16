// components/InquiryModal.tsx
'use client'
import React, { useState, Fragment } from 'react'
import { Dialog, DialogPanel, DialogTitle, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { UserIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'
import travelIcon from '@/images/travel-icon.png'

interface InquiryModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function InquiryModal({ isOpen, onClose }: InquiryModalProps) {
  const [formData, setFormData] = useState({
    destination: '',
    firstName: '',
    lastName: '',
    age: '',
    occupation: '',
    email: '',
    phone: '',
    arrivalDate: '',
    lengthOfTrip: '',
    numberOfAdults: '',
    numberOfChildren: '',
    noChildren: false,
    travellingFrom: '',
    additionalInfo: '',
  })
  const [showThankYou, setShowThankYou] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Add your form submission logic here
    console.log('Form submitted:', formData)
    setShowThankYou(true)
  }

  const handleContinue = () => {
    setShowThankYou(false)
    setFormData({
      destination: '',
      firstName: '',
      lastName: '',
      age: '',
      occupation: '',
      email: '',
      phone: '',
      arrivalDate: '',
      lengthOfTrip: '',
      numberOfAdults: '',
      numberOfChildren: '',
      noChildren: false,
      travellingFrom: '',
      additionalInfo: '',
    })
    onClose()
  }

  return (
    <>
      <Transition appear show={isOpen && !showThankYou} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-30" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="relative w-full max-w-5xl transform overflow-hidden rounded-lg bg-white p-20 text-left shadow-xl transition-all">
                  <button
                    onClick={onClose}
                    className="absolute right-4 top-4 rounded-full p-1 hover:bg-gray-100"
                  >
                    <XMarkIcon className="h-6 w-6 text-gray-500" />
                  </button>

                  {/* Jim's Message */}
                  <div className="mb-8 flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <UserIcon className="h-12 w-12 rounded-full bg-gray-100 p-2 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Hello I'm Jim!
                      </h3>
                      <p className="mt-2 text-sm text-gray-600">
                        With our well-travel partners, enjoy the benefits of our
                        exquisite travel places such as Bohol, Boracay, Coron
                        and a lot more. We're always ready to offer you the best
                        reasonable yet unbeatable rates. We handle every single
                        detail of your travel itinerary so you can enjoy your
                        vacation to the fullest.
                      </p>
                      <p className="mt-2 text-sm italic text-gray-600">
                        Don't take chances, set your next adventure with us
                        now...
                      </p>
                    </div>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">
                        Personal Info
                      </h2>
                      <div className="mt-4 space-y-4">
                        <div>
                          <label
                            htmlFor="destination"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Preferred Destination
                          </label>
                          <input
                            type="text"
                            id="destination"
                            name="destination"
                            value={formData.destination}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#ff9e39] focus:outline-none focus:ring-1 focus:ring-[#ff9e39]"
                            required
                          />
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <div>
                            <label
                              htmlFor="firstName"
                              className="block text-sm font-medium text-gray-700"
                            >
                              First Name
                            </label>
                            <input
                              type="text"
                              id="firstName"
                              name="firstName"
                              value={formData.firstName}
                              onChange={handleChange}
                              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#ff9e39] focus:outline-none focus:ring-1 focus:ring-[#ff9e39]"
                              required
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="lastName"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Last Name
                            </label>
                            <input
                              type="text"
                              id="lastName"
                              name="lastName"
                              value={formData.lastName}
                              onChange={handleChange}
                              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#ff9e39] focus:outline-none focus:ring-1 focus:ring-[#ff9e39]"
                              required
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <div>
                            <label
                              htmlFor="age"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Age
                            </label>
                            <input
                              type="number"
                              id="age"
                              name="age"
                              value={formData.age}
                              onChange={handleChange}
                              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#ff9e39] focus:outline-none focus:ring-1 focus:ring-[#ff9e39]"
                              required
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="occupation"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Occupation
                            </label>
                            <input
                              type="text"
                              id="occupation"
                              name="occupation"
                              value={formData.occupation}
                              onChange={handleChange}
                              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#ff9e39] focus:outline-none focus:ring-1 focus:ring-[#ff9e39]"
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Email
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#ff9e39] focus:outline-none focus:ring-1 focus:ring-[#ff9e39]"
                            required
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="phone"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Phone
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#ff9e39] focus:outline-none focus:ring-1 focus:ring-[#ff9e39]"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    {/* Trip Details Section */}
                    <div className="mt-8">
                      <h2 className="text-xl font-semibold text-gray-900">
                        Trip Details
                      </h2>
                      <div className="mt-4 space-y-4">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <div>
                            <label
                              htmlFor="arrivalDate"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Arrival Date
                            </label>
                            <input
                              type="date"
                              id="arrivalDate"
                              name="arrivalDate"
                              value={formData.arrivalDate}
                              onChange={handleChange}
                              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#ff9e39] focus:outline-none focus:ring-1 focus:ring-[#ff9e39]"
                              required
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="lengthOfTrip"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Length of Trip
                            </label>
                            <input
                              type="text"
                              id="lengthOfTrip"
                              name="lengthOfTrip"
                              value={formData.lengthOfTrip}
                              onChange={handleChange}
                              placeholder="e.g., 5 days"
                              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#ff9e39] focus:outline-none focus:ring-1 focus:ring-[#ff9e39]"
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <label
                            htmlFor="numberOfAdults"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Number of Adults
                          </label>
                          <input
                            type="number"
                            id="numberOfAdults"
                            name="numberOfAdults"
                            value={formData.numberOfAdults}
                            onChange={handleChange}
                            min="1"
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#ff9e39] focus:outline-none focus:ring-1 focus:ring-[#ff9e39]"
                            required
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="numberOfChildren"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Number of Children
                          </label>
                          <input
                            type="number"
                            id="numberOfChildren"
                            name="numberOfChildren"
                            value={formData.numberOfChildren}
                            onChange={handleChange}
                            min="0"
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#ff9e39] focus:outline-none focus:ring-1 focus:ring-[#ff9e39]"
                            disabled={formData.noChildren}
                          />
                          <div className="mt-2">
                            <label className="inline-flex items-center">
                              <input
                                type="checkbox"
                                name="noChildren"
                                checked={formData.noChildren}
                                onChange={(e) => {
                                  setFormData((prev) => ({
                                    ...prev,
                                    noChildren: e.target.checked,
                                    numberOfChildren: e.target.checked
                                      ? ''
                                      : prev.numberOfChildren,
                                  }))
                                }}
                                className="rounded border-gray-300 text-[#ff9e39] focus:ring-[#ff9e39]"
                              />
                              <span className="ml-2 text-sm text-gray-600">
                                No-Children
                              </span>
                            </label>
                          </div>
                        </div>

                        <div>
                          <label
                            htmlFor="travellingFrom"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Travelling from
                          </label>
                          <input
                            type="text"
                            id="travellingFrom"
                            name="travellingFrom"
                            value={formData.travellingFrom}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#ff9e39] focus:outline-none focus:ring-1 focus:ring-[#ff9e39]"
                            required
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="additionalInfo"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Is there anything else we should know about you?
                          </label>
                          <textarea
                            id="additionalInfo"
                            name="additionalInfo"
                            value={formData.additionalInfo}
                            onChange={handleChange}
                            rows={4}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#ff9e39] focus:outline-none focus:ring-1 focus:ring-[#ff9e39]"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Agreement Text */}
                    <div className="mt-6">
                      <p className="text-sm text-gray-600">
                        By clicking the button below, you agree that BerBan will
                        contact you via email in regards to this inquiry.
                      </p>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="mt-6 w-full rounded-md bg-[#ff9e39] px-6 py-3 text-base font-semibold text-white hover:bg-[#ff9e39]/90 focus:outline-none focus:ring-2 focus:ring-[#ff9e39] focus:ring-offset-2"
                    >
                      Let's Go!
                    </button>
                  </form>
                </DialogPanel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      {/* Thank You Dialog */}
      <Transition appear show={showThankYou} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={handleContinue}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-30" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="relative w-full max-w-4xl transform overflow-hidden rounded-lg bg-white p-8 text-center shadow-xl transition-all">
                  {/* Travel Icon Circle */}
                  <div className="mx-auto mb-6 flex h-52 w-52 items-center justify-center rounded-full">
                    <Image
                      src={travelIcon}
                      alt="Travel Icon"
                      quality={100}
                      priority
                      className="h-full w-full object-contain"
                    />
                  </div>

                  <DialogTitle
                    as="h3"
                    className="text-4xl font-bold text-gray-900"
                  >
                    THANK YOU
                  </DialogTitle>

                  <div className="mt-4">
                    <p className="text-lg text-gray-600">
                      An email will be sent shortly!
                    </p>
                  </div>

                  <div className="mt-8">
                    <button
                      type="button"
                      className="w-full rounded-md bg-[#ff9e39] px-6 py-3 text-base font-semibold text-white hover:bg-[#ff9e39]/90 focus:outline-none focus:ring-2 focus:ring-[#ff9e39] focus:ring-offset-2"
                      onClick={handleContinue}
                    >
                      Continue
                    </button>
                  </div>
                </DialogPanel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

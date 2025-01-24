import React, { useState } from 'react'
import Image from 'next/image'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { Checkbox } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/16/solid'
import { XMarkIcon } from '@heroicons/react/24/outline'
import jumpseatIcon from '@/images/logos/jumpseat-icon.png'
import modalImage from '@/images/modalImage.jpg'
import travelIcon from '@/images/travel-icon.png'
import { Transition } from '@headlessui/react'
import { Fragment } from 'react'

interface ModalDialogProps {
  isOpen: boolean
  closeModal: () => void
  enabled: boolean
  setEnabled: (value: boolean) => void
}

const ModalDialog: React.FC<ModalDialogProps> = ({
  isOpen,
  closeModal,
  enabled,
  setEnabled,
}) => {
  const [showThankYou, setShowThankYou] = useState(false)
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSignUp = async () => {
    if (!email || !enabled) {
      setError('Please enter your email and accept the terms');
      return;
    }
  
    setIsLoading(true);
    setError('');
  
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
  
      const data = await response.json();
  
      if (data.success) {
        setShowThankYou(true);
      } else {
        setError('Failed to send inquiry. Please try again.');
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleContinue = () => {
    setShowThankYou(false)
    closeModal()
  }


  return (
    <>
      {/* Main Sign Up Dialog */}
      <Dialog open={isOpen && !showThankYou} onClose={closeModal}>
        <div
          className="fixed inset-0 bg-black bg-opacity-30"
          aria-hidden="true"
        />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="relative mx-auto grid max-w-5xl grid-cols-1 gap-4 rounded bg-white md:grid-cols-2">
            <button
              onClick={closeModal}
              className="absolute -right-3 -top-3 rounded-full bg-white p-1.5 shadow-md hover:bg-gray-100"
            >
              <XMarkIcon className="h-5 w-5 text-gray-500" />
            </button>

            <div className="flex flex-col p-8">
              <div className="mb-8">
                <Image
                  src={jumpseatIcon}
                  alt="Jumpseat Logo"
                  width={50}
                  height={50}
                />
              </div>

              <div className="flex flex-1 flex-col items-center justify-center space-y-6">
                <DialogTitle className="text-4xl font-medium text-[#ff9e39] sm:text-5xl">
                  Experience Asia
                </DialogTitle>
                <p className="text-center">
                  Get to know more about our latest travel deals and promos
                  freshly delivered directly to your email.
                </p>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded border border-gray-300 p-2"
                />
                {error && (
                  <p className="text-sm text-red-500">{error}</p>
                )}
                <button
                  onClick={handleSignUp}
                  disabled={isLoading}
                  className="w-full rounded-md bg-[#ff9e39] px-4 py-2 text-sm font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'SIGNING UP...' : 'SIGN UP'}
                </button>
                <div className="flex items-center">
                  <Checkbox
                    checked={enabled}
                    onChange={(e) => setEnabled(e)}
                    className="group h-5 w-5 rounded-sm border border-slate-500 bg-white/10 p-1 ring-1 ring-inset ring-white/15 data-[checked]:bg-white"
                  >
                    <CheckIcon className="hidden size-3 fill-black group-data-[checked]:block" />
                  </Checkbox>
                  <span className="ml-2 text-xs text-gray-700">
                    Yes, I want to experience Asia and know the latest updates,
                    travel deals, and promos.
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <Image
                src={modalImage}
                alt="Welcome Image"
                className="hidden h-full w-full rounded object-cover md:block"
                width={500}
                height={600}
              />
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      {/* Thank You Dialog */}
      <Transition show={showThankYou} as={Fragment}>
        <Dialog open={showThankYou} onClose={handleContinue}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              className="fixed inset-0 bg-black bg-opacity-30"
              aria-hidden="true"
            />
          </Transition.Child>

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="relative mx-auto w-full max-w-2xl rounded-lg bg-white p-12">
                <div className="flex flex-col items-center text-center">
                  <Image
                    src={travelIcon}
                    alt="Travel Icon"
                    width={180}
                    height={180}
                    className="mb-8"
                    priority
                  />
                  <DialogTitle className="mb-3 text-5xl font-bold text-gray-900">
                    THANK YOU
                  </DialogTitle>
                  <p className="mb-10 text-lg text-gray-600">
                    An email will be sent shortly!
                  </p>
                  <button
                    onClick={handleContinue}
                    className="w-64 rounded-md bg-[#ff9e39] px-6 py-3 text-base font-semibold text-white hover:bg-[#ff9e39]/90"
                  >
                    Continue
                  </button>
                </div>
              </DialogPanel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default ModalDialog

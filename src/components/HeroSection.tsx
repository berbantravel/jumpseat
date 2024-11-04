'use client'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import homebackground from '@/images/homebackground.jpg'
import jumpseatIcon from '@/images/logos/jumpseat-icon.png'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import modalImage from '@/images/modalImage.jpg'
import { Checkbox } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/16/solid'

function classNames(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

const HeroSection = () => {
  
  const [isOpen, setIsOpen] = useState(false)
  const [enabled, setEnabled] = useState(true)

  // Open the modal when the component mounts
  useEffect(() => {
    setIsOpen(true)
  }, [])

  const closeModal = () => {
    setIsOpen(false)
  }
  return (
    <>
        {/* Modal */}
      <Dialog open={isOpen} onClose={closeModal}>
        <div className="fixed inset-0 bg-black bg-opacity-30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="mx-auto max-w-4xl rounded bg-white grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col p-8 gap-2">
              {/* Logo */}
              <div className="flex items-center mb-4">
                <Image
                  src={jumpseatIcon}
                  alt="Jumpseat Logo"
                  width={50} 
                  height={50} 
                />
              </div>
              <DialogTitle className="text-5xl font-medium text-[#ff9e39]">Experience Asia</DialogTitle>
              <div className="mt-2">
                <p>Get to know more about our latest travel deals and promos freshly delivered directly to your email.</p>
              </div>
              <input  
                type="email"
                placeholder="Enter your email"
                className="mt-4 p-2 border-gray-300 rounded"
              />
              <button
                onClick={() => {
                
                  alert("Email submitted!");
                }}
                className="mt-2 rounded-md bg-[#ff9e39] px-4 py-2 text-sm font-semibold text-white"
              >
                SIGN UP
              </button>
              <div className="flex items-center mt-4">
  <Checkbox
    checked={enabled}
    onChange={(e) => setEnabled(e)}
    className="border border-slate-500 group rounded-sm bg-white/10 p-1 ring-1 ring-white/15 ring-inset data-[checked]:bg-white w-5 h-5" // Set fixed width and height
  >
    <CheckIcon className="hidden size-3 fill-black group-data-[checked]:block" />
  </Checkbox>
  <span className="ml-2 text-xs text-gray-700">Yes, I want to experience Asia and know the latest updates, travel deals, and promos.</span>
</div>
            </div>

            {/* Right Column: Image */}
            <div className="flex items-center justify-center">
              <Image
                src={modalImage} 
                alt="Welcome Image"
                className="w-full h-full object-cover rounded" 
                layout="responsive"
                width={200} 
                height={200} 
              />
            </div>
          </DialogPanel>
        </div>
      </Dialog>

    
      <div className="relative isolate -mt-16 overflow-hidden py-28">
        <Image
          src={homebackground}
          alt=""
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
        <div className="max-w-8xl mx-auto py-32 sm:py-48 lg:py-56">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center"></div>
          <div className="text-center">
            <h1 className="font-poppinsSemiBold text-4xl tracking-tight text-white sm:text-7xl">
              OUR FAVOURITE EXPERIENCES
            </h1>
            <p className="bodySemiBold mt-6 text-lg leading-8 text-white">
              Wander to see Asia&apos;s Sanctuary
            </p>
            <p className="bodyRegular mt-0  text-lg text-white">
              Are you ready to experience Asia? Learn more about our exclusive
              tours and curated experiences.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="/experiences"
                className="rounded-md bg-[#ff9e39] px-32 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#ff9e39] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
              >
                Experience Asia
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default HeroSection

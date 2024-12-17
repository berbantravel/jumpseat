'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import homebackground from '@/images/homebackground.jpg'
import ModalDialog from './ModalDialog'

const HeroSection = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [enabled, setEnabled] = useState(true)

  useEffect(() => {
    setIsOpen(true)
  }, [])

  const closeModal = () => {
    setIsOpen(false)
  }

  return (
    <>
      <ModalDialog
        isOpen={isOpen}
        closeModal={closeModal}
        enabled={enabled}
        setEnabled={setEnabled}
      />

      <div className="relative isolate -mt-16 overflow-hidden py-28 ">
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
          <div className="flex flex-col items-center px-12 py-16 text-center sm:px-24 sm:py-20 lg:px-28 lg:py-28 ">
            <h1 className="w-full font-poppinsSemiBold text-4xl tracking-tight text-white sm:text-7xl">
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
                className="rounded-md bg-[#ff9e39] px-16 py-4 text-sm font-semibold text-white shadow-sm hover:bg-[#ff9e39] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400 sm:px-32"
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

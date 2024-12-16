'use client'
import React from 'react'
import {
  EnvelopeIcon,
  PhoneIcon,
  ClockIcon,
  ChatBubbleLeftRightIcon,
} from '@heroicons/react/24/solid'
import whatsapp from '@/images/logos/whatsapp.png'
import viber from '@/images/logos/viber.png'
import Image from 'next/image'

export default function FirstSection() {
  return (
    <div className="relative isolate mx-auto -mt-40 max-w-7xl px-6">
      <div className="rounded-lg bg-white p-8 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] sm:px-12 sm:py-16">
        {/* Header */}
        <div className="justify-items-center rounded-lg bg-[#F9F9F9] p-12 text-center">
          <h2 className="h2-shadow text text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            GET IN TOUCH
          </h2>
          <p className="mt-4 w-full text-lg leading-6 text-gray-600 md:w-2/3">
            Ready to start planning your next trip? Or perhaps you have a more
            general question? Call us, email us or use our online form below...
          </p>

          {/* Grid Layout */}
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2">
            {/* Call Us */}
            <div className="flex flex-col items-center text-center">
              <div className="flex w-full flex-col !items-center justify-center gap-0 md:flex-row md:gap-4">
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#e02b20] md:mb-4">
                  <PhoneIcon className="h-5 w-5 text-[#e02b20]" />
                </div>
                <h3 className="mb-3 text-2xl font-bold text-gray-900">
                  Call Us
                </h3>
              </div>

              <p className="text-gray-600">
                <a
                  href="tel:+63995015886"
                  className="flex items-center justify-center gap-2"
                >
                  <Image
                    src={whatsapp}
                    alt="WhatsApp"
                    className="h-4 w-4 object-contain"
                  />
                  +63.995.015.8869
                </a>
              </p>
              <p className="text-gray-600">
                <a
                  href="tel:+63918746684"
                  className="flex items-center justify-center gap-2"
                >
                  <Image
                    src={viber}
                    alt="Viber"
                    className="h-4 w-4 object-contain"
                  />
                  +63.918.746.6894
                </a>
              </p>
            </div>

            {/* Email Us */}
            <div className="flex flex-col items-center text-center">
              <div className="flex w-full flex-col !items-center justify-center gap-0 md:flex-row md:gap-4">
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#e02b20] md:mb-4">
                  <EnvelopeIcon className="h-5 w-5 text-[#e02b20]" />
                </div>
                <h3 className="mb-3 text-2xl font-bold text-gray-900">
                  Email Us
                </h3>
              </div>
              <div className="flex flex-col">
                <p className=" text-gray-600">
                  Send us your travel request or questions via
                </p>
                <a
                  href="mailto:mabuhay@herbantravel.com"
                  className=" text-red-500 hover:underline "
                >
                  mabuhay@herbantravel.com
                </a>
              </div>
            </div>

            {/* Open Hours */}
            <div className="flex flex-col items-center text-center">
              <div className="flex w-full flex-col !items-center justify-center gap-0 md:flex-row md:gap-4">
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#e02b20] md:mb-4">
                  <ClockIcon className="h-5 w-5 text-[#e02b20]" />
                </div>
                <h3 className="mb-3 text-2xl font-bold text-gray-900">
                  Open Hours
                </h3>
              </div>

              <p className="text-gray-600">Philippines</p>
              <p className="text-gray-600">Monday – Friday</p>
              <p className="text-gray-600">8am to 5pm PHST</p>
            </div>

            {/* Online Inquiry */}
            <div className="flex flex-col items-center text-center">
              <div className="flex w-full flex-col !items-center justify-center gap-0 md:flex-row md:gap-4">
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#e02b20] md:mb-4">
                  <ChatBubbleLeftRightIcon className="h-5 w-5 text-[#e02b20]" />
                </div>
                <h3 className="mb-3 text-2xl font-bold text-gray-900">
                  Online Inquiry
                </h3>
              </div>

              <p className="mb-4 w-full text-gray-600 lg:w-[400px]">
                Tell us a few details about your travel plans and we&apos;ll
                create the perfect experience for you.
              </p>
              <button className="rounded-md bg-[#ff9e39] px-6 py-2 text-sm font-semibold text-white hover:bg-[#ff9e39]/90">
                Talk to us
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

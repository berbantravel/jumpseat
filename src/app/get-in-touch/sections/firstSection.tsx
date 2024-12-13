'use client'
import React from 'react'
import {
  EnvelopeIcon,
  PhoneIcon,
  ClockIcon,
  ChatBubbleLeftRightIcon,
} from '@heroicons/react/24/outline'

export default function FirstSection() {
  return (
    <div className="relative isolate mx-auto -mt-40 max-w-7xl px-6">
      <div className="rounded-lg bg-white px-8 py-16 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] sm:px-12 sm:py-20">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            GET IN TOUCH
          </h2>
          <p className="mt-4 text-lg leading-6 text-gray-600">
            Ready to start planning your next trip? Or perhaps you have a more
            general question? Call us, email us or use our online form below.
          </p>
        </div>

        {/* Grid Layout */}
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Call Us */}
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 rounded-full bg-red-100 p-3">
              <PhoneIcon className="h-6 w-6 text-red-500" />
            </div>
            <h3 className="mb-3 text-xl font-semibold text-gray-900">
              Call Us
            </h3>
            <p className="text-gray-600">
              <a
                href="tel:+63995015886"
                className="flex items-center justify-center gap-2"
              >
                <span className="text-green-600">☎</span> +63.995.015.8869
              </a>
            </p>
            <p className="text-gray-600">
              <a
                href="tel:+63918746684"
                className="flex items-center justify-center gap-2"
              >
                <span className="text-purple-600">☎</span> +63.918.746.6894
              </a>
            </p>
          </div>

          {/* Email Us */}
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 rounded-full bg-red-100 p-3">
              <EnvelopeIcon className="h-6 w-6 text-red-500" />
            </div>
            <h3 className="mb-3 text-xl font-semibold text-gray-900">
              Email Us
            </h3>
            <p className="text-gray-600">
              Send us your travel request or questions via
              <a
                href="mailto:mabuhay@herbantravel.com"
                className="ml-1 text-red-500 hover:underline"
              >
                mabuhay@herbantravel.com
              </a>
            </p>
          </div>

          {/* Open Hours */}
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 rounded-full bg-red-100 p-3">
              <ClockIcon className="h-6 w-6 text-red-500" />
            </div>
            <h3 className="mb-3 text-xl font-semibold text-gray-900">
              Open Hours
            </h3>
            <p className="font-medium text-gray-900">Philippines</p>
            <p className="text-gray-600">Monday – Friday</p>
            <p className="text-gray-600">8am to 5pm PHST</p>
          </div>

          {/* Online Inquiry */}
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 rounded-full bg-red-100 p-3">
              <ChatBubbleLeftRightIcon className="h-6 w-6 text-red-500" />
            </div>
            <h3 className="mb-3 text-xl font-semibold text-gray-900">
              Online Inquiry
            </h3>
            <p className="mb-4 text-gray-600">
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
  )
}

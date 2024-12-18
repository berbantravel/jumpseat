'use client'
import Image from 'next/image'
import React from 'react'
import taepei from '@/images/taepei.jpg'

export default function FirstSection() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 bg-[#fcfcfcfc] px-12 py-16 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] sm:px-24 sm:py-20 lg:flex-row lg:gap-16 lg:px-28 lg:py-28">
      {/* Left Column - Text and Button */}
      <div className="text-left lg:w-1/2">
        <h2 className="mb-6 text-3xl font-medium tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
          We&apos;ll take you to Asia&apos;s Finest Destinations
        </h2>
        <div className="mb-6 h-[2px] w-56 bg-gray-300"></div>
        <h3 className="mb-6 text-xl font-semibold text-gray-900">What we do</h3>
        <p className="mb-6 text-lg leading-relaxed text-black">
          We aim to develop sustainable tourism in the South East and East Asian
          Region, both for travelers and partners. We want to bring worthwhile
          adventures. We are here to assist you in finding unique travel holiday
          experiences in the region.
        </p>
        <p className="mb-6 text-lg leading-relaxed text-black">
          We are eager to introduce you to Asia&apos;s wonderful travel
          destinations. Lead you to discover our rich culture, mouth-watering
          dishes, and adventure-filled mountain trails in different islands.
        </p>

        <p className="mb-6 text-lg leading-relaxed text-black">
          Just like you, we also love going places. We enjoy exploring where we
          get to have real and unique encounters with nature and different
          people. We prefer things off-season and beyond the beaten track. We
          appreciate being pampered rather than treated like a simple traveler.
          We dare to test our limits with all sorts of activities – whether
          it&apos;s food and drink, a long walk, or a retreat, we&apos;re always
          ready for it.
        </p>

        <div className="mt-8">
          <p className="mb-0 text-lg text-black">Come and Travel with us!</p>
          <p className="mb-6 text-lg text-black">Meet Asia!</p>
          <button className="rounded-md bg-[#ff9e39] px-12 py-2.5 text-base font-medium text-white transition-colors duration-300 hover:bg-[#ff9e39]/90 sm:px-16">
            Let&apos;s Go!
          </button>
        </div>
      </div>

      {/* Right Column - Image */}
      <div className="mt-8 flex justify-center lg:mt-0 lg:w-1/2">
        <div className="group relative w-full max-w-md transition-transform duration-300">
          {/* Background gray shape */}
          <div className="absolute inset-0 -translate-y-3 translate-x-3 rounded-lg bg-gray-200"></div>

          {/* Image container */}
          <div className="relative z-10 overflow-hidden rounded-lg shadow-xl">
            <Image
              src={taepei}
              alt="Asia's Finest Destinations"
              width={500}
              height={300}
              className="w-full object-cover transition-transform duration-300"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

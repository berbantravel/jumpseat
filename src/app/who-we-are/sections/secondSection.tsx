'use client'
import Image from 'next/image'
import React from 'react'
import berbanlogo from '@/images/berbanlogo.png'

export default function secondSection() {
  return (
    <div className="mx-auto flex max-w-7xl bg-white py-16 shadow-[rgba(17,_17,_26,_0.05)_0px_0px_16px] sm:py-20 lg:py-28">
      <div className="hidden sm:mb-8 sm:flex sm:justify-center"></div>
      <div className="mx-10 flex flex-col items-center justify-center self-center text-center">
        <h2 className="mb-6 text-3xl font-medium tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
          Curious about us?
        </h2>
        <div className="h-[2px] w-56 bg-gray-300"></div>
        <div className="mb-4 flex flex-row flex-wrap justify-center sm:mb-0 sm:h-16 sm:flex-nowrap lg:h-20">
          <h5 className="bodyRegular mt-4 content-center text-lg font-bold text-black sm:mb-0 sm:mt-0">
            We are the travel enthusiast behind.
          </h5>
          <div>
            <Image
              src={berbanlogo}
              alt="Berban Logo"
              className="h-12 w-full sm:h-12 md:h-14 lg:h-16"
              width={100}
              height={100}
            />
          </div>
        </div>
        <p className="bodyRegular mt-0 w-4/6 text-lg text-black">
          Let&apos;s find ourselves on the same page, if you&apos;re not sure
          where will be your next adventure, throw the dice and take a break!
          Our website is full of insight and inspiration, carefully curated to
          suit you. So is your bespoke itinerary.
        </p>
        <p className="bodyRegular mb-4 mt-4 text-lg text-black">
          We&apos;ll arrange everything for you.
        </p>
      </div>
      <div className="hidden sm:mb-8 sm:flex sm:justify-center"></div>
    </div>
  )
}

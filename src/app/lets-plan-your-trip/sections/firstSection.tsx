'use client'
import Image from 'next/image'
import React from 'react'
import taepei from '@/images/taepei.jpg'

export default function FirstSection() {
  const steps = [
    {
      number: 1,
      title: 'Get inspired & inquire',
      description:
        "Complete our dream-trip questionnaire by clicking 'Let's Plan Your Trip!' – you'll find inspiration and give us the chance to get to know you.",
    },
    {
      number: 2,
      title: 'Give us a day',
      description:
        "Give us 24 hours, and our J team will recommend an experience we think you'll love. All our trips can be tailored just for you!",
    },
    {
      number: 3,
      title: 'We book and personalize a bit',
      description:
        "Once the trip is personalized and approved, we'll manage all the logistics and details of your transport, reservations, accommodations and activities.",
    },
    {
      number: 4,
      title: 'You receive your digital itinerary',
      description:
        "Our team will then create a travel guide with all essential information in one place. And we'll always be available to chat, online or on the phone, if you need us.",
    },
    {
      number: 5,
      title: 'Pack your bags and meet us in the Philippines',
      description: 'Get yourself ready, and your Asian Experience can begin.',
    },
  ]

  return (
    <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 bg-[#fcfcfcfc] px-12 py-16 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] sm:px-24 sm:py-20 lg:flex-row lg:gap-16 lg:px-28 lg:py-28">
      {/* Left Column - Text and Button */}
      <div className="text-center lg:w-full">
        <h2 className="mb-10 text-3xl font-medium tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
          How it works in 5 simple steps
        </h2>
        {/* Steps List */}
        <div className="max-w-4xl space-y-8 justify-self-center">
          {steps.map((step) => (
            <div
              key={step.number}
              className="flex w-fit items-center gap-8 text-left"
            >
              <div className="flex h-8 w-8 min-w-[2rem] items-center justify-center rounded-full bg-[#565555] text-white">
                {step.number}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#ff9e39]">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

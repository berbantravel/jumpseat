'use client'
import Image from 'next/image'
import React from 'react'
import jumpseatIcon from '@/images/logos/jumpseat-icon.png'

interface Step {
  number: number
  label: string
  isActive?: boolean
  isCompleted?: boolean
}

const steps: Step[] = [
  { number: 1, label: 'Getting Ready', isActive: true, isCompleted: true },
  { number: 2, label: 'My Trip' },
  { number: 3, label: 'Season' },
  { number: 4, label: 'Interest' },
  { number: 5, label: 'Accomodation' },
  { number: 6, label: 'Transport' },
  { number: 7, label: 'My Details' },
  { number: 8, label: "Let's Go" },
]

export default function ProgressTracker() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      {/* Progress Bar */}
      <div className="mb-12">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.number} className="flex flex-col items-center">
              {/* Connector Line */}
              {index !== 0 && (
                <div className="absolute h-[2px] w-[calc(100%/8)] -translate-x-1/2 bg-gray-300" />
              )}
              {/* Circle */}
              <div
                className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 ${
                  step.isCompleted
                    ? 'border-none bg-[#ff9e39] text-white'
                    : step.isActive
                      ? 'border-[#ff9e39] bg-white text-[#ff9e39]'
                      : 'border-gray-300 bg-white text-gray-300'
                }`}
              >
                {step.number}
              </div>
              {/* Label */}
              <span className="mt-2 text-sm text-gray-600">{step.label}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Form Section */}
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-6 text-3xl font-bold text-gray-900">Getting Ready</h1>

        <div className="mb-8">
          <div className="flex items-center gap-4">
            <Image
              src={jumpseatIcon}
              alt="Avatar"
              className="h-12 w-12 rounded-full border border-gray-500 p-1"
            />
            <div>
              <p className="text-black">
                Hi There! I'm Chrisse.{' '}
                <span className="font-semibold text-[#ff9e39]">
                  LET'S PLAN YOUR TRIP!
                </span>
              </p>
            </div>
          </div>

          <p className="mt-4 text-black">
            Jumpseat is your avenue to the get through the most beautiful spots
            in Asia. There are plenty of places to see among the best spots in
            the region. Our travel associates&apos; and specialists&apos;
            expertise are blended towards discerning and adventurous travelers.
            If you are one of them, let&apos;s create a travel plan according to
            your taste.
          </p>

          <p className="mt-4 text-black">
            First of all, may I have your name and e-mail?
          </p>
        </div>

        {/* Form */}
        <form className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Name"
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-[#ff9e39] focus:outline-none"
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-[#ff9e39] focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-md bg-[#ff9e39] py-2 text-white hover:bg-[#ff9e39]/90"
          >
            Let&apos;s Start!
          </button>
        </form>
      </div>
    </div>
  )
}

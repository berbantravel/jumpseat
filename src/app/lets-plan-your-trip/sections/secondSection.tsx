'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import jumpseatIcon from '@/images/logos/jumpseat-icon.png'

interface Step {
  number: number
  label: string
  isActive?: boolean
  isCompleted?: boolean
}

const steps: Step[] = [
  { number: 1, label: 'Getting Ready', isActive: true },
  { number: 2, label: 'My Trip' },
  { number: 3, label: 'Season' },
  { number: 4, label: 'Interest' },
  { number: 5, label: 'Accomodation' },
  { number: 6, label: 'Transport' },
  { number: 7, label: 'My Details' },
  { number: 8, label: "Let's Go" },
]

export default function SecondSection() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({ name: '', email: '' })
  const [showModal, setShowModal] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.name && formData.email) {
      setCurrentStep(2)
      setShowModal(true)
    }
  }

  return (
    <>
      <div className="mx-auto max-w-5xl px-4 py-8">
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex flex-col items-center">
                {/* Connector Line */}

                {/* Circle */}
                <div
                  className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 ${
                    step.number < currentStep
                      ? 'border-none bg-[#ff9e39] text-white'
                      : step.number === currentStep
                        ? 'border-[#ff9e39] bg-white text-[#ff9e39]'
                        : 'border-gray-400 bg-white text-gray-400'
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

        {/* Initial Form Section */}
        {!showModal && (
          <div className="mx-auto max-w-2xl">
            <h1 className="mb-6 text-3xl font-bold text-gray-900">
              Getting Ready
            </h1>

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
                Jumpseat is your avenue to the get through the most beautiful
                spots in Asia. There are plenty of places to see among the best
                spots in the region. Our travel associates&apos; and
                specialists&apos; expertise are blended towards discerning and
                adventurous travelers. If you are one of them, let&apos;s create
                a travel plan according to your taste.
              </p>

              <p className="mt-4 text-black">
                First of all, may I have your name and e-mail?
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-[#ff9e39] focus:outline-none"
                  required
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-[#ff9e39] focus:outline-none"
                  required
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
        )}

        {/* Modal for next steps */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-full max-w-2xl rounded-lg bg-white p-8">
              <h2 className="mb-4 text-2xl font-bold">My Trip</h2>
              {/* Add your next step content here */}
              <button
                onClick={() => setCurrentStep(currentStep + 1)}
                className="mt-4 rounded bg-[#ff9e39] px-4 py-2 text-white"
              >
                Next Step
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

'use client'
import { useState } from 'react'
import Image from 'next/image'
import jumpseatIcon from '@/images/logos/jumpseat-icon.png'

interface StepProps {
  onNext: (data: any) => void
  onPrev: () => void
}

interface InterestOption {
  id: string
  title: string
  imageSrc: string
}

const interestOptions: InterestOption[] = [
  {
    id: 'indulge',
    title: 'To Indulge',
    imageSrc: '/images/interest/indulge.jpg'
  },
  {
    id: 'unwind',
    title: 'To Unwind',
    imageSrc: '/images/interest/unwind.jpg'
  },
  {
    id: 'learn',
    title: 'To Learn',
    imageSrc: '/images/interest/learn.jpg'
  },
  {
    id: 'discover',
    title: 'To Discover',
    imageSrc: '/images/interest/discover.jpg'
  }
]

export default function Interest({ onNext, onPrev }: StepProps) {
  const [selectedInterest, setSelectedInterest] = useState<string>('')

  const handleInterestSelection = (interestId: string) => {
    setSelectedInterest(interestId)
  }

  const handleNext = () => {
    onNext({ selectedInterest })
  }

  return (
    <div className="w-full max-w-4xl rounded-lg bg-white p-8">
      <h2 className="mb-6 text-3xl font-bold text-gray-900">Interest</h2>
      
      <div className="mb-8">
        <div className="flex items-center gap-4">
          <Image
            src={jumpseatIcon}
            alt="Avatar"
            className="h-12 w-12 rounded-full border border-gray-500 p-1"
          />
          <p className="text-black">
            Everyone is looking for something satisfying, what most like you're interested in doing?
          </p>
        </div>
      </div>

      <p className="mb-4 text-sm text-[#ff9e39]">Choose one</p>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {interestOptions.map((interest) => (
          <div
            key={interest.id}
            onClick={() => handleInterestSelection(interest.id)}
            className={`relative cursor-pointer overflow-hidden rounded-lg transition-all duration-300 ${
              selectedInterest === interest.id
                ? 'ring-2 ring-[#ff9e39]'
                : 'hover:ring-2 hover:ring-gray-300'
            }`}
          >
            <div className="relative h-48">
              <Image
                src={interest.imageSrc}
                alt={interest.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <h3 className="text-xl font-semibold text-white">{interest.title}</h3>
              </div>
              {selectedInterest === interest.id && (
                <div className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#ff9e39] text-white text-xs font-bold">
                  ✓
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-between">
        <button 
          onClick={onPrev}
          className="rounded bg-gray-200 px-8 py-2 text-gray-700 hover:bg-gray-300"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          disabled={!selectedInterest}
          className="rounded bg-[#ff9e39] px-8 py-2 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#ff9e39]/90"
        >
          Next
        </button>
      </div>
    </div>
  )
}
'use client'
import { useState } from 'react'
import Image from 'next/image'
import jumpseatIcon from '@/images/logos/jumpseat-icon.png'

interface StepProps {
  onNext: (data: any) => void
  onPrev: () => void
}

interface AccommodationOption {
  id: string
  title: string
  imageSrc: string
}

const accommodationOptions: AccommodationOption[] = [
  {
    id: 'luxury',
    title: 'Luxury, at its finest',
    imageSrc: '/images/accommodation/luxury.jpg'
  },
  {
    id: 'upgraded',
    title: 'Upgraded Rooms',
    imageSrc: '/images/accommodation/upgraded.jpg'
  },
  {
    id: 'simple',
    title: 'Simple Comfort',
    imageSrc: '/images/accommodation/simple.jpg'
  },
  {
    id: 'economy',
    title: 'Economy',
    imageSrc: '/images/accommodation/economy.jpg'
  }
]

export default function Accommodation({ onNext, onPrev }: StepProps) {
  const [selectedAccommodation, setSelectedAccommodation] = useState<string>('')

  const handleAccommodationSelection = (accommodationId: string) => {
    setSelectedAccommodation(accommodationId)
  }

  const handleNext = () => {
    onNext({ selectedAccommodation })
  }

  return (
    <div className="w-full max-w-4xl rounded-lg bg-white p-8">
      <h2 className="mb-6 text-3xl font-bold text-gray-900">Accomodation</h2>
      
      <div className="mb-8">
        <div className="flex items-center gap-4">
          <Image
            src={jumpseatIcon}
            alt="Avatar"
            className="h-12 w-12 rounded-full border border-gray-500 p-1"
          />
          <p className="text-black">
            Access to a variety of quality rooms all over the Philippines, tell us your preferred standard.
          </p>
        </div>
      </div>

      <p className="mb-4 text-sm text-[#ff9e39]">Choose one</p>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {accommodationOptions.map((accommodation) => (
          <div
            key={accommodation.id}
            onClick={() => handleAccommodationSelection(accommodation.id)}
            className={`relative cursor-pointer overflow-hidden rounded-lg transition-all duration-300 ${
              selectedAccommodation === accommodation.id
                ? 'ring-2 ring-[#ff9e39]'
                : 'hover:ring-2 hover:ring-gray-300'
            }`}
          >
            <div className="relative h-48">
              <Image
                src={accommodation.imageSrc}
                alt={accommodation.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <h3 className="text-xl font-semibold text-white">{accommodation.title}</h3>
              </div>
              {selectedAccommodation === accommodation.id && (
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
          disabled={!selectedAccommodation}
          className="rounded bg-[#ff9e39] px-8 py-2 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#ff9e39]/90"
        >
          Next
        </button>
      </div>
    </div>
  )
}
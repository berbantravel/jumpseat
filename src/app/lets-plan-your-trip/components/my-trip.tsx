'use client'
import { useState } from 'react'
import Image from 'next/image'
import jumpseatIcon from '@/images/logos/jumpseat-icon.png'

interface StepProps {
  onNext: (data: any) => void
  onPrev: () => void
}

interface TripOption {
  id: string
  title: string
  description: string
  imageSrc: string
}

const tripOptions: TripOption[] = [
  {
    id: 'laid-back',
    title: 'Laid-Back Trip',
    description: 'A promising travel packages that will let you encounter relaxing and memorable moments.',
    imageSrc: '/images/trips/laid-back.jpg'
  },
  {
    id: 'luxurious',
    title: 'Luxurious Delight',
    description: 'Experience the finest accommodations and services throughout your journey.',
    imageSrc: '/images/trips/luxurious.jpg'
  },
  {
    id: 'family',
    title: 'Family Bonding',
    description: 'Create lasting memories with activities perfect for the whole family.',
    imageSrc: '/images/trips/family.jpg'
  },
  {
    id: 'adventure',
    title: 'Adventure Bliss',
    description: 'Exciting experiences for those seeking thrilling adventures.',
    imageSrc: '/images/trips/adventure.jpg'
  },
  {
    id: 'different',
    title: 'Something Different',
    description: 'Unique experiences off the beaten path.',
    imageSrc: '/images/trips/different.jpg'
  }
]

export default function MyTrip({ onNext, onPrev }: StepProps) {
  const [selectedTrips, setSelectedTrips] = useState<string[]>([])

  const handleTripSelection = (tripId: string) => {
    setSelectedTrips(prev => {
      if (prev.includes(tripId)) {
        return prev.filter(id => id !== tripId)
      }
      if (prev.length < 2) {
        return [...prev, tripId]
      }
      return prev
    })
  }

  const handleNext = () => {
    onNext({ selectedTrips })
  }

  return (
    <div className="w-full max-w-4xl rounded-lg bg-white p-8">
      <h2 className="mb-6 text-3xl font-bold text-gray-900">My Trip</h2>
      
      <div className="mb-8">
        <div className="flex items-center gap-4">
          <Image
            src={jumpseatIcon}
            alt="Avatar"
            className="h-12 w-12 rounded-full border border-gray-500 p-1"
          />
          <p className="text-black">
            Asia's rich culture is waiting for you. There are lots of destinations that can satisfy your
            curiosity all year round.
          </p>
        </div>
      </div>

      <p className="mb-4 text-sm text-gray-600">Choose up to 2 types of trips that interest you</p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tripOptions.map((trip) => (
          <div
            key={trip.id}
            onClick={() => handleTripSelection(trip.id)}
            className={`relative cursor-pointer overflow-hidden rounded-lg transition-all duration-300 ${
              selectedTrips.includes(trip.id)
                ? 'ring-2 ring-[#ff9e39]'
                : 'hover:ring-2 hover:ring-gray-300'
            }`}
          >
            <div className="relative h-48">
              <Image
                src={trip.imageSrc}
                alt={trip.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40">
                <div className="flex h-full flex-col justify-end p-4 text-white">
                  <h3 className="text-lg font-semibold">{trip.title}</h3>
                  <p className="text-sm opacity-90">{trip.description}</p>
                </div>
              </div>
              {selectedTrips.includes(trip.id) && (
                <div className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#ff9e39]">
                  <svg
                    className="h-4 w-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
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
          disabled={selectedTrips.length === 0}
          className="rounded bg-[#ff9e39] px-8 py-2 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#ff9e39]/90"
        >
          Next
        </button>
      </div>
    </div>
  )
}
'use client'
import { useState } from 'react'
import Image from 'next/image'
import jumpseatIcon from '@/images/logos/jumpseat-icon.png'

interface StepProps {
  onNext: (data: any) => void
  onPrev: () => void
}

interface TransportOption {
  id: string
  title: string
  imageSrc: string
}

const transportOptions: TransportOption[] = [
  {
    id: 'applicable',
    title: 'Applicable Option',
    imageSrc: '/images/transportation/applicable.jpg'
  },
  {
    id: 'public',
    title: 'Public Transport',
    imageSrc: '/images/transportation/public.jpg'
  },
  {
    id: 'special',
    title: 'Special Trip',
    imageSrc: '/images/transportation/special.jpg'
  },
  {
    id: 'own-car',
    title: 'Own Car',
    imageSrc: '/images/transportation/own.jpg'
  }
]

export default function Transport({ onNext, onPrev }: StepProps) {
  const [selectedTransport, setSelectedTransport] = useState<string>('')

  const handleTransportSelection = (transportId: string) => {
    setSelectedTransport(transportId)
  }

  const handleNext = () => {
    onNext({ selectedTransport })
  }

  return (
    <div className="w-full max-w-4xl rounded-lg bg-white p-8">
      <h2 className="mb-6 text-3xl font-bold text-gray-900">Transport</h2>
      
      <div className="mb-8">
        <div className="flex items-center gap-4">
          <Image
            src={jumpseatIcon}
            alt="Avatar"
            className="h-12 w-12 rounded-full border border-gray-500 p-1"
          />
          <p className="text-black">
            Getting from A to B, you can experience the tingle of excitement riding different mode
            of transportation, only in Asia! So, tell us what kind of travel options you prefer?
          </p>
        </div>
      </div>

      <p className="mb-4 text-sm text-[#ff9e39]">Choose one</p>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {transportOptions.map((transport) => (
          <div
            key={transport.id}
            onClick={() => handleTransportSelection(transport.id)}
            className={`relative cursor-pointer overflow-hidden rounded-lg transition-all duration-300 ${
              selectedTransport === transport.id
                ? 'ring-2 ring-[#ff9e39]'
                : 'hover:ring-2 hover:ring-gray-300'
            }`}
          >
            <div className="relative h-48">
              <Image
                src={transport.imageSrc}
                alt={transport.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <h3 className="text-xl font-semibold text-white">{transport.title}</h3>
              </div>
              {selectedTransport === transport.id && (
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
          disabled={!selectedTransport}
          className="rounded bg-[#ff9e39] px-8 py-2 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#ff9e39]/90"
        >
          Next
        </button>
      </div>
    </div>
  )
}
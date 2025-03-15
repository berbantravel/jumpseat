'use client'
import { useState } from 'react'
import Image from 'next/image'
import jumpseatIcon from '@/images/logos/jumpseat-icon.png'

interface StepProps {
  onNext: (data: any) => void
  onPrev: () => void
}

interface SeasonOption {
  id: string
  title: string
  description: string
  imageSrc: string
}

const seasonOptions: SeasonOption[] = [
  {
    id: 'holiday',
    title: 'Holiday Escape',
    description: 'Feel the Spirit of Christmas at its finest.',
    imageSrc: '/images/seasons/holiday.jpg'
  },
  {
    id: 'rain',
    title: 'Hop On The Rain',
    description: 'Experience the refreshing monsoon season in tropical Asia.',
    imageSrc: '/images/seasons/rain.jpg'
  },
  {
    id: 'summer',
    title: 'Striking Summer Retreat',
    description: 'Enjoy sun-soaked beaches and crystal clear waters.',
    imageSrc: '/images/seasons/summer.jpg'
  }
]

export default function Season({ onNext, onPrev }: StepProps) {
  const [selectedSeason, setSelectedSeason] = useState<string>('')

  const handleSeasonSelection = (seasonId: string) => {
    setSelectedSeason(seasonId)
  }

  const handleNext = () => {
    onNext({ selectedSeason })
  }

  return (
    <div className="w-full max-w-4xl rounded-lg bg-white p-8">
      <h2 className="mb-6 text-3xl font-bold text-gray-900">Season</h2>
      
      <div className="mb-8">
        <div className="flex items-center gap-4">
          <Image
            src={jumpseatIcon}
            alt="Avatar"
            className="h-12 w-12 rounded-full border border-gray-500 p-1"
          />
          <p className="text-black">
            Each season is unique, tell us more about your dream vacation.
            Pick one that catches your eyes.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {seasonOptions.map((season) => (
          <div
            key={season.id}
            onClick={() => handleSeasonSelection(season.id)}
            className={`relative cursor-pointer overflow-hidden rounded-lg transition-all duration-300 ${
              selectedSeason === season.id
                ? 'ring-2 ring-[#ff9e39]'
                : 'hover:ring-2 hover:ring-gray-300'
            }`}
          >
            <div className="relative h-48">
              <Image
                src={season.imageSrc}
                alt={season.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40">
                <div className="flex h-full flex-col justify-center items-center p-4 text-white text-center">
                  <h3 className="text-xl font-semibold mb-2">{season.title}</h3>
                  <p className="text-sm opacity-90">{season.description}</p>
                </div>
              </div>
              {selectedSeason === season.id && (
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
          disabled={!selectedSeason}
          className="rounded bg-[#ff9e39] px-8 py-2 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#ff9e39]/90"
        >
          Next
        </button>
      </div>
    </div>
  )
}
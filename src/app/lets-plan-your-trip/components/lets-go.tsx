'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import travelIcon from '@/images/travel-icon.png'

interface StepProps {
  formData?: any
}

export default function LetsGo({ formData }: StepProps) {
  const router = useRouter()

  const handleContinue = () => {
    // Redirect to the thank-you page
    router.push('/')
  }

  return (
    <div className="w-full max-w-4xl rounded-lg bg-white p-8 text-center">
      <div className="mb-8 flex justify-center">
        <div className="relative h-64 w-64">
          <Image
            src={travelIcon}
            alt="Travel Icon"
            fill
            className="object-contain"
          />
        </div>
      </div>

      <h2 className="mb-6 text-5xl font-bold text-gray-800">THANK YOU</h2>
      
      <p className="mb-8 text-lg text-gray-600">
        An email will be sent shortly!
      </p>

      <button
        onClick={handleContinue}
        className="rounded-md bg-[#ff9e39] px-12 py-3 text-lg font-medium text-white hover:bg-[#ff9e39]/90"
      >
        Continue
      </button>
    </div>
  )
}
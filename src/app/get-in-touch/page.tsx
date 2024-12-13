'use client'
import Image from 'next/image'
import React from 'react'
import background from '@/images/our-travel-experiences.jpg'
import destinationsphoto from '@/images/destinations.png'
import whoweare from '@/images/who-we-are.jpg'
import taepei from '@/images/taepei.jpg'
import berbanlogo from '@/images/berbanlogo.png'
import whatsapp from '@/images/logos/whatsapp.png'
import viber from '@/images/logos/viber.png'
import kakaotalk from '@/images/logos/kakaotalk.png'
import { useRouter } from 'next/navigation'
import { destinations } from '@/constants/destinations'
import FirstSection from './sections/firstSection'
import ThirdSection from './sections/thirdSection'

export default function GetInTouch() {
  const router = useRouter()

  const handleCardClick = (destination: string) => {
    router.push(
      `/destination/${destination.toLowerCase().replace(/\s+/g, '-')}`,
    )
  }

  return (
    <>
      {/* MAIN BANNER */}
      <div className="relative isolate -mt-16 overflow-hidden">
        <Image
          src={whoweare}
          alt=""
          objectFit="cover"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
          width={800}
          height={600}
        />
        <div className="mx-auto max-w-5xl py-32 sm:py-48">
          <div className="mx-10 flex flex-col items-center justify-center self-center text-center">
            <h1 className="mb-2 font-poppinsSemiBold text-5xl tracking-tight text-white sm:text-7xl">
              GET IN TOUCH WITH US
            </h1>
            <p className="bodyRegular mt-0 max-w-3xl items-center text-center text-lg text-white">
              Our lines are always open for inquiries or questions. Learn more
              about our exclusive tour packages. We&apos;re excited to set you
              off on one of the best trips of your life.
            </p>
          </div>
        </div>
      </div>
      {/* END OF MAIN BANNER */}
      <div className="relative z-10">
        <FirstSection />
      </div>

      <div className="-mt-14 bg-white">
        {/* DIVIDER */}
        <div className="relative flex h-40 w-full bg-transparent">
          <div className="flex h-full w-1/2 bg-transparent"></div>
          <div className="flex h-full w-1/2 bg-[#565555]"></div>
        </div>
        {/* END OF DIVIDER */}
        <div
          className="clip-container relative isolate -mt-40 overflow-hidden bg-white pb-0 pt-16 sm:pt-24 lg:pt-16"
          style={{
            clipPath: 'polygon(50% 0%, 100% 5%, 100% 100%, 0 100%, 0 5%)',
            backgroundColor: '#FFFFFF',
          }}
        >
          <div className="!bg-[#FAFAFA]">
            <ThirdSection />
            <div className="mx-auto flex max-w-7xl px-12 py-8 sm:py-16"></div>
          </div>
        </div>
      </div>
    </>
  )
}

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
import TeamMembers from './components/member'
import Map from './components/map'
import FirstSection from './sections/firstSection'
import SecondSection from './sections/secondSection'
import ThirdSection from './sections/thirdSection'

export default function WhoWeAre() {
  const router = useRouter()

  const handleCardClick = (destination: string) => {
    router.push(
      `/destination/${destination.toLowerCase().replace(/\s+/g, '-')}`,
    )
  }

  return (
    <>
      {/* MAIN BANNER */}
      <div className="relative isolate -mt-16 overflow-hidden py-28">
        <Image
          src={whoweare}
          alt=""
          objectFit="cover"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
          width={800}
          height={600}
        />
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        ></div>
        <div className="mx-auto max-w-5xl py-32 sm:py-48 lg:py-56">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center"></div>
          <div className="mx-10 flex flex-col items-center justify-center self-center text-center">
            <h1 className="font-poppinsSemiBold text-5xl tracking-tight text-white sm:text-7xl">
              EXPERIENCE ASIA!
            </h1>
            <p className="bodyRegular mt-0 text-lg text-white">OUR MISSION</p>
            <p className="bodyRegular mt-0 max-w-2xl items-center text-center text-lg text-white">
              To provide an excellent custom-made and hassle-free travel
              experience fulfilling every client&apos;s travel goal.
            </p>
          </div>
        </div>
      </div>
      {/* END OF MAIN BANNER */}

      <div className="-mt-14 bg-white">
        {/* DIVIDER */}
        <div className="relative flex h-40 w-full bg-transparent">
          <div className="flex h-full w-1/2 bg-transparent"></div>
          <div className="flex h-full w-1/2 bg-[#565555]"></div>
        </div>
        {/* END OF DIVIDER */}
        <div
          className="relative isolate -mt-40 overflow-hidden bg-white pb-0 pt-8"
          style={{
            clipPath: 'polygon(50% 0%, 100% 5%, 100% 100%, 0 100%, 0 5%)',
            backgroundColor: '#FFFFFF',
          }}
        >
          <div className="!bg-[#FAFAFA]">
            <FirstSection />
            <SecondSection />
            <ThirdSection />
          </div>
        </div>
      </div>
    </>
  )
}

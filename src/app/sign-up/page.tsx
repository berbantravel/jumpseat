'use client'
import Image from 'next/image'
import React from 'react'
import letsplanyourtrip from '@/images/lets-plan-your-trip.jpg'
import whatsapp from '@/images/logos/whatsapp.png'
import viber from '@/images/logos/viber.png'
import kakaotalk from '@/images/logos/kakaotalk.png'
import { useRouter } from 'next/navigation'
import FirstSection from './sections/firstSection'

export default function SignUp() {
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
          src={letsplanyourtrip}
          alt=""
          quality={80}
          priority
          className="absolute inset-0 -z-10 h-full w-full object-cover object-center"
          sizes="100vw"
          fill
        />
        <div className="absolute inset-0 -z-10 bg-black opacity-25"></div>
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        ></div>
        <div className="mx-auto max-w-5xl py-32 sm:py-48 lg:py-56">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center"></div>
          <div className="mx-10 flex flex-col items-center justify-center self-center text-center">
            <h1 className="mb-2 font-poppinsSemiBold text-5xl tracking-tight text-white sm:text-7xl">
              LET&apos;S PLAN YOUR TRIP
            </h1>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs">
              <div className="flex items-center">
                <Image
                  className="mr-2 h-7 w-auto cursor-pointer"
                  src={whatsapp}
                  alt="Your Company Icon"
                  width={800}
                  height={600}
                />
                <span className="hidden font-medium text-white sm:flex">
                  WhatsApp
                </span>
                <span className="ml-0 text-white sm:ml-2">
                  +63-995-015-8869
                </span>
              </div>
              <div className="flex items-center">
                <Image
                  className="mr-2 h-7 w-auto cursor-pointer"
                  src={viber}
                  alt="Your Company Icon"
                  width={800}
                  height={600}
                />
                <span className="hidden font-medium text-white sm:flex">
                  Viber
                </span>
                <span className="ml-0 text-white sm:ml-2">
                  +63-918-746-6894
                </span>
              </div>
              <div className="flex items-center">
                <Image
                  className="mr-2 h-6 w-auto cursor-pointer"
                  src={kakaotalk}
                  alt="Your Company Icon"
                  width={800}
                  height={600}
                />
                <span className="hidden font-medium text-white sm:flex">
                  KakaoTalk
                </span>
                <span className="ml-0 text-white sm:ml-2">
                  +63-912-746-6894
                </span>
              </div>
            </div>
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
          className="clip-container relative isolate -mt-40 overflow-hidden bg-white pb-0 pt-16 sm:pt-24 lg:pt-16"
          style={{
            clipPath: 'polygon(50% 0%, 100% 5%, 100% 100%, 0 100%, 0 5%)',
            backgroundColor: '#FFFFFF',
          }}
        >
          <div className="!bg-[#FAFAFA]">
            <FirstSection />
            <div className="mx-auto flex max-w-7xl px-12 py-8 sm:py-16"></div>
          </div>
        </div>
      </div>
    </>
  )
}

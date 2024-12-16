'use client'
import Image from 'next/image'
import React from 'react'
import background from '@/images/our-travel-experiences.jpg'
import destinationsphoto from '@/images/destinations.png'
import whoweare from '@/images/who-we-are.jpg'
import taepei from '@/images/taepei.jpg'
import berbanlogo from '@/images/berbanlogo.png'
import kakaotalk from '@/images/logos/kakaotalk.png'
import { useRouter } from 'next/navigation'
import getInTouch from '@/images/get-in-touch.jpg'
import { destinations } from '@/constants/destinations'
import FirstSection from './sections/firstSection'
import SecondSection from './sections/secondSection'
import ctaBackground from '@/images/cta-get-in-touch.jpg'

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
          src={getInTouch}
          alt="Get in touch banner"
          quality={100}
          priority
          className="absolute inset-0 -z-10 h-full w-full object-cover object-bottom"
          sizes="100vw"
          fill
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
      <div className="relative" style={{ zIndex: 0 }}>
        <div className="">
          {/* DIVIDER */}
          <div className="relative flex h-40 w-full bg-transparent">
            <div className="flex h-full w-1/2 bg-transparent"></div>
            <div className="flex h-full w-1/2 bg-[#565555]"></div>
          </div>
          {/* END OF DIVIDER */}
          <div
            className="clip-container relative isolate -mt-40 overflow-hidden pb-0 pt-16 sm:pt-24 lg:pt-16"
            style={{
              clipPath: 'polygon(50% 0%, 100% 100%, 100% 100%, 0 100%, 0 0%)',
              backgroundColor: 'transparent',
            }}
          ></div>
        </div>
      </div>
      <div className="" style={{ zIndex: 1 }}>
        <FirstSection />
      </div>

      <div className="!bg-[#FAFAFA]">
        <SecondSection />
        <div className="mx-auto flex max-w-7xl px-12 py-8 sm:py-16"></div>
      </div>
      {/* MAIN BANNER */}
      <div className="relative isolate -mt-16 justify-items-center overflow-hidden">
        <Image
          src={ctaBackground}
          alt="Get in touch CTA"
          quality={100}
          priority
          className="absolute inset-0 -z-10 h-full w-full object-cover object-center"
          sizes="100vw"
          fill
        />
        <div className="max-w-5xl py-24 sm:py-36">
          <div className="flex flex-col items-center justify-center self-center text-center">
            <p className="max-w-2xl text-xl text-white">
              Still undecided and can't find what's your next destination?
              Answer our simple questionnaire. We can help you choose a
              remarkable travel experience that you'll surely enjoy.
            </p>
            <button
              className="mt-8 rounded-md bg-[#ff9e39] px-8 py-3 text-base font-semibold text-white hover:bg-[#ff9e39]/90"
              onClick={() => router.push('/inquiry')} // Add this if you want the button to navigate
            >
              Fill out our inquiry form
            </button>
          </div>
        </div>
      </div>
      {/* END OF MAIN BANNER */}
    </>
  )
}

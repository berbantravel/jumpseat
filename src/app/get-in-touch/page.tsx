'use client'
import Image from 'next/image'
import React from 'react'
import { useRouter } from 'next/navigation'
import getInTouch from '@/images/get-in-touch.jpg'
import FirstSection from './sections/firstSection'
import SecondSection from './sections/secondSection'
import ctaBackground from '@/images/cta-get-in-touch.jpg'
import { useState } from 'react'
import InquiryModal from './components/modal'

export default function GetInTouch() {
  const router = useRouter()
  const [isModalOpen, setIsModalOpen] = useState(false)

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
      </div>
      <div className="mx-auto flex max-w-7xl px-12 py-16 md:py-20"></div>
      {/* CTA BANNER */}
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
        <div className="max-w-full px-6 py-24 sm:py-36">
          <div className="flex flex-wrap items-center justify-center gap-12 self-center text-left lg:flex-row lg:flex-nowrap">
            <p className="max-w-4xl text-xl text-white">
              Still undecided and can&apos;t find what&apos;s your next
              destination? Answer our simple questionnaire. We can help you
              choose a remarkable travel experience that you&apos;ll surely
              enjoy.
            </p>
            <button
              className="w-2/3 rounded-full bg-[#ff9e39] px-4 py-4 text-base font-light text-white hover:bg-[#ff9e39] sm:px-24"
              onClick={() => setIsModalOpen(true)}
            >
              Fill out our inquiry form
            </button>
          </div>
        </div>
      </div>
      {/* END OF CTA */}
      <InquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  )
}

'use client'
import Image from 'next/image'
import React from 'react'
import { useRouter } from 'next/navigation'
import getInTouch from '@/images/get-in-touch.jpg'
import FirstSection from './sections/firstSection'
import ctaBackground from '@/images/cta-get-in-touch.jpg'
import Insights from '@/images/Insights.jpg'
import { useState } from 'react'
import InquiryModal from './components/modal'
import whatsapp from '@/images/logos/whatsapp.png'
import viber from '@/images/logos/viber.png'
import kakaotalk from '@/images/logos/kakaotalk.png'
import { blogContents } from '@/constants/blogs'

export default function Inspirations() {
  const router = useRouter()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleBlogClick = (slug: string) => {
    router.push(`/inspirations/${slug}`)
  }

  return (
    <>
      {/* MAIN BANNER */}
      <div className="relative isolate -mt-16 overflow-hidden py-28">
        <Image
          src={Insights}
          alt=""
          quality={80}
          priority
          className="absolute inset-0 -z-10 h-full w-full object-cover object-center"
          sizes="100vw"
          fill
        />
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        ></div>
        <div className="mx-auto max-w-5xl py-32 sm:py-48 lg:py-56">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center"></div>
          <div className="mx-10 text-center">
            <h1 className="font-poppinsSemiBold text-5xl tracking-tight text-white sm:text-7xl">
              WHAT ABOUT ASIA?
            </h1>
            <p className="bodyRegular mt-0 text-lg text-white">BLOG</p>
          </div>
        </div>
      </div>

      {/* Diagonal Section */}
      <div className="-mt-14">
        <div className="relative flex h-40 w-full bg-transparent">
          <div className="flex h-full w-1/2 bg-transparent"></div>
          <div className="flex h-full w-1/2 bg-[#565555]"></div>
        </div>
        <div
          className="relative isolate -mt-40 overflow-hidden bg-white py-28"
          style={{
            clipPath: 'polygon(50% 0%, 100% 5%, 100% 100%, 0 100%, 0 5%)',
            backgroundColor: '#ffffff',
          }}
        >
          <FirstSection />
        </div>
      </div>

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

      <InquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  )
}

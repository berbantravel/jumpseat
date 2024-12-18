'use client'
import Image from 'next/image'
import React from 'react'
import { useRouter } from 'next/navigation'
import FirstSection from './sections/firstSection'
import ctaBackground from '@/images/cta-get-in-touch.jpg'
import Insights from '@/images/Insights.jpg'
import { useState } from 'react'
import InquiryModal from './components/modal'

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
        <div className="absolute inset-0 -z-10 bg-black opacity-25"></div>
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
    </>
  )
}

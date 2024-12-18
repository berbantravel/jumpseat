'use client'

import Image from 'next/image'
import React from 'react'
import background from '@/images/our-travel-experiences.jpg'
import destinationsphoto from '@/images/destinations.png'
import whatsapp from '@/images/logos/whatsapp.png'
import viber from '@/images/logos/viber.png'
import kakaotalk from '@/images/logos/kakaotalk.png'
import { useRouter } from 'next/navigation'
import { destinations } from '@/constants/destinations'

export default function Experiences() {
  const router = useRouter()

  const handleCardClick = (destination: string) => {
    router.push(
      `/destination/${destination.toLowerCase().replace(/\s+/g, '-')}`,
    )
  }
  const scrollToPackages = () => {
    document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <div className="relative isolate -mt-16 overflow-hidden py-28">
        <Image
          src={background}
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
              OUR TRAVEL EXPERIENCES
            </h1>
            <p className="bodyRegular mt-0 text-lg text-white">
              Are you ready to experience moments that will last a lifetime?
              Learn more about our exclusive tour packages. We are excited to
              set you off on one of the best trips of your life. Start your next
              adventure with Jumpseat.
            </p>
            <div className="mx-2 mt-10 flex items-center justify-center gap-x-6 sm:mx-10">
              <button
                onClick={scrollToPackages}
                className="rounded-md bg-[#ff9e39] px-14 py-4 text-sm font-semibold text-white shadow-sm hover:bg-[#ff9e39] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400 sm:px-32"
              >
                Experience Asia
              </button>
            </div>
          </div>
        </div>
      </div>
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
          <div className="mx-auto max-w-5xl px-10 py-5 text-center sm:py-16 lg:py-10">
            <h1 className="mb-3 text-3xl font-medium tracking-tight text-black sm:text-5xl">
              Start your next adventure with Jumpseat
            </h1>
            <p className="mt-0 text-lg font-normal text-black">
              Are you ready to experience Asia? Learn more about our exclusive
              tours and curated experiences.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-4">
              <input
                type="text"
                placeholder="Let's explore the Philippines..."
                className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm text-black"
              />
              <button className="rounded-md bg-[#ff9e39] px-8 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#ff9e39]">
                Search
              </button>
            </div>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs">
              <div className="flex items-center">
                <Image
                  className="mr-2 h-7 w-auto cursor-pointer"
                  src={whatsapp}
                  alt="Your Company Icon"
                  width={800}
                  height={600}
                />
                <span className="hidden font-medium text-black sm:flex">
                  WhatsApp
                </span>
                <span className="ml-0 text-black sm:ml-2">
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
                <span className="hidden font-medium text-black sm:flex">
                  Viber
                </span>
                <span className="ml-0 text-black sm:ml-2">
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
                <span className="hidden font-medium text-black sm:flex">
                  KakaoTalk
                </span>
                <span className="ml-0 text-black sm:ml-2">
                  +63-912-746-6894
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="-mt-14">
        <div
          className="relative flex h-40 w-full bg-transparent"
          style={{
            clipPath: 'polygon(0 100%, 100% 0, 100% 100%, 0% 100%)',
          }}
        >
          <div className="flex h-full w-[70%] bg-transparent"></div>
          <div className="flex h-full w-[30%] bg-[#565555]"></div>
        </div>
        <div
          className="relative isolate -mt-48 overflow-hidden py-28"
          style={{
            clipPath: 'polygon(0 0, 100% 7%, 100% 100%, 0% 100%)',
            backgroundColor: '#ff9e39',
          }}
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
              <div className="lg:pr-8 lg:pt-28">
                <div className="lg:max-w-lg">
                  <p className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                    Our Hand-picked Destinations
                  </p>
                  <p className="mt-6 text-lg leading-8 text-white">
                    Our experiences can be booked directly. When venturing on
                    one of these, you will be in the safest hands of one of our
                    professional partners. Come explore with us.
                  </p>
                  <div className="mt-10 flex items-center justify-start gap-x-6">
                    <a
                      href="#"
                      className="w-full max-w-80 rounded-md bg-[#565555] py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-[#565555] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
                    >
                      Let&apos;s Plan Your Asian Experience
                    </a>
                  </div>
                </div>
              </div>
              <div className="mt-5">
                <Image
                  src={destinationsphoto}
                  alt="Product screenshot"
                  className="h-auto w-full"
                  width={800}
                  height={600}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white " id="packages">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4 xl:gap-x-8">
            {destinations.map((destination) => (
              <div
                key={destination.name}
                onClick={() => handleCardClick(destination.name)}
                className="hover-zoom relative mx-0 flex h-[550px] w-auto cursor-pointer flex-col overflow-hidden p-6 px-8 pt-40 hover:opacity-95 sm:mx-0 md:h-[550px] md:w-auto lg:h-[550px] lg:w-auto xl:h-full xl:w-auto"
              >
                <span aria-hidden="true" className="absolute inset-0">
                  <Image
                    src={destination.imageSrc}
                    alt=""
                    className="h-full w-full object-cover object-center"
                    width={800}
                    height={600}
                  />
                  <span className="absolute inset-0 bg-black opacity-10"></span>
                </span>
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-gray-950 opacity-25"
                />
                <div className="relative mt-auto flex flex-col text-white">
                  <span className="text-md mb-4 text-left font-bold">
                    {destination.name}
                  </span>
                  <span className="text-md text-left font-semibold">
                    {destination.description}
                  </span>
                  <span className="text-md mt-4 text-center font-semibold">
                    STARTS FROM{' '}
                    <span className="bg-neutral-800 px-1 font-bold text-[#ff9e39]">
                      Php{destination.price}/pax
                    </span>
                  </span>
                  <span className="mt-10 flex items-center justify-center gap-x-6 hover:bg-[#ff9e39]">
                    <span className="w-full max-w-80 rounded-md py-2.5 text-center text-sm font-semibold text-white shadow-sm ring-2 ring-white hover:ring-[#ff9e39] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400">
                      VIEW DETAILS
                    </span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

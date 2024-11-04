'use client'
import Image from 'next/image'
import React from 'react'
import background from '@/images/our-travel-experiences.jpg'
import destinationsphoto from '@/images/destinations.png'
import whoweare from '@/images/who-we-are.jpg'
import whatsapp from '@/images/logos/whatsapp.png'
import viber from '@/images/logos/viber.png'
import kakaotalk from '@/images/logos/kakaotalk.png'
import { useRouter } from 'next/navigation'
import { destinations } from '@/constants/destinations'

export default function WhoWeAre() {
  const router = useRouter()

  const handleCardClick = (destination: string) => {
    router.push(
      `/destination/${destination.toLowerCase().replace(/\s+/g, '-')}`,
    )
  }

  return (
    <>
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
 <div className="flex flex-col text-center items-center justify-center mx-10 self-center">
  <h1 className="font-poppinsSemiBold text-5xl tracking-tight text-white sm:text-7xl">
    EXPERIENCE ASIA!
  </h1>
  <p className="bodyRegular mt-0 text-lg text-white">
    OUR MISSION
  </p>
  <p className="bodyRegular mt-0 text-base text-white max-w-2xl items-center text-center">
    To provide an excellent custom-made and hassle-free travel experience fulfilling every client's travel goal.
  </p>
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
         <div className="mx-auto max-w-5xl py-5 sm:py-16 lg:py-10 px-10 shadow-md flex flex-col lg:flex-row items-center justify-between">
  {/* Left Column - Text and Button */}
  <div className="lg:w-1/2 text-center lg:text-left">
    <h2 className="mb-1 text-xl font-medium tracking-tight text-black sm:text-3xl">
      We'll take you to Asia's Finest Destinations
    </h2>
    <div className='border w-56 mb-3'></div>
    <p className="mt-0 font-bold text-lg text-black">
      What we do
    </p>
    <p className="mt-0 text-xs font-normal text-black whitespace-normal mb-4">
  We aim to develop sustainable tourism in the South East and East Asian Region, both for travelers and partners. We want to bring worthwhile adventures. We are here to assist you in finding unique travel holiday experiences in the region.
</p>

<p className="mt-0 text-xs font-normal text-black whitespace-normal mb-4">
  We are eager to introduce you to Asia's wonderful travel destinations. Lead you to discover our rich culture, mouth-watering dishes, and adventure-filled mountain trails in different islands.
</p>

<p className="mt-0 text-xs font-normal text-black whitespace-normal mb-4">
  Just like you, we also love going places. We enjoy exploring where we get to have real and unique encounters with nature and different people. We prefer things off-season and beyond the beaten track.
  We appreciate being pampered rather than treated like a simple traveler. We dare to test our limits with all sorts of activities – whether it's food and drink, a long walk, or a retreat, we're always ready for it.
</p>

<p className="mt-0 text-xs font-normal text-black whitespace-normal">
  Come and travel with us! Meet Asia!
</p>
    <button className="rounded-md bg-[#ff9e39] px-10 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#ff9e39] mt-4">
      Let's Go
    </button>
  </div>

  {/* Right Column - Image */}
  <div className="lg:w-1/2 mt-8 lg:mt-0 flex justify-center">
  <Image
    src=""
    alt="Asia's Finest Destinations"
    width={500}
    height={300}
    className="w-full max-w-md object-cover"
  />
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
                      Let's Plan Your Asian Experience
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
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4 xl:gap-x-8">
            {destinations.map((destination) => (
              <div
                key={destination.name}
                onClick={() => handleCardClick(destination.name)}
                className="hover-zoom relative flex h-[550px] w-auto mx-0 sm:mx-0 cursor-pointer flex-col overflow-hidden p-6 px-8 pt-40 hover:opacity-95 md:w-auto md:h-[550px] lg:w-auto lg:h-[550px] xl:w-auto xl:h-full"
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

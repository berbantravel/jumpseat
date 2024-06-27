'use client'

import Image from 'next/image'
import React from 'react'
import background from '@/images/our-travel-experiences.jpg'
import southKorea from '@/images/south-korea.jpg'
import whatsapp from '@/images/logos/whatsapp.png'
import viber from '@/images/logos/viber.png'
import kakaotalk from '@/images/logos/kakaotalk.png'
import ProductDetails from '@/components/ProductDetails'
import {
  CloudArrowUpIcon,
  LockClosedIcon,
  ServerIcon,
} from '@heroicons/react/20/solid'
import {
  CalendarIcon,
  HomeIcon,
  TagIcon
} from '@heroicons/react/24/outline'
const stats = [
  { label: 'Transactions every 24 hours', value: '44 million' },
  { label: 'Assets under holding', value: '$119 trillion' },
  { label: 'New users annually', value: '46,000' },
]

export default function DestinationDetails() {
  return (
    <>
      <div className="relative isolate -mt-16 overflow-hidden py-28">
        <Image
          src={southKorea}
          alt=""
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        ></div>
        <div className="mx-auto max-w-5xl py-32 sm:py-48 lg:py-56">

          <div className="text-center pb-36">
            <h1 className="font-poppinsSemiBold text-4xl tracking-tight text-white sm:text-7xl">
              SOUTH KOREA
            </h1>
            <p className="bodyRegular mt-0 text-lg text-white">
            Spend some time exploring trending kpop spots. A
            thought-provoking location that will give you a
            mindblowing intimacy towards Sout Korea&apos;s history and
            culture.
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
          className="relative isolate -mt-40 overflow-hidden bg-white pt-28 pb-14"
          style={{
            clipPath: 'polygon(50% 0%, 100% 10%, 100% 100%, 0 100%, 0 10%)',
            backgroundColor: '#ffffff',
          }}
        >
          <div className="mx-auto max-w-full py-32 text-center sm:py-48 lg:py-10">
            <div className="mx-auto -mt-12 max-w-7xl px-6 sm:mt-0 lg:px-8 xl:-mt-8">
              <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
                <div className="mt-6 flex flex-col items-center gap-y-20 lg:flex-row">
                  <div className="lg:w-full lg:max-w-4xl lg:flex-auto">
                    <p className="text-left text-xl leading-8 text-gray-600">
                      Spend some time exploring trending kpop spots. A
                      thought-provoking location that will give you a
                      mindblowing intimacy towards Sout Korea&apos;s history and
                      culture.
                    </p>
                  </div>
                  <div className="lg:flex lg:flex-auto lg:justify-center">
                    <dl className="w-64 space-y-8 xl:w-80">
                      {/* {stats.map((stat) => (
                    <div key={stat.label} className="flex flex-col-reverse gap-y-4">
                      <dt className="text-base leading-7 text-gray-600">{stat.label}</dt>
                      <dd className="text-5xl font-semibold tracking-tight text-gray-900">{stat.value}</dd>
                    </div>
                  ))} */}

                      <div className="flex items-center justify-center gap-y-4">
                        <div className="flex items-center justify-center px-6 py-3 ring-1 ring-gray-300 rounded-md min-w-60">
                          <div className='mr-2'>
                            <CalendarIcon
                              className="mr-2 h-8 w-auto cursor-pointer text-gray-500"
                              />
                          </div>
                          <div className='min-w-11 w-full text-left'>
                            <dt className="text-lg font-semibold leading-7 text-[#ff9e39]">
                              Best Time to Visit
                            </dt>
                            <dd className="text-md font-normal tracking-tight text-gray-500">
                              August - November
                            </dd>
                          </div>
                        </div>
                      </div>

                      

                      <div className="flex items-center justify-center gap-y-4">
                        <div className="flex items-center justify-center px-6 py-3 ring-1 ring-gray-300 rounded-md min-w-60">
                          <div className='mr-2'>
                            <HomeIcon
                              className="mr-2 h-8 w-auto cursor-pointer text-gray-500"
                            />
                          </div>
                          <div className='min-w-11 w-full text-left'>
                            <dt className="text-lg font-semibold leading-7 text-[#ff9e39]">
                            Days of Stay
                            </dt>
                            <dd className="text-md font-normal tracking-tight text-gray-500">
                            5 Days
                            </dd>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-center gap-y-4">
                        <div className="flex items-center justify-center px-6 py-3 ring-1 ring-gray-300 rounded-md min-w-60">
                          <div className='mr-2'>
                            <TagIcon
                              className="mr-2 h-8 w-auto cursor-pointer text-gray-500"
                              />
                          </div>
                          <div className='min-w-11 w-full text-left'>
                            <dt className="text-lg font-semibold leading-7 text-[#ff9e39]">
                              Price per Person
                            </dt>
                            <dd className="text-md font-bold tracking-tight text-gray-950">
                              USD 109.00
                            </dd>
                            <dd className="text-sm font-normal tracking-tight text-gray-500">
                              No Minimum Guests
                            </dd>
                          </div>
                        </div>
                      </div>

                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-0">

          <ProductDetails></ProductDetails>
      </div>

      
    </>
  )
}

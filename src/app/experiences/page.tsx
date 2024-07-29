'use client'

import Image from 'next/image'
import React from 'react'
import background from '@/images/our-travel-experiences.jpg'
import destinationsphoto from '@/images/destinations.png'
import whatsapp from '@/images/logos/whatsapp.png'
import viber from '@/images/logos/viber.png'
import kakaotalk from '@/images/logos/kakaotalk.png'
import {
  CloudArrowUpIcon,
  LockClosedIcon,
  ServerIcon,
} from '@heroicons/react/20/solid'

const products = [
  {
    id: 1,
    name: 'Focus Paper Refill',
    href: '#',
    price: '$13',
    description: '3 sizes available',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/category-page-01-image-card-01.jpg',
    imageAlt:
      'Person using a pen to cross a task off a productivity paper card.',
  },
  {
    id: 2,
    name: 'Focus Card Holder',
    href: '#',
    price: '$64',
    description: 'Walnut',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/category-page-01-image-card-02.jpg',
    imageAlt: 'Paper card sitting upright in walnut card holder on desk.',
  },
  {
    id: 3,
    name: 'Focus Carry Case',
    href: '#',
    price: '$32',
    description: 'Heather Gray',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/category-page-01-image-card-03.jpg',
    imageAlt:
      'Textured gray felt pouch for paper cards with snap button flap and elastic pen holder loop.',
  },
  {
    id: 4,
    name: 'Focus Carry Case',
    href: '#',
    price: '$32',
    description: 'Heather Gray',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/category-page-01-image-card-03.jpg',
    imageAlt:
      'Textured gray felt pouch for paper cards with snap button flap and elastic pen holder loop.',
  },
  {
    id: 5,
    name: 'Focus Carry Case',
    href: '#',
    price: '$32',
    description: 'Heather Gray',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/category-page-01-image-card-03.jpg',
    imageAlt:
      'Textured gray felt pouch for paper cards with snap button flap and elastic pen holder loop.',
  },
  {
    id: 6,
    name: 'Focus Carry Case',
    href: '#',
    price: '$32',
    description: 'Heather Gray',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/category-page-01-image-card-03.jpg',
    imageAlt:
      'Textured gray felt pouch for paper cards with snap button flap and elastic pen holder loop.',
  },
]
const destinations = [
  {
    name: 'SOUTH KOREA',
    description:
      'EXPERIENCE GRAND VACATION AND SPECTACULAR INSTAGRAMMABLE KPOP SPOTS',
    price: 500,
    href: '#',
    imageSrc:
      'https://images.pexels.com/photos/2246789/pexels-photo-2246789.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    name: 'TAIWAN',
    description:
      'EXPERIENCE TAIWAN\'S RICH CULTURE',
    price: 500,
    href: '#',
    imageSrc:
      'https://images.pexels.com/photos/1474157/pexels-photo-1474157.jpeg',
  },
  {
    name: 'THAILAND',
    description:
      'A MOUTH WATERING JOURNEY THAT WILL TREAT YOUR TASTE BUDS',
    price: 500,
    href: '#',
    imageSrc:
      'https://images.pexels.com/photos/1682748/pexels-photo-1682748.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    name: 'SINGAPORE',
    description:
      'LEAVE YOURSELF BEHIND AND GO BEYOND WHAT SINGAPORE HAS TO OFFER',
    price: 500,
    href: '#',
    imageSrc:
      'https://images.pexels.com/photos/1507730/pexels-photo-1507730.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    name: 'MALAYSIA',
    description:
      'FULLFILL YOURSELF WITH A BREATHTAKING VOYAGE',
    price: 500,
    href: '#',
    imageSrc:
      'https://images.pexels.com/photos/433989/pexels-photo-433989.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    name: 'JAPAN',
    description:
      'DISCOVER UNRIVALED SCENERIES AND A PLACE RICH IN HISTORY IN THE EAST',
    price: 500,
    href: '#',
    imageSrc:
      'https://images.pexels.com/photos/3408353/pexels-photo-3408353.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    name: 'INDONESIA',
    description:
      'EXPERIENCE WHAT NATURE HAS TO OFFER',
    price: 500,
    href: '#',
    imageSrc:
      'https://images.pexels.com/photos/2659475/pexels-photo-2659475.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    name: 'HONG KONG',
    description:
      'LOOSEN UP AND EXPERIENCE A MARVELOUS HOLIDAY!',
    price: 500,
    href: '#',
    imageSrc:
      'https://images.pexels.com/photos/3957774/pexels-photo-3957774.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    name: 'THE PHILIPPINES',
    description:
      'HEART-WARMING DESTINATION THAT UNCOVERS NATURE\'S GLAMOR',
    price: 500,
    href: '#',
    imageSrc:
      'https://images.pexels.com/photos/2407265/pexels-photo-2407265.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
]
const features = [
  {
    name: 'Push to deploy.',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'SSL certificates.',
    description:
      'Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.',
    icon: LockClosedIcon,
  },
  {
    name: 'Database backups.',
    description:
      'Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.',
    icon: ServerIcon,
  },
]

export default function Experiences() {
  return (
    <>
      <div className="relative isolate -mt-16 overflow-hidden py-28">
        <Image
          src={background}
          alt=""
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />

        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
        </div>
        <div className="mx-auto max-w-5xl py-32 sm:py-48 lg:py-56">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            {/* Add any additional elements if needed */}
          </div>
          <div className="text-center">
            <h1 className="font-poppinsSemiBold text-4xl tracking-tight text-white sm:text-7xl">
              OUR TRAVEL EXPERIENCES
            </h1>
            <p className="bodyRegular mt-0 text-lg text-white">
              Are you ready to experience moments that will last a lifetime?
              Learn more about our exclusive tour packages. We are excited to
              set you off on one of the best trips of your life. Start your next
              adventure with Jumpseat.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="#"
                className="rounded-md bg-[#ff9e39] px-32 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#ff9e39] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
              >
                Experience Asia
              </a>
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
            clipPath: 'polygon(50% 0%, 100% 10%, 100% 100%, 0 100%, 0 10%)',
            backgroundColor: '#ffffff',
          }}
        >
          <div className="mx-auto max-w-5xl py-32 text-center sm:py-48 lg:py-10">
            <h1 className="mb-3 text-2xl font-medium tracking-tight text-black sm:text-5xl">
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
            <div className="mt-5 flex items-center justify-center gap-x-6 text-xs">
              <div className="flex items-center">
                <Image
                  className="mr-2 h-7 w-auto cursor-pointer"
                  src={whatsapp}
                  alt="Your Company Icon"
                />
                <span className="font-medium text-black">WhatsApp</span>
                <span className="ml-2 text-black">+63-995-015-8869</span>
              </div>
              <div className="flex items-center">
                <Image
                  className="mr-2 h-7 w-auto cursor-pointer"
                  src={viber}
                  alt="Your Company Icon"
                />
                <span className="font-medium text-black">Viber</span>
                <span className="ml-2 text-black">+63-918-746-6894</span>
              </div>
              <div className="flex items-center">
                <Image
                  className="mr-2 h-6 w-auto cursor-pointer"
                  src={kakaotalk}
                  alt="Your Company Icon"
                />
                <span className="font-medium text-black">KakaoTalk</span>
                <span className="ml-2 text-black">+63-912-746-6894</span>
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
            clipPath: 'polygon(0 0, 100% 12%, 100% 100%, 0% 100%)',
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
                />
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {destinations.map((destination) => (
              <a
                key={destination.name}
                href="/destination-details"
                className="relative flex h-full w-56 flex-col p-6 hover:opacity-95 xl:w-auto pt-40 px-8 hover-zoom overflow-hidden"
              >
                <span aria-hidden="true" className="absolute inset-0">
                  <img
                    src={destination.imageSrc}
                    alt=""
                    className="h-full w-full object-cover object-center"
                  />
                  <span className="absolute inset-0 bg-black opacity-10"></span>
                </span>
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-gray-950 opacity-25"
                />
                <div className="relative mt-auto flex flex-col text-white">
                  <span className="text-md text-left font-bold mb-4">
                    {destination.name}
                  </span>
                  <span className="text-md text-left font-semibold">
                    {destination.description}
                  </span>
                  <span className="text-md mt-4 text-center font-semibold">
                    STARTS FROM <span className='text-[#ff9e39]'>${destination.price}</span>
                  </span>
                  <span className="mt-10 flex items-center justify-start gap-x-6 hover:bg-[#ff9e39]">
                    <span
                      className="w-full max-w-80 rounded-md py-2.5 text-center text-sm font-semibold text-white shadow-sm ring-2 ring-white hover:ring-[#ff9e39] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
                    >
                      VIEW DETAILS
                    </span>
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

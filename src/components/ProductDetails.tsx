'use client';

import Link from 'next/link'
import clsx from 'clsx'
import { useState } from 'react'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from '@headlessui/react'
import { StarIcon, CheckIcon } from '@heroicons/react/20/solid'
import { HeartIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline'

interface ProductDetailsProps {
  product: {
    name: string;
    price: string;
    rating: number;
    images: Array<{ id: number; name: string; src: string; alt: string }>;
    description: string;
    details: Array<{ name: string; items: string[] }>;
    colors?: Array<{ name: string; bgColor: string; selectedColor: string }>;
  };
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const [selectedColor, setSelectedColor] = useState(product.colors ? product.colors[0] : null)

  function classNames(...classes: (string | undefined | null | false)[]): string {
    return classes.filter(Boolean).join(' ')
  }

  return (
    <>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl divide-y divide-gray-200 border-t px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
            {/* Image gallery */}
            <TabGroup className="flex flex-col-reverse">
              {/* Image selector */}
              <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
                <TabList className="grid grid-cols-4 gap-6">
                  {product.images.map((image) => (
                    <Tab
                      key={image.id}
                      className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                    >
                      {({ selected }) => (
                        <>
                          <span className="sr-only">{image.name}</span>
                          <span className="absolute inset-0 overflow-hidden rounded-md">
                            <img
                              src={image.src}
                              alt=""
                              className="h-full w-full object-cover object-center"
                            />
                          </span>
                          <span
                            className={classNames(
                              selected ? 'ring-[#ff9e39] focus:ring-[#ff9e39]' : 'ring-transparent',
                              'pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2',
                            )}
                            aria-hidden="true"
                          />
                        </>
                      )}
                    </Tab>
                  ))}
                </TabList>
              </div>

              <TabPanels className="aspect-h-1 aspect-w-1 w-full">
                {product.images.map((image) => (
                  <TabPanel key={image.id}>
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="h-full w-full object-cover object-center sm:rounded-lg"
                    />
                  </TabPanel>
                ))}
              </TabPanels>
            </TabGroup>

            {/* Product info */}
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                {product.name}
              </h1>

              <div className="flex items-start justify-start">
                <div className="mr-8 mt-3">
                  <div className="font-semibold">Price per Person</div>
                  <p className="text-3xl font-medium tracking-tight text-[#ff9e39]">
                    {product.price}.00
                  </p>
                  <dd className="text-sm font-normal tracking-tight text-gray-500">
                    No Minimum Guests
                  </dd>
                </div>
                <div className="mt-3">
                  <div className="font-semibold">Days of Stay</div>
                  <p className="text-3xl font-medium tracking-tight text-[#ff9e39]">
                    5 Days
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="sr-only">Description</h3>

                <div
                  className="space-y-6 text-base text-gray-700"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              </div>

              <form className="mt-6">
                <div className="mt-10 flex">
                  <button
                    type="submit"
                    className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-[#ff9e39] px-8 py-3 text-base font-medium text-white hover:bg-[#b26e27] focus:outline-none focus:ring-2 focus:ring-[#ff9e39] focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
                  >
                    Book Now
                  </button>

                  <button
                    type="submit"
                    className="ml-4 flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent px-8 py-3 text-base font-medium text-[#ff9e39] ring-2 ring-[#ff9e39] hover:bg-warning-50 focus:outline-none focus:ring-2 focus:ring-[#ff9e39] focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
                  >
                    Customize
                  </button>
                </div>
              </form>

              <section aria-labelledby="details-heading" className="mt-12">
                <h2 id="details-heading" className="sr-only">
                  Additional details
                </h2>

                <div className="divide-y divide-gray-200 border-t">
                  {product.details.map((detail) => (
                    <Disclosure as="div" key={detail.name}>
                      {({ open }) => (
                        <>
                          <h3>
                            <DisclosureButton className="group relative flex w-full items-center justify-between py-6 text-left">
                              <span
                                className={classNames(
                                  open ? 'text-[#ff9e39]' : 'text-gray-900',
                                  'text-sm font-medium',
                                )}
                              >
                                {detail.name}
                              </span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusIcon
                                    className="block h-6 w-6 text-[#ff9e39] group-hover:text-[#ff9e39]"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <PlusIcon
                                    className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                            </DisclosureButton>
                          </h3>
                          <DisclosurePanel
                            as="div"
                            className="prose-sm prose pb-6"
                          >
                            <ul role="list">
                              {detail.items.map((item) => (
                                <li key={item}>{item}</li>
                              ))}
                            </ul>
                          </DisclosurePanel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center bg-white px-4 py-12 md:flex-row md:px-24">
        <div className="w-full md:w-full md:max-w-xl hover-zoom overflow-hidden">
          <img
            className="w-full object-cover object-center shadow-2xl"
            src="https://images.pexels.com/photos/380707/pexels-photo-380707.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
          />
        </div>
        <div className="z-10 mt-0 w-full bg-white px-10 shadow-md md:-ml-32 md:mt-0 md:w-full md:max-w-xl">
          <div className="relative space-y-6 px-6 py-16 text-left">
            <h2
              className="text-3xl font-semibold tracking-tight text-[#ff9e39]"
              id="join-heading"
            >
              DAY 1
            </h2>
            <p className="text-lg leading-none text-black">
              Arrive in South Korea
            </p>
            <p className="text-lg leading-none text-black">Registration</p>
            <p className="text-lg leading-none text-black">Breakfast</p>
            <p className="text-lg leading-none text-black">Lunch</p>
            <p className="text-lg leading-none text-black">Check In</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center bg-white px-4 py-12 md:flex-row-reverse md:px-24">
        <div className="w-full md:w-full md:max-w-xl hover-zoom overflow-hidden">
          <img
            className="w-full object-cover object-center shadow-2xl"
            src="https://images.pexels.com/photos/19271537/pexels-photo-19271537/free-photo-of-jagyeongjeon-palace-in-seoul-south-korea.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
          />
        </div>
        <div className="z-10 mt-0 w-full bg-white px-10 shadow-md md:-mr-32 md:mt-0 md:w-full md:max-w-xl">
          <div className="relative space-y-6 px-6 py-16 text-left">
            <h2
              className="text-3xl font-semibold tracking-tight text-[#ff9e39]"
              id="join-heading"
            >
              DAY 2
            </h2>
            <p className="text-lg leading-none text-black">
              Arrive in South Korea
            </p>
            <p className="text-lg leading-none text-black">Registration</p>
            <p className="text-lg leading-none text-black">Breakfast</p>
            <p className="text-lg leading-none text-black">Lunch</p>
            <p className="text-lg leading-none text-black">Check In</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center bg-white px-4 py-12 md:flex-row md:px-24">
        <div className="w-full md:w-full md:max-w-xl hover-zoom overflow-hidden">
          <img
            className="w-full object-cover object-center shadow-2xl"
            src="https://images.pexels.com/photos/11314621/pexels-photo-11314621.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
          />
        </div>
        <div className="z-10 mt-0 w-full bg-white px-10 shadow-md md:-ml-32 md:mt-0 md:w-full md:max-w-xl">
          <div className="relative space-y-6 px-6 py-16 text-left">
            <h2
              className="text-3xl font-semibold tracking-tight text-[#ff9e39]"
              id="join-heading"
            >
              DAY 3
            </h2>
            <p className="text-lg leading-none text-black">
              Arrive in South Korea
            </p>
            <p className="text-lg leading-none text-black">Registration</p>
            <p className="text-lg leading-none text-black">Breakfast</p>
            <p className="text-lg leading-none text-black">Lunch</p>
            <p className="text-lg leading-none text-black">Check In</p>
          </div>
        </div>
      </div>
    </>
  )
}
'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Navigation, Pagination } from 'swiper/modules'
import homebackground from '@/images/homebackground.jpg'
import ModalDialog from './ModalDialog'
import destinationsphoto from '@/images/img-aboutus.webp'
import { blogContents } from '@/constants/blogs'
import { useRouter } from 'next/navigation'
import { destinations } from '@/constants/destinations'
import MessengerIcon from './messenger-icon'
import PricingModal from './eSim'; 


const HeroSection = () => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [enabled, setEnabled] = useState(true)

  const handleBlogClick = (slug: string) => {
    router.push(`/inspirations/${slug}`)
  }

  const handleCardClick = (destination: string) => {
    router.push(
      `/destination/${destination.toLowerCase().replace(/\s+/g, '-')}`,
    )
  }


  useEffect(() => {
    setIsOpen(true)
  }, [])

  const closeModal = () => {
    setIsOpen(false)
  }

  return (

    <div>
       <MessengerIcon />
      <ModalDialog
        isOpen={isOpen}
        closeModal={closeModal}
        enabled={enabled}
        setEnabled={setEnabled}
      />


        <link 
          href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" 
          rel="stylesheet" 
        />
      <div className="relative isolate -mt-16 overflow-hidden py-28">
        <Image
          src={homebackground}
          alt=""
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="max-w-8xl mx-auto py-32 sm:py-48 lg:py-56">
          <div className="flex flex-col items-center px-12 py-16 text-center sm:px-24 sm:py-20 lg:px-28 lg:py-28">
            <h1 className="w-full font-poppinsSemiBold text-4xl tracking-tight text-white sm:text-7xl">
              OUR FAVOURITE EXPERIENCES
            </h1>
            <p className="bodySemiBold mt-6 text-lg leading-8 text-white">
              Wander to see Asia&apos;s Sanctuary
            </p>
            <p className="bodyRegular mt-0 text-lg text-white">
              Are you ready to experience Asia? Learn more about our exclusive
              tours and curated experiences.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="/experiences"
                className="rounded-md bg-[#ff9e39] px-16 py-4 text-sm font-semibold text-white shadow-sm hover:bg-[#ff9e39]"
              >
                Experience Asia
              </a>
            </div>
          </div>
        </div>
      </div>
{/* POPULAR DESTINATIONS */}
      <div className="bg-white" id="packages">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:pb-32 lg:max-w-7xl lg:px-8">
          <h2 className="mb-8 font-poppinsSemiBold text-center text-3xl tracking-tight text-gray-900 sm:text-4xl">
            Popular Destinations
          </h2>
          <div className="pb-16 sm:pb-0">
            <Swiper
                  modules={[Navigation, Pagination]}
                  pagination={{ clickable: true }}
                  spaceBetween={20}
                  slidesPerView={1}
                  navigation={{
                    nextEl: "#slider-button-right",
                    prevEl: "#slider-button-left",
                  }}
                  breakpoints={{
                    1024: { slidesPerView: 3, spaceBetween: 30 },
                    920: { slidesPerView: 2, spaceBetween: 25 },
                    700: { slidesPerView: 2, spaceBetween: 20 },
                  }}
                  className="slider-container"
                  >                  
              {destinations.map((destination) => (
                <SwiperSlide key={destination.name}>
                  <div
                    onClick={() => handleCardClick(destination.name)}
                    className="relative flex rounded-2xl h-[400px] w-full cursor-pointer flex-col overflow-hidden hover:opacity-95 md:h-[450px] lg:h-[450px]"
                  >
                    <Image
                      src={destination.imageSrc}
                      alt={destination.name}
                      className="h-full w-full object-cover"
                      width={600}
                      height={600}
                    />
                    <div className="absolute bottom-0 w-full bg-gradient-to-t from-black via-transparent p-4 text-white">
                      <h3 className="text-md font-bold">{destination.name}</h3>
                      <p className="text-sm">{destination.description}</p>
                      <div className="flex justify-between text-[#ff9e39]">
                        <span className="text-xs">STARTS FROM:</span>
                        <span className="text-xs font-bold">
                          Php{destination.price}/pax
                        </span>
                      </div>
                      <span className="my-4 flex items-center justify-center gap-x-6">
                        <span className="w-full max-w-80 rounded-md py-2.5 border-2 hover:border-[#ff9e39]  text-center text-sm font-semibold text-white shadow-sm  hover:ring-[#ff9e39] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400  hover:bg-[#ff9e39]">
                          VIEW DETAILS
                        </span>
                      </span>
                    </div>
                  </div>
                
                </SwiperSlide>
              ))}
              <div className="absolute left-0 top-[16rem] md:top-[19rem] z-10 transform -translate-y-1/2 bottom-0">
                  <div className="flex flex-col items-center justify-center gap-4">
                      <button id="slider-button-left" className="bg-[#ff9e39] hover:bg-[#ff9e39] hover:text-white border-2 border-[#ff9e39]  text-2xl rounded-full h-10 w-10 flex justify-center items-center text-white">
                          <i className='bx bx-chevron-left'></i>
                      </button>
                  </div>
              </div>
              <div className="absolute right-0 top-[16rem] md:top-[19rem] z-10 transform -translate-y-1/2 bottom-0">
                  <button id="slider-button-right" className="bg-[#ff9e39] hover:bg-[#ff9e39] hover:text-white border-2 border-[#ff9e39]  text-2xl rounded-full h-10 w-10 flex justify-center items-center text-white">
                  <i className='bx bx-chevron-right'></i>
                  </button>
              </div>
              <div className="swiper-pagination"></div>
            </Swiper>
          </div>
        </div>
      </div>
{/* COME TRAVEL WITH US SECTION */}
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
                    Come and Travel with Us
                  </p>
                  <p className="mt-6 text-lg leading-8 text-white text-justify">
                  Embark on a journey with us and meet Asia in its most authentic. awe-inspiring form. Let us show you the finest treasures of this diverse and stunning region-where every destination holds a new story, and every experience becomes a cherished memory.
                  </p>
                  <div className="mt-10 flex items-center justify-start gap-x-6">
                    <a
                      href="#"
                      className="w-full max-w-80 rounded-md bg-[#565555] py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-[#565555] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
                    >
                     View Details
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
{/* RECENT BLOGS SECTION */}
       <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
            <div className=" max-w-full text-left">     
              <h2 className="font-poppinsSemiBold text-center text-3xl tracking-tight text-gray-900 sm:text-4xl">
             Recent Blogs
              </h2>
            </div>
      
            <div className="mx-auto mt-16 grid max-w-7xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {blogContents.slice(0, 3).map((blog) => (
                <div
                  key={blog.id}
                  className="group overflow-hidden rounded-lg bg-white shadow-xl transition-all hover:shadow-2xl"
                >
                  {/* Image Container */}
                  <div className="relative h-64 w-full overflow-hidden">
                    <Image
                      src={blog.heroImage}
                      alt={blog.title}
                      className="h-full w-full object-cover"
                      width={500}
                      height={300}
                      priority
                    />
                  </div>
      
                  {/* Content */}
                  <div className="p-6">
                    {/* Date and Categories */}
                    <div className=" flex items-center gap-1.5 text-base text-gray-500">
                      <span className="text-black">{blog.date}</span>
                      <span>|</span>
                      {blog.categories.map((category, index) => (
                        <React.Fragment key={index}>
                          <span className="text-black">{category}</span>
                          {index < blog.categories.length - 1 && <span>,</span>}
                        </React.Fragment>
                      ))}
                    </div>
      
                    {/* Title */}
                    <h3 className="mb-1 mt-3 text-2xl font-semibold text-gray-900">
                      {blog.title}
                    </h3>
      
                    {/* Description */}
                    <p className="line-clamp-3 text-sm text-gray-600">
                      {blog.content.intro.text}
                    </p>
      
                    {/* Read More Link */}
                    <div className="flex flex-col gap-3">
                      <button
                        onClick={() => handleBlogClick(blog.slug)}
                        className="mb-3 text-left text-[#ff9e39] hover:underline"
                      >
                        Read More
                      </button>
                      <button
                        onClick={() => handleBlogClick(blog.slug)}
                        className="w-full rounded-md bg-[#ff9e39] px-4 py-2 text-center text-white transition-colors hover:bg-[#e88f33]"
                      >
                        Read More
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <h2 className="mt-2 font-poppinsSemiBold text-center text-3xl tracking-tight text-gray-900 sm:text-4xl">
            E-SIM
          </h2>
          <div> <PricingModal/></div>
          </div>
  
  )
}

export default HeroSection

'use client'
import React from 'react'
import { BuildingOffice2Icon } from '@heroicons/react/24/solid'
import worldMap from '@/images/world-map.png'
import Image from 'next/image'

export default function Map() {
  return (
    <div className="mx-auto max-w-7xl">
      <div className="relative">
        {/* World Map Background - Hidden on mobile, visible on desktop */}
        <div className="absolute inset-0 hidden opacity-40 lg:block">
          <Image
            src={worldMap}
            alt="World Map"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Content */}
        <div className="relative grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Left Column - Office Info */}
          <div className="flex items-center justify-center">
            <div>
              <div className="flex items-center justify-center gap-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#e02b20] bg-red-100">
                  <BuildingOffice2Icon className="h-4 w-4 text-red-500 " />
                </div>
                <h3 className="text-xl font-semibold">Our Office</h3>
              </div>
              <div className="mt-4 pl-14">
                <p>Berban Travel & Tours Co.</p>
                <p>No. 15, Arellano St.</p>
                <p>Malasiqui 2421, Pangasinan,</p>
                <p>Philippines</p>
              </div>
            </div>
          </div>

          {/* Right Column - Map */}
          <div className="overflow-hidden rounded-lg shadow-[0_0_20px_rgba(0,0,0,0.1)]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3840.5675912162944!2d120.41235731479453!3d15.889825988997492!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3391470c85c1721f%3A0x6c571ef1f29b5b4c!2sArellano%20St%2C%20Malasiqui%2C%20Pangasinan!5e0!3m2!1sen!2sph!4v1679890234567!5m2!1sen!2sph"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

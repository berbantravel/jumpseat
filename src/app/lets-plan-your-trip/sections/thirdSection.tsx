'use client'
import React from 'react'
import TeamMembers from '../components/member'
import Map from '../components/map'

export default function ThirdSection() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 bg-[#FCFCFC] px-12 py-16 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] sm:px-24 sm:py-20 lg:flex-row lg:gap-16 lg:px-28 lg:py-28">
      <div className="w-full text-center">
        <h3 className="text-xl font-semibold text-gray-900">Get to know us</h3>
        <h2 className="mb-6 text-3xl font-medium tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
          Our Team
        </h2>
        <div className="mb-6 h-[2px] w-56 justify-self-center bg-gray-300 "></div>
        <div className="mx-auto max-w-7xl">
          <TeamMembers />
          <Map />
        </div>
      </div>
    </div>
  )
}

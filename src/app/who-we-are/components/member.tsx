'use client'
import Image from 'next/image'
import React from 'react'
import { teamMembers } from '../team'

export default function TeamMembers() {
  return (
    <div className="mx-auto grid w-full grid-cols-1 justify-items-center gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {teamMembers.map((member) => (
        <div
          key={member.name}
          className="flex w-full max-w-[250px] flex-col items-center text-center"
        >
          <div className="shadow- relative h-40 w-40 overflow-hidden rounded-full bg-white">
            <Image
              src={member.image}
              alt={`${member.name}'s photo`}
              fill
              className="bg-transparent object-cover"
              sizes="160px"
            />
          </div>
          <h3 className="mt-6 text-base font-semibold text-gray-900">
            {member.name}
          </h3>
          <p className="text-sm text-gray-500">{member.role}</p>
        </div>
      ))}
    </div>
  )
}

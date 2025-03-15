'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import jumpseatIcon from '@/images/logos/jumpseat-icon.png'

// Add this interface to define the component props
interface GettingReadyProps {
  onNext: (data: any) => void;
}

export default function GettingReady({ onNext }: GettingReadyProps) {
  const [formValues, setFormValues] = useState({
    name: '',
    email: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formValues.name && formValues.email) {
      onNext(formValues);
    }
  };

  // Rest of your component remains the same
  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-6 text-3xl font-bold text-gray-900">
        Getting Ready
      </h1>

      {/* Rest of your component JSX */}
      <div className="mb-8">
        <div className="flex items-center gap-4">
          <Image
            src={jumpseatIcon}
            alt="Avatar"
            className="h-12 w-12 rounded-full border border-gray-500 p-1"
          />
          <div>
            <p className="text-black">
              Hi There! I'm Chrisse.{' '}
              <span className="font-semibold text-[#ff9e39]">
                LET'S PLAN YOUR TRIP!
              </span>
            </p>
          </div>
        </div>

        <p className="mt-4 text-black">
          Jumpseat is your avenue to the get through the most beautiful
          spots in Asia. There are plenty of places to see among the best
          spots in the region. Our travel associates&apos; and
          specialists&apos; expertise are blended towards discerning and
          adventurous travelers. If you are one of them, let&apos;s create
          a travel plan according to your taste.
        </p>

        <p className="mt-4 text-black">
          First of all, may I have your name and e-mail?
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formValues.name}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-[#ff9e39] focus:outline-none"
            required
          />
        </div>
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formValues.email}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-[#ff9e39] focus:outline-none"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-md bg-[#ff9e39] py-2 text-white hover:bg-[#ff9e39]/90"
        >
          Let&apos;s Start!
        </button>
      </form>
    </div>
  );
}
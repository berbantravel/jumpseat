'use client'
import Image from 'next/image'
import React from 'react'
import { useRouter } from 'next/navigation'
import { blogContents } from '@/constants/blogs'

export default function FirstSection() {
  const router = useRouter()

  const handleBlogClick = (slug: string) => {
    router.push(`/inspirations/${slug}`)
  }

  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xl text-gray-600">Articles about life and travels</p>
        <h2 className="mt-2 font-poppinsSemiBold text-3xl tracking-tight text-gray-900 sm:text-4xl">
          Read our collection of articles travelling
        </h2>
      </div>

      <div className="mx-auto mt-16 grid max-w-7xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {blogContents.map((blog) => (
          <div
            key={blog.id}
            className="group overflow-hidden rounded-lg bg-white shadow-md transition-all hover:shadow-xl"
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
              <div className="mb-3 flex items-center gap-2 text-sm text-gray-500">
                <span>{blog.date}</span>
                <span>|</span>
                {blog.categories.map((category, index) => (
                  <React.Fragment key={index}>
                    <span>{category}</span>
                    {index < blog.categories.length - 1 && <span>,</span>}
                  </React.Fragment>
                ))}
              </div>

              {/* Title */}
              <h3 className="mb-3 text-xl font-semibold text-gray-900">
                {blog.title}
              </h3>

              {/* Description */}
              <p className="mb-4 line-clamp-3 text-sm text-gray-600">
                {blog.content.intro.text}
              </p>

              {/* Read More Link */}
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => handleBlogClick(blog.slug)}
                  className="text-[#ff9e39] hover:underline"
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
  )
}

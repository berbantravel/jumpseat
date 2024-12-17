'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { blogContents } from '@/constants/blogs'
import InquiryModal from '../components/modal'
import ctaBackground from '@/images/cta-get-in-touch.jpg'

export default function BlogDetail({ params }: { params: { slug: string } }) {
  const router = useRouter()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const blog = blogContents.find((post) => post.slug === params.slug)

  if (!blog) {
    return <div>Blog post not found</div>
  }

  return (
    <>
      {/* Hero Section with Overlay */}
      <div className="relative isolate -mt-16 overflow-hidden py-28">
        <Image
          src={blog.heroImage}
          alt={blog.title}
          quality={80}
          priority
          className="absolute inset-0 -z-10 h-full w-full object-cover object-center"
          sizes="100vw"
          fill
        />
        <div className="absolute inset-0 -z-10 bg-black opacity-25"></div>

        <div className="mx-auto max-w-5xl py-32 sm:py-48 lg:py-56">
          <div className="mx-10 text-center">
            <h1 className="relative z-10 font-poppinsSemiBold text-5xl tracking-tight text-white sm:text-7xl">
              {blog.title}
            </h1>
            <p className="bodyRegular relative z-10 mt-4 text-lg text-white">
              {blog.readTime}
            </p>
          </div>
        </div>
      </div>

      {/* Diagonal Section */}
      <div className="-mt-14">
        <div className="relative flex h-40 w-full bg-transparent">
          <div className="flex h-full w-1/2 bg-transparent"></div>
          <div className="flex h-full w-1/2 bg-[#565555]"></div>
        </div>
        <div
          className=" relative isolate -mt-40 overflow-hidden bg-white py-28"
          style={{
            clipPath: 'polygon(50% 0%, 100% 2%, 100% 100%, 0 100%, 0 2%)',
            backgroundColor: '#ffffff',
          }}
        >
          {/* Content Section */}
          <div className="mx-auto max-w-7xl px-6 py-12">
            <div className="flex flex-col lg:flex-row lg:gap-12">
              {/* Main Content */}
              <div className="lg:w-4/5">
                {/* Back Button */}
                <button
                  onClick={() => router.back()}
                  className="mb-0 flex items-center text-gray-600 hover:text-gray-900 lg:mb-8"
                >
                  <svg
                    className="mr-2 h-5 w-5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M15 19l-7-7 7-7"></path>
                  </svg>
                  Back
                </button>

                {/* Blog Content */}
                <article className="prose-lg prose max-w-none">
                  {/* Intro Section */}
                  <h2 className="text-2xl font-bold">
                    {blog.content.intro.title}
                  </h2>
                  {Array.isArray(blog.content.intro.text) ? (
                    blog.content.intro.text.map((paragraph, index) => (
                      <p key={index} className="mt-4 text-gray-600">
                        {paragraph}
                      </p>
                    ))
                  ) : (
                    <p className="text-gray-600">{blog.content.intro.text}</p>
                  )}

                  {/* Hidden Destinations Section */}
                  <h2 className="mt-8 text-2xl font-bold">
                    {blog.content.hiddenDestinations.title}
                  </h2>
                  <p className="text-gray-600">
                    {blog.content.hiddenDestinations.text}
                  </p>
                  <ul className="mt-4 list-disc pl-6">
                    {blog.content.hiddenDestinations.places.map(
                      (place, index) => (
                        <li className="m-0" key={index}>
                          {place}
                        </li>
                      ),
                    )}
                  </ul>

                  {/* Food Section */}
                  <h2 className="mt-8 text-2xl font-bold">
                    {blog.content.food.title}
                  </h2>
                  <p className="text-gray-600">{blog.content.food.text}</p>
                  <ul className="mt-4 list-disc pl-6">
                    {blog.content.food.places.map((place, index) => (
                      <li className="m-0" key={index}>
                        {place}
                      </li>
                    ))}
                  </ul>

                  {/* Culture Section */}
                  <h2 className="mt-8 text-2xl font-bold">
                    {blog.content.culture.title}
                  </h2>
                  <p className="text-gray-600">{blog.content.culture.text}</p>

                  <h3 className="mt-6 text-xl font-semibold text-gray-800">
                    Structures:
                  </h3>
                  <ul className="mt-4 list-disc pl-6">
                    {blog.content.culture.structures.map((structure, index) => (
                      <li className="m-0" key={index}>
                        {structure}
                      </li>
                    ))}
                  </ul>

                  <h3 className="mt-6 text-xl font-semibold text-gray-800">
                    Festivals:
                  </h3>
                  <ul className="mt-4 list-disc pl-6">
                    {blog.content.culture.festivals.map((festival, index) => (
                      <li className="m-0" key={index}>
                        {festival}
                      </li>
                    ))}
                  </ul>

                  {/* Unique Section */}
                  <h2 className="mt-8 text-2xl font-bold">
                    {blog.content.unique.title}
                  </h2>
                  <p className="text-gray-600">{blog.content.unique.text}</p>
                  <ul className="mt-4 list-disc pl-6">
                    {blog.content.unique.activities.map((activity, index) => (
                      <li className="m-0" key={index}>
                        {activity}
                      </li>
                    ))}
                  </ul>

                  {/* Special Feature Section */}
                  <h2 className="mt-8 text-2xl font-bold">
                    {blog.content.specialFeature.title}
                  </h2>
                  <p className="text-gray-600">
                    {blog.content.specialFeature.text}
                  </p>

                  {/* Signature */}
                  <div className="mt-8">
                    <p className="font-handwriting m-0 text-xl italic text-gray-800">
                      Travelling Soon,
                    </p>
                    <p className="font-handwriting m-0 text-xl italic text-gray-800">
                      Jim and Chrisse
                    </p>
                  </div>
                </article>
              </div>

              {/* Sidebar */}
              <aside className="mt-8 lg:mt-0 lg:w-1/5">
                <div className="sticky top-8">
                  <h3 className="text-lg font-semibold">Recent Posts</h3>
                  <ul className="mt-4 space-y-4">
                    {blogContents.slice(0, 3).map((post) => (
                      <li key={post.id}>
                        <a
                          href={`/inspirations/${post.slug}`}
                          className="text-blue-600 hover:underline"
                        >
                          {post.title}
                        </a>
                      </li>
                    ))}
                  </ul>

                  <h3 className="mt-8 text-lg font-semibold">Archives</h3>
                  <ul className="mt-4 space-y-2">
                    <li>{blog.date}</li>
                  </ul>

                  <h3 className="mt-8 text-lg font-semibold">Categories</h3>
                  <ul className="mt-4 space-y-2">
                    {blog.categories.map((category, index) => (
                      <li key={index}>{category}</li>
                    ))}
                  </ul>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>

      {/* CTA BANNER */}
      <div className="relative isolate -mt-16 justify-items-center overflow-hidden">
        <Image
          src={ctaBackground}
          alt="Get in touch CTA"
          quality={100}
          priority
          className="absolute inset-0 -z-10 h-full w-full object-cover object-center"
          sizes="100vw"
          fill
        />
        <div className="max-w-full px-6 py-24 sm:py-36">
          <div className="flex flex-wrap items-center justify-center gap-12 self-center text-left lg:flex-row lg:flex-nowrap">
            <p className="max-w-4xl text-xl text-white">
              Still undecided and can&apos;t find what&apos;s your next
              destination? Answer our simple questionnaire. We can help you
              choose a remarkable travel experience that you&apos;ll surely
              enjoy.
            </p>
            <button
              className="w-2/3 rounded-full bg-[#ff9e39] px-4 py-4 text-base font-light text-white hover:bg-[#ff9e39] sm:px-24"
              onClick={() => setIsModalOpen(true)}
            >
              Fill out our inquiry form
            </button>
          </div>
        </div>
      </div>

      <InquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  )
}

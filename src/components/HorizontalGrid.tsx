'use client'

import Image from 'next/image'
import React, { useState } from 'react'
import { DiscoverDialog } from '@/components/dialogs'

import saveIcon from '@/images/logos/postfolio-logo-icon-01.png'

import { posts } from '@/constants/dummyData'
import { Post } from '@/types/models'

export default function HorizontalGrid() {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [expandedPosts, setExpandedPosts] = useState<{
    [key: number]: boolean
  }>({})

  const toggleExpand = (postId: number) => {
    setExpandedPosts((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }))
  }

  const handleOpenDialog = (
    post: Post
  ) => {
    setSelectedPost(post)
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    setSelectedPost(null)
  }

  const renderDescription = (post: Post) => {
    const maxLength = 200
    const isExpanded = expandedPosts[post.id]
    const shouldTruncate = post.description.length > maxLength

    if (isExpanded || !shouldTruncate) {
      return (
        <div>
          <div
            className="body2Regular mb-4 mt-2 space-y-4 text-text-black-primary"
            dangerouslySetInnerHTML={{
              __html: post.description,
            }}
          />
          {shouldTruncate && (
            <div className="flex justify-end">
              <button
                className="body2Regular mb-4 mt-2 space-y-4 text-gray-500"
                onClick={() => toggleExpand(post.id)}
              >
                See Less
              </button>
            </div>
          )}
        </div>
      )
    }

    const truncatedDescription = post.description.slice(0, maxLength) + '...'

    return (
      <div>
        <div
          className="body2Regular mb-4 mt-2 space-y-4 text-text-black-primary"
          dangerouslySetInnerHTML={{
            __html: truncatedDescription,
          }}
        />
        <div className="flex justify-end">
          <button
            className="body2Regular mb-4 mt-2 space-y-4 text-gray-500"
            onClick={() => toggleExpand(post.id)}
          >
            See More
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className='px-0 sm:px-10'>

        <div className="mt-0 sm:mt-6 bg-white mx-auto max-w-[1220px] rounded-lg px-6 py-4 shadow-sm">
          <div className='mb-8 mt-4'>
            <div className="mb-1 text-left pageTitleSemiBold block w-full text-text-black-primary mx-4 max-w-3xl sm:mx-auto sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-4 lg:px-8">
              Discover what&apos;s Trending
            </div>
            <div className="text-left heading2SemiBold block w-full text-text-black-primary mx-4 max-w-3xl sm:mx-auto sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-4 lg:px-8">
              Today&apos;s trending posts
            </div>
          </div>
          <div className="mb-8 mx-4 max-w-3xl sm:mx-auto sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-4 lg:px-8">

            {/* 1 GRID */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 mb-4 lg:mb-0 md:mb-4 sm:mb-4">
              {posts.slice(0, 1).map((post) => (
                <div
                  key={post.id}
                  className="relative flex flex-col h-full items-center rounded-lg bg-white shadow-md hover:shadow-lg focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400"
                  onClick={() => handleOpenDialog(post)}
                >
                  <div className="w-full cursor-pointer">
                    <Image
                      src={post.embedImageUrl}
                      alt="saved"
                      width={1000}
                      height={1000}
                      className='h-52 sm:h-72'
                      style={{
                        objectFit: 'cover',
                        objectPosition: 'center',
                        borderTopRightRadius: '8px',
                        borderTopLeftRadius: '8px',
                        width: '100%',
                      }}
                    />
                  </div>
                  <div className="flex-1 px-5 pb-4 w-full cursor-pointer">
                    <p className="bodySemiBold mb-2 mt-4 text-text-black-primary">{post.title}</p>
                    {renderDescription(post)}
                  </div>
                  <div className="flex justify-between items-center w-full px-5 pb-6 mt-auto">
                    <div>
                      <p className="captionMedium text-sm text-text-black-primary cursor-pointer">
                        {post.embedAuthor}
                      </p>
                      <div className="captionRegular text-text-black-secondary">
                        {post.platform}
                      </div>
                    </div>
                    <div className="flex items-center text-sm">
                      <span className="inline-flex items-center">
                        <button
                          type="button"
                          className="inline-flex items-center space-x-2 text-gray-400 hover:text-gray-500"
                        >
                          <Image
                            className="image-pop h-6 w-auto"
                            src={saveIcon}
                            alt="Your Company Icon"
                          />
                          <span className="captionRegular hidden text-sm text-text-black-primary md:flex">
                            Add to library
                          </span>
                        </button>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 4 GRID */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="relative flex flex-col h-full items-center rounded-lg bg-white shadow-md hover:shadow-lg focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400"
                  onClick={() => handleOpenDialog(post)}
                >
                  <div className="w-full cursor-pointer">
                    <Image
                      src={post.embedImageUrl}
                      alt="saved"
                      width={1000}
                      height={1000}
                      className='h-52 sm:h-36'
                      style={{
                        objectFit: 'cover',
                        objectPosition: 'center',
                        borderTopRightRadius: '8px',
                        borderTopLeftRadius: '8px',
                        width: '100%',
                      }}
                    />
                  </div>
                  <div className="flex-1 px-5 pb-4 w-full cursor-pointer">
                    <p className="sm:captionSemiBold sm:text-sm bodySemiBold mb-2 mt-4 text-text-black-primary">{post.title}</p>
                    <div className='flex sm:flex md:flex lg:hidden  xl:hidden'>
                      {renderDescription(post)}
                    </div>
                  </div>
                  <div className="flex justify-between items-center w-full px-5 pb-6 mt-auto">
                    <div>
                      <p className="captionMedium text-sm text-text-black-primary cursor-pointer">
                        {post.embedAuthor}
                      </p>
                      <div className="captionRegular text-text-black-secondary">
                        {post.platform}
                      </div>
                    </div>
                    <div className="flex items-center text-sm">
                      <span className="inline-flex items-center">
                        <button
                          type="button"
                          className="inline-flex items-center space-x-2 text-gray-400 hover:text-gray-500"
                        >
                          <Image
                            className="image-pop h-6 w-auto"
                            src={saveIcon}
                            alt="Your Company Icon"
                          />
                          <span className="captionRegular hidden text-sm text-text-black-primary sm:hidden md:flex lg:hidden  xl:flex">
                            Add to library
                          </span>
                        </button>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <DiscoverDialog
        isOpen={isDialogOpen}
        closeDialog={handleCloseDialog}
        post={selectedPost}
      />
    </>
  )
}

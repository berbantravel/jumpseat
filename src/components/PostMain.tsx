'use client'

import Image from 'next/image'
import React, { useState } from 'react'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'

import { posts } from '@/constants/dummyData'
import { Post } from '@/types/models'
import EmbedOrBookmark from '@/components/EmbedOrBookmark'
import { PostDialog } from '@/components/dialogs'
import {
  ArrowTopRightOnSquareIcon,
  EllipsisHorizontalIcon,
} from '@heroicons/react/20/solid'
import {
  HeartIcon,
  ChatBubbleLeftIcon,
  ArrowUturnRightIcon,
  FlagIcon,
  PlusIcon,
} from '@heroicons/react/24/outline'
import saveIcon from '@/images/logos/postfolio-logo-icon-01.png'
import Dropdown from '@/components/Dropdown'

function classNames(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

const getYouTubeThumbnail = (url: string): string => {
  const videoIdMatch = url.match(
    /(?:https?:\/\/(?:www\.)?youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|(?:https?:\/\/)?(?:www\.)?youtu\.be\/)([a-zA-Z0-9_-]{11})/,
  )
  if (videoIdMatch && videoIdMatch[1]) {
    const videoId = videoIdMatch[1]
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
  }
  return ''
}

const fetchThumbnailFromEmbedLink = (embedLink: string): string => {
  if (embedLink.includes('youtube')) {
    return getYouTubeThumbnail(embedLink)
  } else if (embedLink.includes('linkedin')) {
    return 'https://media-exp1.licdn.com/dms/image/C4E22AQFiL3_pE8PLFQ/feedshare-shrink_800/0/1610199522795?e=2147483647&v=beta&t=example' // Replace with actual logic to get LinkedIn image if available
  }
  return 'https://via.placeholder.com/1000'
}

const PostMain = () => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [scrollToComments, setScrollToComments] = useState<boolean>(false)
  const [expandedPosts, setExpandedPosts] = useState<{
    [key: number]: boolean
  }>({})

  const handleOpenDialog = (
    post: Post,
    shouldScrollToComments: boolean = false,
  ) => {
    setSelectedPost(post)
    setIsDialogOpen(true)
    setScrollToComments(shouldScrollToComments)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    setSelectedPost(null)
    setScrollToComments(false)
  }

  const toggleExpand = (postId: number) => {
    setExpandedPosts((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }))
  }

  const renderDescription = (post: Post) => {
    const maxLength = 200
    const isExpanded = expandedPosts[post.id]
    const shouldTruncate = post.description.length > maxLength

    if (isExpanded || !shouldTruncate) {
      return (
        <div>
          <div
            className="body2Regular mb-4 mt-2 space-y-4 px-8 text-text-black-primary"
            dangerouslySetInnerHTML={{
              __html: post.description,
            }}
          />
          {shouldTruncate && (
            <div className="flex justify-end">
              <button
                className="body2Regular mb-4 mt-2 space-y-4 px-8 text-gray-500"
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
          className="body2Regular mb-4 mt-2 space-y-4 px-8 text-text-black-primary"
          dangerouslySetInnerHTML={{
            __html: truncatedDescription,
          }}
        />
        <div className="flex justify-end">
          <button
            className="body2Regular mb-4 mt-2 space-y-4 px-8 text-gray-500"
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
      {posts.map((post) => (
        <div key={post.id} className="mb-4 mt-0">
          <ul role="list" className="mx-4 space-y-4 sm:mx-0">
            <li className="rounded-lg bg-white shadow">
              <div>
                <div className="flex space-x-3 px-8 pt-7">
                  <div className="h-10 w-10 flex-shrink-0 cursor-pointer rounded-full object-cover">
                    <Image
                      src={post.imageUrl}
                      alt="saved"
                      width={40}
                      height={40}
                      style={{
                        objectFit: 'cover',
                        objectPosition: 'center',
                        borderRadius: '50%',
                        flexShrink: 0,
                        width: '40px',
                        height: '40px',
                      }}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div>
                      <div className="body2Medium text-text-black-primary">
                        <a className="cursor-pointer" href={post.href}>
                          {post.name}
                        </a>
                      </div>
                      <div className="flex">
                        <div className="captionRegular flex cursor-pointer items-center justify-center text-text-black-secondary">
                          <a>
                            <p>{post.handle}</p>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-shrink-0 self-start">
                    <Dropdown
                      items={[
                        {
                          icon: <PlusIcon className="mr-3 h-5 w-5 text-secondary-base group-hover:text-gray-500" aria-hidden="true" />,
                          text: `Follow ${post.name}`,
                          onClick: () => console.log('Share clicked'),
                        },
                        {
                          icon: <FlagIcon className="mr-3 h-5 w-5 text-secondary-base group-hover:text-gray-500" aria-hidden="true" />,
                          text: 'Report Post',
                          onClick: () => console.log('Share clicked'),
                        },
                      ]}
                    />
                  </div>
                </div>
                <div className="captionMedium relative my-2 flex items-center text-left text-text-black-secondary">
                  <p className="captionRegular ml-8 mr-4 text-sm">
                    {post.date}
                  </p>
                  <div className="flex items-center">
                    <ArrowTopRightOnSquareIcon
                      className="h-5 w-5 text-primary-base"
                      aria-hidden="true"
                    />
                    <div className="captionMedium cursor-pointer text-sm text-primary-base">
                      <a href={post.embedLink}>Original Post</a>
                    </div>
                  </div>
                </div>
                <h2
                  id="question-title-"
                  className="body2Medium mb-2 mt-4 px-8 text-text-black-primary"
                >
                  {post.title}
                </h2>
              </div>
              {renderDescription(post)}
              <div className="min-w-0 flex-1 px-8 pb-6">
                <p className="captionMedium text-sm text-text-black-primary">
                  <a className="cursor-pointer">{post.embedAuthor}</a>
                </p>
                <div>
                  <div className="captionRegular text-text-black-secondary">
                    <a className="cursor-pointer">{post.platform}</a>
                  </div>
                </div>
              </div>
              <EmbedOrBookmark
                embedLink={post.embedLink}
                embedImageUrl={fetchThumbnailFromEmbedLink(post.embedLink)}
                embedAuthor={post.title}
                platform={post.description}
              />
              <div className="mt-6 flex justify-between space-x-8 px-8 pb-6">
                <div className="flex space-x-6">
                  <span className="inline-flex items-center text-sm">
                    <button
                      type="button"
                      className="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
                    >
                      <HeartIcon className=" h-6 w-6" aria-hidden="true" />
                      <span className="captionRegular text-sm text-text-black-primary">
                        {post.total_likes ?? 0}
                      </span>
                      <span className="sr-only">likes</span>
                    </button>
                  </span>
                  <span className="inline-flex items-center text-sm">
                    <button
                      type="button"
                      className="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
                      onClick={() => handleOpenDialog(post, true)}
                    >
                      <ChatBubbleLeftIcon
                        className="h-6 w-6"
                        aria-hidden="true"
                      />
                      <span className="captionRegular text-sm text-text-black-primary">
                        {post.total_comments ?? 0}
                      </span>
                      <span className="sr-only">replies</span>
                    </button>
                  </span>
                  <span className="inline-flex items-center text-sm">
                    <button
                      type="button"
                      className="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
                      onClick={() => handleOpenDialog(post, true)}
                    >
                      <ArrowUturnRightIcon
                        className="h-6 w-6"
                        aria-hidden="true"
                      />
                      <span className="sr-only">shares</span>
                    </button>
                  </span>
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
                      <span className="captionRegular hidden text-sm text-text-black-primary sm:flex">
                        Add to library
                      </span>
                    </button>
                  </span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      ))}

      <PostDialog
        isOpen={isDialogOpen}
        closeDialog={handleCloseDialog}
        post={selectedPost}
        scrollToComments={scrollToComments}
      />
    </>
  )
}

export default PostMain
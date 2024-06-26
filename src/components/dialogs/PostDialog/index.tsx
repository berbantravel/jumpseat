import React, { Fragment, useRef, useState, useEffect } from 'react'
import { Dialog, Transition, Menu } from '@headlessui/react'
import { PostDialogProps, Post } from '@/types/models'
import Image from 'next/image'

import CommentSection from '@/components/CommentSection'
import Dropdown from '@/components/Dropdown'
import {
  ArrowTopRightOnSquareIcon,
  EllipsisHorizontalIcon,
} from '@heroicons/react/20/solid'
import { XMarkIcon } from '@heroicons/react/24/outline'
import {
  HeartIcon,
  ChatBubbleLeftIcon,
  ArrowUturnRightIcon,
  PlusIcon,
  FlagIcon,
} from '@heroicons/react/24/outline'
import saveIcon from '@/images/logos/postfolio-logo-icon-01.png'

function classNames(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

const PostDialog: React.FC<PostDialogProps> = ({ isOpen, closeDialog, post, scrollToComments, }) => {
  const cancelButtonRef = useRef(null)
  const commentSectionRef = useRef<HTMLDivElement>(null)
  const [expandedPosts, setExpandedPosts] = useState<{ [key: number]: boolean }>({})

  useEffect(() => {
    if (scrollToComments && isOpen) {
      setTimeout(() => {
        commentSectionRef.current?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }
  }, [scrollToComments, isOpen])

  useEffect(() => {
    if (post) {
      setExpandedPosts((prev) => ({ ...prev, [post.id]: true }))
    }
  }, [post])

  const handleScrollToComments = () => {
    commentSectionRef.current?.scrollIntoView({ behavior: 'smooth' })
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
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        initialFocus={cancelButtonRef ? cancelButtonRef : undefined}
        onClose={closeDialog}
      >
        <div style={{ display: 'none' }} ref={cancelButtonRef}></div>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-50 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative mx-0 my-0 max-w-3xl transform overflow-hidden rounded-lg bg-white pb-4 pt-5 text-left shadow-xl transition-all sm:mx-4 sm:my-4 sm:w-full">
                {post && (
                  <div key={post.id} className="mb-4 mt-0">
                    <ul role="list" className="space-y-4">
                      <li className="rounded-lg bg-white">
                        <div>
                          <div className="flex space-x-3 px-8 pt-3">
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
                                  <a
                                    className="cursor-pointer"
                                    href={post.href}
                                  >
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

                            <div className="flex flex-shrink-0 items-start">
                              <div className="relative mr-4 inline-block text-left">
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
                              <div className="relative  flex items-center">
                                <XMarkIcon
                                  className="h-5 w-5 cursor-pointer"
                                  aria-hidden="true"
                                  onClick={closeDialog}
                                />
                              </div>
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
                        <div className="flex-shrink-0 cursor-pointer">
                          <Image
                            src={post.embedImageUrl}
                            alt="saved"
                            width={1000}
                            height={1000}
                            style={{
                              objectFit: 'cover',
                              objectPosition: 'center',
                            }}
                          />
                        </div>
                        <div className="mt-6 flex justify-between space-x-8 px-8 pb-6">
                          <div className="flex space-x-6">
                            <span className="inline-flex items-center text-sm">
                              <button
                                type="button"
                                className="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
                              >
                                <HeartIcon
                                  className=" h-6 w-6"
                                  aria-hidden="true"
                                />
                                <span className="captionRegular text-sm text-text-black-primary">
                                  {post.total_likes}
                                </span>
                                <span className="sr-only">likes</span>
                              </button>
                            </span>
                            <span className="inline-flex items-center text-sm">
                              <button
                                type="button"
                                className="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
                                onClick={handleScrollToComments}
                              >
                                <ChatBubbleLeftIcon
                                  className="h-6 w-6"
                                  aria-hidden="true"
                                />
                                <span className="captionRegular text-sm text-text-black-primary">
                                  {post.total_comments}
                                </span>
                                <span className="sr-only">replies</span>
                              </button>
                            </span>
                            <span className="inline-flex items-center text-sm">
                              <button
                                type="button"
                                className="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
                                onClick={handleScrollToComments}
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
                                <span className="captionRegular text-sm text-text-black-primary">
                                  Add to library
                                </span>
                              </button>
                            </span>
                          </div>
                        </div>
                      </li>
                    </ul>
                    <div className="mx-8 max-w-2xl md:mx-auto">
                      <div className="mb-4 flex items-center justify-between">
                        <h2 className="heading2SemiBold text-secondary-base">
                          Notes
                        </h2>
                      </div>
                      <p className="body2Regular text-secondary-base">
                        {post.notes}
                      </p>
                    </div>
                  </div>
                )}
                <div ref={commentSectionRef}>
                  <CommentSection comments={post?.comments ?? []} />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default PostDialog

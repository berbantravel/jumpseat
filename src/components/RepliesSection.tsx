'use client'

import Image, { type ImageProps } from 'next/image'
import React, { useState } from 'react'
import { Fragment } from 'react'

import { Menu, Transition } from '@headlessui/react'
import ReplyForm from './ReplyForm'

import {
  EllipsisHorizontalIcon,
  ArrowUturnLeftIcon,
} from '@heroicons/react/20/solid'
import {
  HeartIcon,
  FlagIcon,
} from '@heroicons/react/24/outline'

import { RepliesSectionProps, Reply } from '@/types/models'

function classNames(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

const RepliesSection: React.FC<RepliesSectionProps> = ({
  onClose,
  isOpen,
  comment,
}) => {
  const [replies, setReplies] = useState<Reply[] | null>(null)

  const [openReplies, setOpenReplies] = useState<{ [key: string]: boolean }>({})

  const toggleReplies = (id: string) => {
    setOpenReplies((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <>
      {isOpen &&
        comment.replies.map((reply) => (
          <article
            key={reply.id}
            className="bg-white pb-6 text-base dark:bg-gray-900"
          >
            <footer className="ml-12 flex items-center justify-between">
              <div className="flex items-center">
                <div className="mr-2 h-10 w-10 flex-shrink-0 cursor-pointer rounded-full  object-cover">
                  <Image
                    src={reply.imageUrl}
                    alt="saved"
                    width={40}
                    height={40}
                    style={{
                      objectFit: 'cover',
                      objectPosition: 'center',
                      borderRadius: '50%',
                      flexShrink: 0,
                      width: '33px',
                      height: '33px',
                    }}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div>
                    <div className="body2Medium text-text-black-primary">
                      <a className="cursor-pointer">{reply.author}</a>
                    </div>
                  </div>
                </div>
              </div>

              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="flex items-center rounded-full text-text-black-secondary hover:text-text-black-primary">
                    <span className="sr-only">Open options</span>
                    <EllipsisHorizontalIcon
                      className="h-5 w-5"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active
                                ? 'bg-gray-100 text-gray-900'
                                : 'text-gray-700',
                              'captionRegular flex items-center px-4 py-2 text-sm text-secondary-base',
                            )}
                          >
                            <FlagIcon
                              className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                              aria-hidden="true"
                            />
                            Report
                          </a>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </footer>

            <p className="body2Regular mx-12 py-2 pl-12 text-secondary-base">
              {reply.content_text}
            </p>

            <div className="mx-24 mt-4 flex items-center space-x-4">
              <button
                type="button"
                className="body2Medium flex items-center text-secondary-base"
              >
                <HeartIcon
                  className=" mr-2 h-6 w-6 hover:fill-danger-500 hover:text-danger-500"
                  aria-hidden="true"
                />
                {reply.likes}
              </button>
              <button
                type="button"
                className="body2Medium body2Medium flex items-center rounded-full py-2 pl-3 pr-3 text-secondary-base hover:bg-secondary-background"
                onClick={() => toggleReplies(`reply-${reply.id}`)}
              >
                <ArrowUturnLeftIcon
                  className=" mr-2 h-6 w-6 text-text-black-secondary hover:text-text-black-primary"
                  aria-hidden="true"
                />
                Reply
              </button>
            </div>
            <div className="ml-12">
              {openReplies[`reply-${reply.id}`] && (
                <ReplyForm onClose={() => toggleReplies(`reply-${reply.id}`)} />
              )}
            </div>
          </article>
        ))}
    </>
  )
}

export default RepliesSection

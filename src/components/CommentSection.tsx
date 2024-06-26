'use client'

import Image, { type ImageProps } from 'next/image'
import React, { useState } from 'react'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { Comment } from '@/types/models'

import {
  EllipsisHorizontalIcon,
  ArrowUturnLeftIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@heroicons/react/20/solid'
import { HeartIcon, FlagIcon } from '@heroicons/react/24/outline'

import ReplyForm from './ReplyForm'
import RepliesSection from './RepliesSection'
import SolidButton from '@/components/base/SolidButton'
import Dropdown from '@/components/Dropdown'


function classNames(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

const CommentSection = ({ comments }: { comments: Comment[] }) => {
  const [openReplies, setOpenReplies] = useState<{ [key: string]: boolean }>({})
  const [openRepliesSection, setOpenRepliesSection] = useState<{ [key: string]: boolean }>({})
  const [commentsToShow, setCommentsToShow] = useState<number>(5);


  const toggleReplies = (id: string) => {
    setOpenReplies((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const toggleRepliesSection = (id: string) => {
    setOpenRepliesSection((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const handleShowMoreComments = () => {
    setCommentsToShow((prev) => prev + 5);
  };

  return (
    <>
      <section className="bg-white px-2 py-8 dark:bg-gray-900">
        <div className="mx-8 max-w-2xl md:mx-auto">
          <div className="my-6 flex items-center justify-center text-center">
            <h2 className="heading2SemiBold text-secondary-base">{comments.length} Comments</h2>
          </div>

          <form className="mb-6">
            <div className="mb-4 rounded-lg rounded-t-lg border border-gray-200 bg-white px-4 py-4 dark:border-gray-700 dark:bg-gray-800">
              <div className="sr-only">Your comment</div>
              <textarea
                id="comment"
                className="body2Regular h-36 w-full border-0 px-0 text-sm text-text-black-secondary focus:outline-none focus:ring-0"
                placeholder="Write a comment..."
                required
              ></textarea>
            </div>
            <SolidButton className='mt-2 items-center space-x-2 rounded-full px-8 w-auto' type="submit">
              Post Comment
            </SolidButton>
          </form>

          {comments.slice(0, commentsToShow).map((comment) => (
            <div key={comment.id}>
              <article className="rounded-lg bg-white py-6 text-base dark:bg-gray-900">
                <footer className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="mr-2 h-10 w-10 flex-shrink-0 cursor-pointer rounded-full object-cover">
                      <Image
                        src={comment.imageUrl}
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
                          <a className="cursor-pointer">{comment.author}</a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Dropdown
                    items={[
                      {
                        icon: <FlagIcon className="mr-3 h-5 w-5 text-secondary-base group-hover:text-gray-500" aria-hidden="true" />,
                        text: 'Report',
                        onClick: () => console.log('Reported'),
                      },
                    ]}
                  />

                </footer>

                <p className="body2Regular py-2 pl-12 text-secondary-base">
                  {comment.content_text}
                </p>

                <div className="ml-12 mt-4 flex items-center space-x-4">
                  <button
                    type="button"
                    className="body2Medium flex items-center py-2 text-secondary-base"
                  >
                    <HeartIcon
                      className=" mr-2 h-6 w-6 hover:fill-danger-500 hover:text-danger-500"
                      aria-hidden="true"
                    />
                    {comment.likes}
                  </button>
                  <button
                    type="button"
                    className="body2Medium body2Medium flex items-center rounded-full py-2 pl-3 pr-3 text-secondary-base hover:bg-secondary-background"
                    onClick={() => toggleReplies(`comment-${comment.id}`)}
                  >
                    <ArrowUturnLeftIcon
                      className=" mr-2 h-6 w-6 text-text-black-secondary hover:text-text-black-primary"
                      aria-hidden="true"
                    />
                    Reply
                  </button>
                </div>
                {openReplies[`comment-${comment.id}`] && (
                  <ReplyForm
                    onClose={() => toggleReplies(`comment-${comment.id}`)}
                  />
                )}

                <button
                  type="button"
                  className="body2Medium mx-12 mt-4 flex items-center rounded-full py-2 pl-2 pr-4 text-primary-base hover:bg-primary-background"
                  onClick={() => toggleRepliesSection(`comment-${comment.id}`)}
                >
                  {openRepliesSection[`comment-${comment.id}`] ? (
                    <ChevronUpIcon className="mr-2 h-5 w-5" />
                  ) : (
                    <ChevronDownIcon className="mr-2 h-5 w-5" />
                  )}
                  {comment.replies.length}{' '}
                  {comment.replies.length === 1 ? 'Reply' : 'Replies'}
                </button>
              </article>

              {openRepliesSection[`comment-${comment.id}`] && (
                <RepliesSection
                  onClose={() => toggleRepliesSection(`comment-${comment.id}`)}
                  isOpen={openRepliesSection[`comment-${comment.id}`]}
                  comment={comment}
                />
              )}
            </div>
          ))}

          {commentsToShow < comments.length && (
            <button
              type="button"
              className="bodyMedium body2Medium flex items-center rounded-full py-2 pl-3 pr-3 text-gray-600 hover:bg-secondary-background"
              onClick={handleShowMoreComments}
            >
              Show more comments
            </button>
          )}
        </div>

      </section>
    </>
  )
}

export default CommentSection

import React, { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { SharePostDialogProps } from '@/types/models'
import Image from 'next/image'
import { Square2StackIcon } from '@heroicons/react/24/outline'
import { Link as LinkIcon, Facebook, Linkedin } from 'react-feather'
import EmptyDialogContainer from '../EmptyDialogContainer'

const SharePostDialog: React.FC<SharePostDialogProps> = ({
  isOpen,
  closeDialog,
  post,
}) => {
  const cancelButtonRef = useRef(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  return (
    <EmptyDialogContainer
      isOpen={isOpen}
      closeDialog={closeDialog}
      title="Share Post"
    >
      <div className="mt-3 px-7 text-left sm:mt-5">
        <div className="mt-2">
          <div>
            {post && (
              <div className="col-span-full mb-2">
                <h2
                  id="question-title-"
                  className="heading2SemiBold mx-4 mb-2 text-text-black-primary"
                >
                  {post.title}
                </h2>
                <div className="mx-4 flex min-w-0 ">
                  <p className="captionMedium mr-1 text-sm text-text-black-primary">
                    <a className="cursor-pointer">
                      <span className="captionRegular text-sm">By</span>{' '}
                      {post.embedAuthor}
                    </a>
                  </p>
                  <div>
                    <div className="captionRegular text-sm text-text-black-secondary">
                      <a className="cursor-pointer">
                        <span className="captionSemiBold mr-1">.</span>
                        {post.platform}
                      </a>
                    </div>
                  </div>
                </div>
                <div className="my-4 w-full cursor-pointer px-2 sm:px-10">
                  <Image
                    src={post.embedImageUrl}
                    alt="saved"
                    width={1000}
                    height={1000}
                    className="h-60"
                    style={{
                      objectFit: 'cover',
                      objectPosition: 'center',
                      borderRadius: '8px',
                      width: '100%',
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="mt-8 flex justify-center border-t-2 pt-4">
        <div className="flex space-x-14 sm:space-x-24">
          <span className="inline-flex items-center text-sm">
            <button
              type="button"
              className="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
            >
              <Square2StackIcon className=" h-6 w-6" aria-hidden="true" />
            </button>
          </span>
          <span className="inline-flex items-center text-sm">
            <button
              type="button"
              className="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
            >
              <Facebook className="h-6 w-6" aria-hidden="true" />
            </button>
          </span>
          <span className="inline-flex items-center text-sm">
            <button
              type="button"
              className="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
            >
              <Linkedin className="h-6 w-6" aria-hidden="true" />
            </button>
          </span>
        </div>
      </div>
    </EmptyDialogContainer>
  )
}

export default SharePostDialog
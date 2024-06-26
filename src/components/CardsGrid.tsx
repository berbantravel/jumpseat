'use client'

import { Fragment, useEffect, useState } from 'react'
import Image from 'next/image'
import { Menu, Transition } from '@headlessui/react'

import Dropdown from '@/components/Dropdown'
import { posts } from '@/constants/dummyData'
import { Post } from '@/types/models'
import { DiscoverDialog } from '@/components/dialogs'
import { DeleteConfirmationDialog } from '@/components/dialogs'
import { AddToCategoryDialog } from '@/components/dialogs'
import {
  ArrowTopRightOnSquareIcon,
  EllipsisHorizontalIcon,
  PlusIcon,
  FlagIcon,
  TrashIcon,
  ArrowUpOnSquareIcon,
  ArchiveBoxIcon,
  BookmarkIcon,
  UserPlusIcon,
  PlusCircleIcon,
} from '@heroicons/react/24/outline'

export default function CardsGrid() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [expandedPosts, setExpandedPosts] = useState<{ [key: number]: boolean }>({})
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [isAddToCategoryOpen, setIsAddToCategoryOpen] = useState(false)
  const [isClient, setIsClient] = useState(false)

  const handleOpenDialog = (post: Post) => {
    setSelectedPost(post)
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    setSelectedPost(null)
  }
  const openDeleteDialog = () => setIsDeleteOpen(true)
  const closeDeleteDialog = () => setIsDeleteOpen(false)
  const closeAddToCategoryDialog = () => setIsAddToCategoryOpen(false)
  const openAddToCategoryDialog = () => setIsAddToCategoryOpen(true)

  useEffect(() => {
    setIsClient(true)
  }, [])

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

  function classNames(
    ...classes: (string | undefined | null | false)[]
  ): string {
    return classes.filter(Boolean).join(' ')
  }

  return (
    <>
      <div className="px-0 sm:px-0">
        <div className="mx-auto mt-0 max-w-[1220px] rounded-lg bg-white px-0 py-0 sm:mt-0">
          <div className="mx-4 mb-8 max-w-5xl sm:mx-auto sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-1 lg:gap-4 lg:px-0">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="relative flex h-full flex-col items-center rounded-lg bg-white shadow-md hover:border-gray-400 hover:shadow-lg"
                >
                  <div
                    className="w-full cursor-pointer"
                    onClick={() => handleOpenDialog(post)}
                  >
                    <Image
                      src={post.embedImageUrl}
                      alt="saved"
                      width={1000}
                      height={1000}
                      className="h-52 sm:h-36"
                      style={{
                        objectFit: 'cover',
                        objectPosition: 'center',
                        borderTopRightRadius: '8px',
                        borderTopLeftRadius: '8px',
                        width: '100%',
                      }}
                    />
                  </div>
                  <div
                    className="w-full flex-1 cursor-pointer px-5 pb-4"
                    onClick={() => handleOpenDialog(post)}
                  >
                    <p className="sm:captionSemiBold bodySemiBold mb-2 mt-4 text-text-black-primary sm:text-sm">
                      {post.title}
                    </p>
                    {isClient && (
                      <div className="flex sm:flex md:flex lg:hidden xl:hidden">
                        {renderDescription(post)}
                      </div>
                    )}
                  </div>
                  <div className="mt-auto flex w-full items-center justify-between px-5 pb-6">
                    <div>
                      <p className="captionMedium cursor-pointer text-sm text-text-black-primary">
                        {post.embedAuthor}
                      </p>
                      <div className="captionRegular text-text-black-secondary">
                        {post.platform}
                      </div>
                    </div>
                    <div className="flex items-center text-sm">
                      <span className="inline-flex items-center">
                        {isClient && (
                          <Dropdown
                            items={[
                              {
                                icon: <TrashIcon className="mr-3 h-5 w-5 text-secondary-base group-hover:text-gray-500" aria-hidden="true" />,
                                text: 'Delete',
                                onClick: openDeleteDialog,
                              },
                              {
                                icon: <ArrowUpOnSquareIcon className="mr-3 h-5 w-5 text-secondary-base group-hover:text-gray-500" aria-hidden="true" />,
                                text: 'Share',
                                onClick: () => console.log('Share clicked'),
                              },
                              {
                                icon: <ArchiveBoxIcon className="mr-3 h-5 w-5 text-secondary-base group-hover:text-gray-500" aria-hidden="true" />,
                                text: 'Archive',
                                onClick: () => console.log('Archive clicked'),
                              },
                              {
                                icon: <BookmarkIcon className="mr-3 h-5 w-5 text-secondary-base group-hover:text-gray-500" aria-hidden="true" />,
                                text: 'Add to category',
                                onClick: openAddToCategoryDialog,
                              },
                            ]}
                          />
                        )}
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
      <DeleteConfirmationDialog
        isOpen={isDeleteOpen}
        closeDialog={closeDeleteDialog}
      ></DeleteConfirmationDialog>
      <AddToCategoryDialog
        isOpen={isAddToCategoryOpen}
        closeDialog={closeAddToCategoryDialog}
      ></AddToCategoryDialog>
    </>
  )
}
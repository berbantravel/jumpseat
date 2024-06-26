import React, { Fragment, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Menu, Transition } from '@headlessui/react'
import { DiscoverDialog, DeleteConfirmationDialog, AddToCategoryDialog } from '@/components/dialogs'
import { categorieslist } from '@/constants/dummyData'
import { Post } from '@/types/models'
import { EllipsisHorizontalIcon, TrashIcon, ArrowUpOnSquareIcon, ArchiveBoxIcon, BookmarkIcon } from '@heroicons/react/24/outline'
import Dropdown from '@/components/Dropdown'

export default function CategoriesCardsGrid() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [expandedPosts, setExpandedPosts] = useState<{ [key: number]: boolean }>({})
  const [isClient, setIsClient] = useState(false)

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const openDeleteDialog = () => setIsDeleteOpen(true);
  const closeDeleteDialog = () => setIsDeleteOpen(false);

  const [isAddToCategoryOpen, setIsAddToCategoryOpen] = useState(false);

  const openAddToCategoryDialog = () => setIsAddToCategoryOpen(true);
  const closeAddToCategoryDialog = () => setIsAddToCategoryOpen(false);

  useEffect(() => {
    setIsClient(true)
  }, [])

  const toggleExpand = (postId: number) => {
    setExpandedPosts((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }))
  }

  const handleOpenDialog = (post: Post) => {
    setSelectedPost(post)
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    setSelectedPost(null)
  }

  const redirectMyLibrary = () => {
    window.location.href = '/my-library'
  }

  const renderDescription = (post: Post) => {
    const maxLength = 50
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
      <div className='px-0 sm:px-0'>
        <div className="mt-0 sm:mt-3 bg-white mx-auto max-w-[1220px] rounded-lg px-0 py-0">
          <div className="mb-8 mx-4 max-w-5xl sm:mx-auto sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-1 lg:gap-4 lg:px-0">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
              {categorieslist.map((category) => (
                <div
                  key={category.id}
                  className="relative flex flex-col h-full items-center rounded-lg bg-white shadow-md hover:shadow-lg hover:border-gray-400"
                >
                  <Link href={'/my-library'} onClick={redirectMyLibrary} className="w-full cursor-pointer">
                    <Image
                      src={category.embedImageUrl}
                      alt="saved"
                      width={1000}
                      height={1000}
                      className='h-52 sm:h-40'
                      style={{
                        objectFit: 'cover',
                        objectPosition: 'center',
                        borderTopRightRadius: '8px',
                        borderTopLeftRadius: '8px',
                        width: '100%',
                      }}
                    />
                  </Link>
                  <Link href={'/my-library'} onClick={redirectMyLibrary} className="flex-1 px-5 pb-4 w-full cursor-pointer">
                    <p className=" bodySemiBold mb-2 mt-4 text-text-black-primary">{category.title}</p>
                    <div className='flex'>
                      {category.description}
                    </div>
                  </Link>
                  <div className="flex justify-between items-center w-full px-5 pb-6 mt-auto">
                    <div>
                      <p className="captionLight text-sm text-text-black-primary cursor-pointer">
                        {category.comments.length} Posts
                      </p>
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
      <DiscoverDialog isOpen={isDialogOpen} closeDialog={handleCloseDialog} post={selectedPost} />
      <DeleteConfirmationDialog isOpen={isDeleteOpen} closeDialog={closeDeleteDialog} />
      <AddToCategoryDialog isOpen={isAddToCategoryOpen} closeDialog={closeAddToCategoryDialog} />
    </>
  )
}

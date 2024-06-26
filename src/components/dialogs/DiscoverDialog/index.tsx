import React, { Fragment, useRef, useState, useEffect } from 'react'
import { Dialog, Transition, Menu, Popover } from '@headlessui/react'
import dynamic from 'next/dynamic'
import Image from 'next/image'

import Dropdown from '@/components/Dropdown'
import { DiscoverDialogProps, Post } from '@/types/models'
import { posts } from '@/constants/dummyData'
import CommentSection from '@/components/CommentSection'
import { SharePostDialog } from '@/components/dialogs'
import EmbedDiv from '@/components/EmbedDiv'
import {
  XMarkIcon,
  Bars3Icon,
  BellIcon,
  Cog8ToothIcon,
  ArchiveBoxIcon,
  TrashIcon,
  ArrowUpOnSquareIcon,
  EyeSlashIcon,
  ArrowLeftIcon,
  ArrowTopRightOnSquareIcon,
  EllipsisVerticalIcon,
} from '@heroicons/react/24/outline'
import saveIcon from '@/images/logos/postfolio-logo-icon-01.png'

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

const DiscoverDialog: React.FC<DiscoverDialogProps> = ({
  isOpen,
  closeDialog,
  post,
}) => {
  const cancelButtonRef = useRef(null)
  const commentSectionRef = useRef<HTMLDivElement>(null)
  const [expandedPosts, setExpandedPosts] = useState<{
    [key: number]: boolean
  }>({})
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const ReactPlayer = dynamic(() => import('react-player'), { ssr: false })

  useEffect(() => {
    if (post) {
      setExpandedPosts((prev) => ({ ...prev, [post.id]: true }))
    }
  }, [post])

  const toggleExpand = (postId: number) => {
    setExpandedPosts((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }))
  }

  const handleOpenDialog = () => {
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
  }

  const renderDescription = (post: Post) => {
    const maxLength = 200
    const isExpanded = expandedPosts[post.id]
    const shouldTruncate = post.description.length > maxLength

    if (isExpanded || !shouldTruncate) {
      return (
        <div>
          <div
            className="body2Regular mx-8 mb-4 mt-2 space-y-4 text-text-black-primary"
            dangerouslySetInnerHTML={{
              __html: post.description,
            }}
          />
          {shouldTruncate && (
            <div className="flex justify-end">
              <button
                className="body2Regular mx-8 mb-4 mt-2 space-y-4 text-gray-500"
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
          className="body2Regular mx-8 mb-4 mt-2 space-y-4 text-text-black-primary"
          dangerouslySetInnerHTML={{
            __html: truncatedDescription,
          }}
        />
        <div className="flex justify-end">
          <button
            className="body2Regular mx-8 mb-4 mt-2 space-y-4 text-gray-500"
            onClick={() => toggleExpand(post.id)}
          >
            See More
          </button>
        </div>
      </div>
    )
  }

  const userNavigation = [
    { name: 'Light', href: '#' },
    { name: 'Dark', href: '#' },
    { name: 'System', href: '#' },
  ]

  function classNames(
    ...classes: (string | undefined | null | false)[]
  ): string {
    return classes.filter(Boolean).join(' ')
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

        <div className="fixed inset-0 z-10 w-full overflow-y-auto bg-white">
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
              <Dialog.Panel className="relative mx-0 my-0  w-full transform overflow-hidden rounded-lg bg-white pb-4 text-left transition-all">
                <>
                  <Popover
                    as="header"
                    className={({ open }) =>
                      classNames(
                        open ? 'fixed inset-0 z-40 overflow-y-auto' : '',
                        'bg-white lg:static lg:overflow-y-visible',
                      )
                    }
                  >
                    {({ open }) => (
                      <>
                        <div className="mx-auto mt-8 max-w-7xl px-4 sm:px-6 lg:px-8">
                          <div className="relative flex justify-between lg:gap-8 xl:grid xl:grid-cols-12">
                            <div className="flex lg:static xl:col-span-5">
                              <div
                                className="flex flex-shrink-0 items-center"
                                onClick={closeDialog}
                              >
                                <a href="#">
                                  <ArrowLeftIcon
                                    className="h-8 w-8 text-secondary-base"
                                    aria-hidden="true"
                                  />
                                </a>
                              </div>
                            </div>
                            <div className="flex lg:items-center lg:justify-end xl:col-span-7">
                              <Menu
                                as="div"
                                className="relative ml-5 flex-shrink-0"
                              >
                                <div>
                                  <Menu.Button className="bodyMedium relative flex items-center justify-center rounded-full bg-white text-secondary-base">
                                    <span className="absolute -inset-1.5" />
                                    <span className="sr-only">
                                      Open user menu
                                    </span>
                                    <Cog8ToothIcon
                                      className="mr-2 h-8 w-8 text-secondary-base"
                                      aria-hidden="true"
                                    />
                                    Settings
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
                                  <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    {userNavigation.map((item) => (
                                      <Menu.Item key={item.name}>
                                        {({ active }) => (
                                          <a
                                            href={item.href}
                                            className={classNames(
                                              active ? 'bg-gray-100' : '',
                                              'block px-4 py-2 text-sm text-gray-700',
                                            )}
                                          >
                                            {item.name}
                                          </a>
                                        )}
                                      </Menu.Item>
                                    ))}
                                  </Menu.Items>
                                </Transition>
                              </Menu>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </Popover>
                </>

                {post && (
                  <div
                    key={post.id}
                    className="mx-auto mb-4 mt-4 max-w-4xl justify-center"
                  >
                    <ul role="list" className="space-y-4">
                      <li className="rounded-lg bg-white">
                        <div>
                          <div className="mx-8 flex space-x-3 pt-3">
                            <div className="min-w-0 flex-1">
                              <h2
                                id="question-title-"
                                className="heading2SemiBold mb-2 text-text-black-primary"
                              >
                                {post.title}
                              </h2>
                            </div>
                            <div className="flex flex-shrink-0 self-start">
                            <Dropdown
                              items={[
                                {
                                  icon: <ArchiveBoxIcon className="mr-3 h-5 w-5 text-secondary-base group-hover:text-gray-500" aria-hidden="true" />,
                                  text: 'Archive',
                                  onClick: () => console.log('Reported'),
                                },
                                {
                                  icon: <TrashIcon className="mr-3 h-5 w-5 text-secondary-base group-hover:text-gray-500" aria-hidden="true" />,
                                  text: 'Delete',
                                  onClick: () => console.log('Reported'),
                                },
                                {
                                  icon: <ArrowUpOnSquareIcon className="mr-3 h-5 w-5 text-secondary-base group-hover:text-gray-500" aria-hidden="true" />,
                                  text: 'Share',
                                  onClick: () => console.log('Reported'),
                                },
                                {
                                  icon: <EyeSlashIcon className="mr-3 h-5 w-5 text-secondary-base group-hover:text-gray-500" aria-hidden="true" />,
                                  text: 'Private',
                                  onClick: () => console.log('Reported'),
                                },
                              ]}
                              triggerIcon={<EllipsisVerticalIcon className="h-6 w-6 text-text-black-primary" />}
                            />
                            </div>
                          </div>
                        </div>
                        <div className="mx-8 flex min-w-0 ">
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
                        <div className="captionMedium relative block items-center text-left text-text-black-secondary">
                          <p className="captionRegular ml-8 mr-4 text-sm">
                            {post.date}
                          </p>
                          <div className="ml-8 flex items-center">
                            <div className="captionMedium cursor-pointer text-sm text-primary-base">
                              <a href={post.embedLink}>Original Post</a>
                            </div>
                            <ArrowTopRightOnSquareIcon
                              className="h-5 w-5 text-primary-base"
                              aria-hidden="true"
                            />
                          </div>
                        </div>
                        <div className="h- mx-8 my-4 flex-shrink-0 cursor-pointer">
                          <EmbedDiv
                            embedLink={post.embedLink}
                            embedImageUrl={fetchThumbnailFromEmbedLink(
                              post.embedLink,
                            )}
                            embedAuthor={post.title}
                            platform={post.description}
                          />
                        </div>
                        {renderDescription(post)}
                      </li>
                    </ul>
                    <div ref={commentSectionRef}>
                      <CommentSection comments={post?.comments ?? []} />
                    </div>
                    <h2 className="heading2SemiBold mx-8 mb-8 mt-8 text-neutral-600">
                      Recommended for you
                    </h2>
                    <div className="flex items-center justify-center">
                      <div className="w-full max-w-lg md:max-w-full">
                        <div className=" mx-8 grid grid-cols-1 gap-4 pb-20 md:grid-cols-3">
                          {posts.slice(0, 3).map((post) => (
                            <div
                              key={post.id}
                              className="relative flex h-full flex-col items-center rounded-lg bg-white shadow-md focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400 hover:shadow-lg"
                            >
                              <div className="w-full cursor-pointer">
                                <Image
                                  src={post.embedImageUrl}
                                  alt="saved"
                                  width={1000}
                                  height={1000}
                                  className="h-52 md:h-32"
                                  style={{
                                    objectFit: 'cover',
                                    objectPosition: 'center',
                                    borderTopRightRadius: '8px',
                                    borderTopLeftRadius: '8px',
                                    width: '100%',
                                  }}
                                />
                              </div>
                              <div className="w-full flex-1 cursor-pointer px-5 pb-4">
                                <p className="body2SemiBold mb-2 mt-4 text-text-black-primary ">
                                  {post.title}
                                </p>
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
                                    <button
                                      type="button"
                                      className="inline-flex items-center space-x-2 text-gray-400 hover:text-gray-500"
                                    >
                                      <Image
                                        className="image-pop h-6 w-auto"
                                        src={saveIcon}
                                        alt="Your Company Icon"
                                      />
                                      <span className="captionRegular hidden text-sm text-text-black-primary">
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
                )}

                <SharePostDialog
                  isOpen={isDialogOpen}
                  closeDialog={handleCloseDialog}
                  post={post}
                />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default DiscoverDialog
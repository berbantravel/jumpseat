'use client'

import Image from 'next/image'
import React, { Fragment, useEffect, useState } from 'react'

import { DiscoverDialog } from '@/components/dialogs'
import Dropdown from '@/components/Dropdown'
import { Post } from '@/types/models'
import {
  EllipsisHorizontalIcon,
  ChatBubbleLeftEllipsisIcon,
  TagIcon,
  UserCircleIcon,
} from '@heroicons/react/20/solid'
import { CheckIcon } from '@heroicons/react/24/outline'

const activity = [
  {
    id: 1,
    type: 'comment',
    person: { name: 'Eduardo Benz', href: '#' },
    imageUrl:
      'https://images.unsplash.com/photo-1520785643438-5bf77931f493?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80',
    comment:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt nunc ipsum tempor purus vitae id. Morbi in vestibulum nec varius. Et diam cursus quis sed purus nam. ',
    date: '6d ago',
  },
  {
    id: 2,
    type: 'assignment',
    person: { name: 'Hilary Mahy', href: '/' },
    assigned: { name: 'Kristin Watson', href: '/' },
    date: '2d ago',
  },
  {
    id: 3,
    type: 'tags',
    person: { name: 'Hilary Mahy', href: '#' },
    tags: [
      { name: 'Bug', href: '#', color: 'fill-red-500' },
      { name: 'Accessibility', href: '#', color: 'fill-indigo-500' },
    ],
    date: '6h ago',
  },
  {
    id: 4,
    type: 'comment',
    person: { name: 'Jason Meyers', href: '#' },
    imageUrl:
      'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80',
    comment:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt nunc ipsum tempor purus vitae id. Morbi in vestibulum nec varius. Et diam cursus quis sed purus nam. Scelerisque amet elit non sit ut tincidunt condimentum. Nisl ultrices eu venenatis diam.',
    date: '2h ago',
  },
  {
    id: 5,
    type: 'comment',
    person: { name: 'Jason Meyers', href: '#' },
    imageUrl:
      'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80',
    comment:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt nunc ipsum tempor purus vitae id. Morbi in vestibulum nec varius. Et diam cursus quis sed purus nam. Scelerisque amet elit non sit ut tincidunt condimentum. Nisl ultrices eu venenatis diam.',
    date: '2h ago',
  },
  {
    id: 6,
    type: 'comment',
    person: { name: 'Jason Meyers', href: '#' },
    imageUrl:
      'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80',
    comment:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt nunc ipsum tempor purus vitae id. Morbi in vestibulum nec varius. Et diam cursus quis sed purus nam. Scelerisque amet elit non sit ut tincidunt condimentum. Nisl ultrices eu venenatis diam.',
    date: '2h ago',
  },
  {
    id: 7,
    type: 'comment',
    person: { name: 'Jason Meyers', href: '#' },
    imageUrl:
      'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80',
    comment:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt nunc ipsum tempor purus vitae id. Morbi in vestibulum nec varius. Et diam cursus quis sed purus nam. Scelerisque amet elit non sit ut tincidunt condimentum. Nisl ultrices eu venenatis diam.',
    date: '2h ago',
  },
  {
    id: 8,
    type: 'comment',
    person: { name: 'Jason Meyers', href: '#' },
    imageUrl:
      'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80',
    comment:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt nunc ipsum tempor purus vitae id. Morbi in vestibulum nec varius. Et diam cursus quis sed purus nam. Scelerisque amet elit non sit ut tincidunt condimentum. Nisl ultrices eu venenatis diam.',
    date: '2h ago',
  },
]

export default function Notifications() {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [expandedPosts, setExpandedPosts] = useState<{
    [key: number]: boolean
  }>({})

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

  const toggleExpand = (postId: number) => {
    setExpandedPosts((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }))
  }

  function classNames(...classes: (string | undefined | null | false)[]): string {
    return classes.filter(Boolean).join(' ')
  }

  return (
    <>
      <div className='px-0 sm:px-10'>
        <div className="my-0 sm:my-6 bg-white mx-auto max-w-2xl rounded-lg px-6 py-4 shadow-sm">
          <div className='flex justify-between items-center'>
            <div className='mb-8 mt-4'>
              <div className="text-left heading2SemiBold block w-full text-text-black-primary mx-4 max-w-3xl sm:mx-auto sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-4 lg:px-8">
                Notifications
              </div>
            </div>
            <div className="mr-8 captionRegular text-sm text-gray-900 cursor-pointer ">
              <Dropdown
                items={[
                  {
                    icon: <CheckIcon className="mr-3 h-5 w-5 text-secondary-base group-hover:text-gray-500" aria-hidden="true" />,
                    text: 'Mark all as read',
                    onClick: () => console.log('Mark all as read'),
                  },
                ]}
              />
            </div>
          </div>
          <div className="flow-root p-4">
            <ul role="list" className="-mb-8">
              {activity.map((activityItem, activityItemIdx) => (
                <li key={activityItem.id}>
                  <div className="relative pb-8">
                    {activityItemIdx !== activity.length - 1 ? (
                      <span
                        className="absolute left-5 top-5 -ml-px h-full w-0.5 bg-gray-200"
                        aria-hidden="true"
                      />
                    ) : null}
                    <div className="relative flex items-start space-x-3">
                      {activityItem.type === 'comment' ? (
                        <>
                          <div className="relative">
                            {activityItem.imageUrl && (
                              <Image
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-400 ring-8 ring-white"
                                src={activityItem.imageUrl}
                                alt=""
                                width={1000}
                                height={1000}
                              />
                            )}
                            <span className="absolute -bottom-0.5 -right-1 rounded-tl bg-white px-0.5 py-px">
                              <ChatBubbleLeftEllipsisIcon
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              />
                            </span>
                          </div>
                          <div className="min-w-0 flex-1">
                            <div>
                              <div className="text-sm">
                                <a
                                  href={activityItem.person.href}
                                  className="font-medium text-gray-900"
                                >
                                  {activityItem.person.name}
                                </a>
                              </div>
                              <p className="mt-0.5 text-sm text-gray-500">
                                Commented {activityItem.date}
                              </p>
                            </div>
                            <div className="mt-2 text-sm text-gray-700">
                              <p>{activityItem.comment}</p>
                            </div>
                          </div>
                        </>
                      ) : activityItem.type === 'assignment' ? (
                        <>
                          <div>
                            <div className="relative px-1">
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white">
                                <UserCircleIcon
                                  className="h-5 w-5 text-gray-500"
                                  aria-hidden="true"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="min-w-0 flex-1 py-1.5">
                            <div className="text-sm text-gray-500">
                              <a
                                href={activityItem.person.href}
                                className="font-medium text-gray-900"
                              >
                                {activityItem.person.name}
                              </a>{' '}
                              assigned{' '}
                              <a
                                href="/"
                                className="font-medium text-gray-900"
                              >
                                Kristin Watson
                              </a>{' '}
                              <span className="whitespace-nowrap">
                                {activityItem.date}
                              </span>
                            </div>
                          </div>
                        </>
                      ) : activityItem.type === 'tags' ? (
                        <>
                          <div>
                            <div className="relative px-1">
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white">
                                <TagIcon
                                  className="h-5 w-5 text-gray-500"
                                  aria-hidden="true"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="min-w-0 flex-1 py-0">
                            <div className="text-sm leading-8 text-gray-500">
                              <span className="whitespace-nowrap">
                                {activityItem.date}
                              </span>
                            </div>
                          </div>
                        </>
                      ) : null}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
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

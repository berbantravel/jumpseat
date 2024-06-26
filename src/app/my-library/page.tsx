'use client'

import Link from 'next/link'
import clsx from 'clsx'
import { Menu, Transition } from '@headlessui/react'
import { Fragment, useState, useEffect } from 'react'

import Dropdown from '@/components/Dropdown'
import LeftSideNav from '@/components/LeftSideNav'
import CardsGrid from '@/components/CardsGrid'
import SolidButton from '@/components/base/SolidButton'
import { CreateCategoryDialog } from '@/components/dialogs'
import { AddPostDialog } from '@/components/dialogs'
import { Link as LinkIcon, Facebook, Instagram, Youtube } from 'react-feather'
import { PlusIcon } from '@heroicons/react/20/solid'
import { FunnelIcon } from '@heroicons/react/24/outline'

function classNames(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

const MyLibrary = () => {
  const [isClient, setIsClient] = useState(false)
  const [isCreateCategoryOpen, setIsCreateCategoryOpen] = useState(false)
  const [isAddPostOpen, setIsAddPostOpen] = useState(false)

  const openCreateCategoryDialog = () => setIsCreateCategoryOpen(true)
  const closeCreateCategoryDialog = () => setIsCreateCategoryOpen(false)

  const openAddPostDialog = () => setIsAddPostOpen(true)
  const closeAddPostDialog = () => setIsAddPostOpen(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <>
      <div className="mx-auto max-w-5xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-12 lg:gap-8 lg:px-8 py-0 sm:py-4">
        <LeftSideNav></LeftSideNav>
        <main className="col-span-12 lg:col-span-10 xl:col-span-10">
          <div className="px-0">
            <div className="mx-auto mt-0 max-w-[1220px] rounded-lg bg-white px-9 pt-6 pb-8 shadow-sm sm:mt-2">
              <div className="flex justify-between border-b-2 border-b-slate-100 pb-4">
                <div className="block min-w-0 items-center md:flex">
                  <p className="headingSemiBold mr-1 text-text-black-primary">
                    My Library
                  </p>
                  <div>
                    <div className="subHeadingLight text-text-black-secondary">
                      <div className="cursor-pointer">
                        <span className="captionSemiBold text-md mr-2 hidden md:inline">
                          .
                        </span>
                        Recently saved posts
                      </div>
                    </div>
                  </div>
                  <SolidButton
                    className="mt-2 inline-flex w-full items-center space-x-2 rounded-full py-2 pl-4 pr-5 sm:hidden"
                    onClick={openCreateCategoryDialog}
                  >
                    <PlusIcon className="h-6 w-auto text-text-white-primary" />
                    <span className="captionRegular text-xs text-text-white-primary sm:text-sm">
                      Create Category
                    </span>
                  </SolidButton>
                </div>
                <div className="flex items-center text-sm">
                  <span className="inline-flex items-center">
                    <SolidButton
                      className="hidden w-full items-center space-x-2 rounded-full py-2 pl-4 pr-5 sm:inline-flex "
                      onClick={openCreateCategoryDialog}
                    >
                      <PlusIcon className="h-6 w-auto text-text-white-primary" />
                      <span className="captionRegular text-xs text-text-white-primary sm:text-sm">
                        Create Category
                      </span>
                    </SolidButton>
                    {isClient && (
                      <Dropdown
                        items={[
                          {
                            icon: <Facebook className="mr-3 h-5 w-5 text-secondary-base group-hover:text-gray-500" aria-hidden="true" />,
                            text: 'Facebook',
                            onClick: () => console.log('Facebook'),
                          },
                          {
                            icon: <Instagram className="mr-3 h-5 w-5 text-secondary-base group-hover:text-gray-500" aria-hidden="true" />,
                            text: 'Instagram',
                            onClick: () => console.log('Instagram'),
                          },
                          {
                            icon: <Youtube className="mr-3 h-5 w-5 text-secondary-base group-hover:text-gray-500" aria-hidden="true" />,
                            text: 'Youtube',
                            onClick: () => console.log('Youtube'),
                          },
                          {
                            icon: <LinkIcon className="mr-3 h-5 w-5 text-secondary-base group-hover:text-gray-500" aria-hidden="true" />,
                            text: 'Resources',
                            onClick: () => console.log('Resources'),
                          },
                        ]}
                        triggerIcon={<FunnelIcon className="h-6 w-6 text-text-black-primary" />}
                      />
                    )}
                  </span>
                </div>
              </div>
              <div className="flex flex-shrink-0 justify-end self-start">
                <div className="relative inline-block text-left">
                  <button
                    type="button"
                    className="mr-4 mt-0 inline-flex items-center space-x-2 rounded-full py-2 pl-4 text-text-black-secondary body2Medium text-sm"
                    onClick={openAddPostDialog}
                  >
                    {/* <PlusIcon className="image-pop h-6 mr-1 w-auto text-text-black-secondary"></PlusIcon> */}
                    Add Post
                  </button>
                </div>
              </div>
              <div className="mx-auto mb-8 grid-cols-1">
                <CardsGrid />
              </div>
            </div>
          </div>
        </main>
      </div>

      <CreateCategoryDialog
        isCreateCategoryOpen={isCreateCategoryOpen}
        closeCreateCategoryDialog={closeCreateCategoryDialog}
      ></CreateCategoryDialog>
      <AddPostDialog
        isOpen={isAddPostOpen}
        closeDialog={closeAddPostDialog}
      ></AddPostDialog>
    </>
  )
}

export default MyLibrary

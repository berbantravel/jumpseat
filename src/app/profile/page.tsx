'use client'

import Image from 'next/image'
import React, { Fragment, useState, MouseEvent, useEffect } from 'react'
import { ContainerOuter, ContainerInner } from '@/components/Container'
import {
  CameraIcon,
  PencilIcon as PencilOutline, PlusIcon, FunnelIcon
} from '@heroicons/react/24/outline'
import { Edit2 } from 'react-feather'
import { BackgroundPhotoDialog } from '@/components/dialogs'
import { ViewBackgroundPhotoDialog } from '@/components/dialogs'
import { ViewProfilePhotoDialog } from '@/components/dialogs'
import { CreateCategoryDialog } from '@/components/dialogs'
import { EditProfileDialog } from '@/components/dialogs'
import { Menu, Transition } from '@headlessui/react'
import CategoriesCardsGrid from '@/components/CategoriesCardsGrid'
import SolidButton from '@/components/base/SolidButton'
import Dropdown from '@/components/Dropdown'

import {
  Link as LinkIcon,
  Facebook,
  Instagram,
  Youtube,
} from 'react-feather'

import {
  myProfile,
  settings,
  navigation as navData,
  categories,
  filters,
} from '@/constants/dummyData'

function classNames(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

export default function Profile() {
  function Ellipsis(props: React.ComponentPropsWithoutRef<'svg'>) {
    return (
      <svg
        width="11"
        height="11"
        viewBox="0 0 11 11"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.179 10.024C8.03928 10.024 10.358 7.78005 10.358 5.012C10.358 2.24395 8.03928 0 5.179 0C2.31872 0 0 2.24395 0 5.012C0 7.78005 2.31872 10.024 5.179 10.024Z"
          fill="#016FB9"
        />
      </svg>
    )
  }

  const [isOpen, setIsOpen] = useState(false)
  const [isViewBackgroundPhotoOpen, setIsViewBackgroundPhotoOpen] = useState(false)
  const [isViewProfilePhotoOpen, setIsViewProfilePhotoOpen] = useState(false)
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const [isCreateCategoryOpen, setIsCreateCategoryOpen] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const openCreateCategoryDialog = () => setIsCreateCategoryOpen(true)
  const closeCreateCategoryDialog = () => setIsCreateCategoryOpen(false)

  const openDialog = (e: MouseEvent) => {
    e.stopPropagation()
    setIsOpen(true)
  }

  const closeDialog = () => {
    setIsOpen(false)
  }


  const openViewBackgroundPhotoDialog = () => setIsViewBackgroundPhotoOpen(true)
  const closeViewBackgroundPhotoDialog = () => setIsViewBackgroundPhotoOpen(false)

  const openViewProfilePhotoDialog = () => setIsViewProfilePhotoOpen(true)
  const closeViewProfilePhotoDialog = () => setIsViewProfilePhotoOpen(false)

  const openEditProfileDialog = () => setIsEditProfileOpen(true)
  const closeEditProfileDialog = () => setIsEditProfileOpen(false)

  return (
    <ContainerOuter>
      <ContainerInner>
        <div
          className="z-30 mx-auto h-64 max-w-7xl cursor-pointer rounded-lg bg-secondary-base sm:px-6 lg:px-8"
          onClick={openViewBackgroundPhotoDialog}
        >
          <div
            className="absolute right-4 top-10 rounded-full bg-neutralWhite-pure p-2 hover:bg-primary-background active:outline active:outline-2 active:outline-primary-base sm:right-5 sm:top-14 lg:right-5 lg:top-16"
            onClick={openDialog}
          >
            <CameraIcon className="h-4 w-4 cursor-pointer text-primary-base" />
          </div>
        </div>
        <div className="block gap-4 sm:flex">
          {myProfile.map((profile) => (
            <React.Fragment key={profile.id}>
              <div className="-mt-10 ml-2 flex h-auto justify-center sm:w-60 sm:justify-center" onClick={openViewProfilePhotoDialog}>
                <Image
                  className="h-44 w-44 rounded-full cursor-pointer"
                  src={profile.imageUrl}
                  alt=""
                  width={1000}
                  height={1000}
                />
              </div>
              <div className="mt-2 flex h-28  w-full justify-center sm:justify-between">
                <div className="block text-center sm:text-left">

                  <div className="flex justify-center sm:justify-start">
                    <div className="headingSemiBold mr-2 sm:mr-0">
                      Darrel Mendoza
                    </div>
                    <div className="flex justify-start sm:hidden" onClick={openEditProfileDialog}>
                      <Edit2 className="h-5 w-5 cursor-pointer text-secondary-base" />
                    </div>
                  </div>

                  <div className="bodyRegular">Full Stack Engineer</div>
                  <div className="body2Light mt-3 text-center text-text-black-secondary sm:text-left ">
                    Talks about #startup #motivation #business
                  </div>
                  <div className="flex items-center justify-center sm:justify-start">
                    <Ellipsis className="h-4 w-4 cursor-pointer text-primary-base" />
                    <div className="bodyMedium ml-2 ">135 Followers</div>
                  </div>
                </div>
                <div className="mr-4 mt-4 hidden h-28 w-full sm:flex sm:w-auto sm:items-start sm:justify-end" onClick={openEditProfileDialog}>
                  <Edit2 className="h-6 w-6 cursor-pointer text-secondary-base" />
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
        <main className="col-span-12 lg:col-span-10 xl:col-span-10 mt-10">
          <div className="px-0">
            <div className="mx-auto mt-0 max-w-[1220px] rounded-lg bg-white px-10 sm:px-16 py-8 shadow-sm sm:mt-2">
              <div className="flex justify-between border-b-2 border-b-slate-100 pb-6">
                <div className="block lg:flex min-w-0 items-center">
                  <div className='flex items-center'>
                    <p className="headingSemiBold text-xl md:text-4xl mr-1 text-text-black-primary">
                      My Library
                    </p>
                    <div className="headingLight text-xl md:text-4xl text-text-black-secondary">
                      / Categories
                    </div>
                  </div>
                  <SolidButton className='mt-2 inline-flex lg:hidden w-auto items-center space-x-2 rounded-full py-2 pl-4 pr-5' onClick={openCreateCategoryDialog}>
                    <PlusIcon className="h-6 w-auto  text-text-white-primary" />
                    <span className="captionRegular sm:text-sm text-text-white-primary text-xs">
                      Create Category
                    </span>
                  </SolidButton>
                </div>
                <div className="flex items-center text-sm">
                  <span className="inline-flex items-center">
                    <SolidButton className='lg:inline-flex hidden w-full items-center space-x-2 rounded-full py-2 pl-4 pr-5 ' onClick={openCreateCategoryDialog}>
                      <PlusIcon className="h-6 w-auto text-text-white-primary" />
                      <span className="captionRegular sm:text-sm text-text-white-primary text-xs">
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
              <div className="mx-auto mb-8 grid-cols-1 mt-8">
                <CategoriesCardsGrid />
              </div>
            </div>
          </div>
        </main>
      </ContainerInner>

      <CreateCategoryDialog
        isCreateCategoryOpen={isCreateCategoryOpen}
        closeCreateCategoryDialog={closeCreateCategoryDialog}
      ></CreateCategoryDialog>
      <BackgroundPhotoDialog
        isOpen={isOpen}
        closeDialog={closeDialog}
      ></BackgroundPhotoDialog>
      <ViewBackgroundPhotoDialog
        isViewBackgroundPhotoOpen={isViewBackgroundPhotoOpen}
        closeViewBackgroundPhotoDialog={closeViewBackgroundPhotoDialog}
      ></ViewBackgroundPhotoDialog>
      <ViewProfilePhotoDialog
        isViewProfilePhotoOpen={isViewProfilePhotoOpen}
        closeViewProfilePhotoDialog={closeViewProfilePhotoDialog}
      ></ViewProfilePhotoDialog>
      <EditProfileDialog
        isEditProfileOpen={isEditProfileOpen}
        closeEditProfilePhotoDialog={closeEditProfileDialog}
      ></EditProfileDialog>
    </ContainerOuter>
  )
}
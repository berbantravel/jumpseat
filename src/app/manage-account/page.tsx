'use client'

import Image from 'next/image'
import React, { useState } from 'react'

import { ClearDataDialog, DeleteAccountDialog, } from '@/components/dialogs'
import { ViewProfilePhotoDialog } from '@/components/dialogs'
import HorizontalGrid from '@/components/HorizontalGrid'
import saveIcon from '@/images/logos/postfolio-logo-icon-01.png'
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
  ArrowPathRoundedSquareIcon,
} from '@heroicons/react/24/outline'
import { posts, topics } from '@/constants/dummyData'
import { Post } from '@/types/models'

export default function ManageAccount() {

  const [isClearDataDialogOpen, setIsClearDataDialogOpen] = useState(false)
  const [isDeleteAccountDialogOpen, setIsDeleteAccountDialogOpen] = useState(false)
  const [isViewProfilePhotoOpen, setIsViewProfilePhotoOpen] = useState(false)


  const openClearDataDialog = () => setIsClearDataDialogOpen(true)
  const closeClearDataDialog = () => setIsClearDataDialogOpen(false)

  const openDeleteAccountDialog = () => setIsDeleteAccountDialogOpen(true)
  const closeDeleteAccountDialog = () => setIsDeleteAccountDialogOpen(false)

  const openViewProfilePhotoDialog = () => setIsViewProfilePhotoOpen(true)
  const closeViewProfilePhotoDialog = () => setIsViewProfilePhotoOpen(false)

  return (
    <>

      {/* CONTAINER */}
      <div className='bg-white shadow-sm rounded-lg  mx-auto  max-w-[1220px] sm:px-8 mt-0 xl:mt-6 pb-14 '>
        <div className="pageTitleSemiBold text-text-black-primary border-b-2 border-b-slate-100 pb-3 mx-10 pt-10">
          Manage your profile
        </div>
        <div className="rounded-lg  mx-auto  grid max-w-3xl grid-cols-1 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2 lg:col-start-1">
            <div className="space-y-4">
              <section aria-labelledby="who-to-follow-heading">
                <div className="">
                  <div className="px-10">
                    <div className="mt-6">
                      <div className='heading2SemiBold mb-2'>
                        Basic Info
                      </div>
                      <div className="col-span-full mb-2 ml-8">
                        <label
                          htmlFor="street-address"
                          className="body2Regular block text-gray-900"
                        >
                          First Name*
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="street-address"
                            id="street-address"
                            autoComplete="street-address"
                            className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                      <div className="col-span-full mb-2 ml-8">
                        <label
                          htmlFor="street-address"
                          className="body2Regular block text-gray-900"
                        >
                          Last Name*
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="street-address"
                            id="street-address"
                            autoComplete="street-address"
                            className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                      <div className="col-span-full mb-2 ml-8">
                        <label
                          htmlFor="street-address"
                          className="body2Regular block text-gray-900"
                        >
                          Headline
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="street-address"
                            id="street-address"
                            autoComplete="street-address"
                            className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>

          <section aria-labelledby="timeline-title" className="lg:col-span-1 lg:col-start-3 mt-8">
            <div className="px-4 pb-5 sm:px-6">
              <div className="sticky top-20 mt-5 space-y-4">
                <section aria-labelledby="trending-heading">
                  <div className="mt-0 flex justify-center">
                    <div className="px-6 pb-6 pt-0 flex-col flex items-center">
                      <div className="flex h-auto justify-center sm:w-60" onClick={openViewProfilePhotoDialog}>
                        <Image
                          className="h-44 w-44 rounded-full cursor-pointer"
                          src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                          alt=""
                          width={1000}
                          height={1000}
                        />
                      </div>
                      <div className="bodyRegular text-text-black-primary text-center mt-4 cursor-pointer" onClick={openViewProfilePhotoDialog}>
                        Change Profile Photo
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </section>
        </div>

        <div className="heading2SemiBold text-text-black-primary border-t-2 border-t-slate-100 pb-3 mx-10 pt-5 mt-5">
          Email Address
        </div>

        <div className="rounded-lg  mx-auto  grid max-w-3xl grid-cols-1 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2 lg:col-start-1">
            <div className="space-y-4">
              <section aria-labelledby="who-to-follow-heading">
                <div className="">
                  <div className="px-10">
                    <div className="col-span-full mb-2 ml-8">
                      <label
                        htmlFor="street-address"
                        className="body2Regular block text-gray-900"
                      >
                        Primary Email: darrelmendoza85@gmail.com
                      </label>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>

          <section aria-labelledby="timeline-title" className="lg:col-span-1 lg:col-start-3">
            <div className="px-4 pb-5 sm:px-6">
              <div className="sticky top-20 space-y-4">
                <section aria-labelledby="trending-heading">
                  <div className="mt-0 flex justify-center">
                    <div className="px-6 pb-6 pt-0 flex-col flex items-center">
                      {/* <button
                        type="submit"
                        className="body2Medium mr-2 rounded-full border-2 border-primary-base px-5 py-1 text-primary-base hover:bg-primary-background active:bg-primary-50 flex"
                      >
                        Change Email
                      </button> */}
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </section>
        </div>

        <div className="heading2SemiBold text-text-black-primary border-t-2 border-t-slate-100 pb-3 mx-10 pt-5 mt-5">
          Privacy
        </div>

        <div className="rounded-lg  mx-auto  grid max-w-3xl grid-cols-1 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2 lg:col-start-1">
            <div className="space-y-4">
              <section aria-labelledby="who-to-follow-heading">
                <div className="">
                  <div className="px-10">
                    <div className="col-span-full mb-2 ml-8">
                      <label
                        htmlFor="street-address"
                        className="body2Regular block text-gray-900"
                      >
                        Clear Postfolio Data
                      </label>
                      <label
                        htmlFor="street-address"
                        className="body2Light block text-gray-900 italic"
                      >
                        This will irrevocably delete the items in your list & archive.
                      </label>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>

          <section aria-labelledby="timeline-title" className="lg:col-span-1 lg:col-start-3">
            <div className="px-4 pb-5 sm:px-6">
              <div className="sticky top-20 space-y-4">
                <section aria-labelledby="trending-heading">
                  <div className="mt-0 flex justify-start lg:justify-center">
                    <div className="px-14 lg:px-6 pb-1 pt-0 flex-col flex items-center">
                      <button
                        type="submit"
                        className="body2Medium mr-2 w-48 justify-center rounded-full border-2 bg-danger-700 border-danger-700 px-5 py-1 text-text-white-primary hover:bg-danger-800 active:bg-danger-900 flex"
                        onClick={openClearDataDialog}
                      >
                        Clear Data
                      </button>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </section>
        </div>

        <div className="rounded-lg  mx-auto  grid max-w-3xl grid-cols-1 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2 lg:col-start-1">
            <div className="space-y-4">
              <section aria-labelledby="who-to-follow-heading">
                <div className="">
                  <div className="px-10">
                    <div className="col-span-full mb-2 ml-8">
                      <label
                        htmlFor="street-address"
                        className="body2Regular block text-gray-900"
                      >
                        Delete my Postfolio account
                      </label>
                      <label
                        htmlFor="street-address"
                        className="body2Light block text-gray-900 italic"
                      >
                        This will delete your account and all items within it.
                      </label>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>

          <section aria-labelledby="timeline-title" className="lg:col-span-1 lg:col-start-3">
            <div className="px-4 sm:px-6">
              <div className="sticky top-20 space-y-4">
                <section aria-labelledby="trending-heading">
                  <div className="mt-0 flex justify-start lg:justify-center">
                    <div className="px-14 lg:px-6 pb-6 pt-0 flex-col flex items-center">
                      <button
                        type="submit"
                        className="body2Medium mr-2 w-48 justify-center rounded-full border-2 bg-danger-700 border-danger-700 px-5 py-1 text-text-white-primary hover:bg-danger-800 active:bg-danger-900 flex"
                        onClick={openDeleteAccountDialog}
                      >
                        Delete Account
                      </button>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </section>
        </div>
      </div>

      <ClearDataDialog
        isClearDataDialogOpen={isClearDataDialogOpen}
        closeClearDataDialog={closeClearDataDialog}
      ></ClearDataDialog>
      <DeleteAccountDialog
        isDeleteAccountDialogOpen={isDeleteAccountDialogOpen}
        closeDeleteAccountDialog={closeDeleteAccountDialog}
      ></DeleteAccountDialog>
      <ViewProfilePhotoDialog
        isViewProfilePhotoOpen={isViewProfilePhotoOpen}
        closeViewProfilePhotoDialog={closeViewProfilePhotoDialog}
      ></ViewProfilePhotoDialog>
    </>
  )
}

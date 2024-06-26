import React, { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ViewProfilePhotoDialogProps } from '@/types/models'
import Image from 'next/image'

import {
  Link as LinkIcon,
  Camera,
  Trash2,
} from 'react-feather'

import {
  myProfile,
  navigation as navData,
} from '@/constants/dummyData'

const ViewProfilePhotoDialog: React.FC<ViewProfilePhotoDialogProps> = ({
  isViewProfilePhotoOpen,
  closeViewProfilePhotoDialog,
}) => {
  const cancelButtonRef = useRef(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

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

  return (
    <Transition.Root show={isViewProfilePhotoOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        initialFocus={cancelButtonRef}
        onClose={closeViewProfilePhotoDialog}
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
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative mx-0 w-full transform overflow-hidden rounded-lg bg-black py-5 text-left shadow-xl transition-all sm:mx-10 sm:my-8 sm:w-full sm:max-w-lg">
                <div className="flex items-start justify-between px-10 pb-4">
                  <Dialog.Title
                    as="h3"
                    className="subheadingSemiBold text-white"
                  >
                    Edit Photo
                  </Dialog.Title>
                  <XMarkIcon
                    className="h-6 w-6 cursor-pointer text-white"
                    onClick={closeViewProfilePhotoDialog}
                  />
                </div>
                <div className="my-4 flex h-auto w-auto justify-center bg-black pb-8">
                  {myProfile.map((profile) => (
                    <React.Fragment key={profile.id}>
                      <div className=" ml-2 flex h-auto justify-center sm:w-60 sm:justify-center">
                        <Image
                          className="h-48 w-48 rounded-full"
                          src={profile.imageUrl}
                          alt=""
                          width={1000}
                          height={1000}
                        />
                      </div>
                    </React.Fragment>
                  ))}
                </div>
                <div className="flex items-center justify-between space-x-2 border-t-[1px] border-text-black-secondary px-10 pt-5">   
                  <div className="flex justify-start gap-4 sm:gap-6">
                    <div className="flex h-full flex-col items-center justify-center self-center cursor-pointer">
                      <div className="body2Medium text-white">
                        <Camera />
                      </div>
                      <div className="body2Medium text-white">Change photo</div>
                    </div>
                  </div>
                  <div className="flex h-full flex-col items-center justify-center self-center cursor-pointer">
                    <div className="body2Medium text-white">
                      <Trash2 />
                    </div>
                    <div className="body2Medium text-white">Delete</div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default ViewProfilePhotoDialog
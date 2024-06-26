import React, { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ViewBackgroundPhotoDialogProps } from '@/types/models'


const ViewBackgroundPhotoDialog: React.FC<ViewBackgroundPhotoDialogProps> = ({
  isViewBackgroundPhotoOpen,
  closeViewBackgroundPhotoDialog,
}) => {
  const cancelButtonRef = useRef(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  return (
    <Transition.Root show={isViewBackgroundPhotoOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        initialFocus={cancelButtonRef}
        onClose={closeViewBackgroundPhotoDialog}
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
              <Dialog.Panel className="relative mx-10 w-full transform overflow-hidden rounded-lg bg-black pb-16 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-6xl">
                <div className="flex items-start justify-end px-7 pb-4">
                  <XMarkIcon
                    className="h-6 w-6 cursor-pointer text-white"
                    onClick={closeViewBackgroundPhotoDialog}
                  />
                </div>
                <div className="z-30mx-auto mx-16 h-64 max-w-full cursor-pointer rounded-lg bg-secondary-base sm:px-6 lg:px-8"></div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default ViewBackgroundPhotoDialog

import React, { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { OutlineButton, SolidButton } from '../../base'

interface EmptyFormDialogProps {
  isOpen: boolean
  closeDialog: () => void
  title: string
  cancelButtonText: string
  confirmButtonText: string
  children?: React.ReactNode
}

const EmptyFormDialog: React.FC<EmptyFormDialogProps> = ({
  isOpen,
  closeDialog,
  title,
  cancelButtonText,
  confirmButtonText,
  children,
}) => {
  const cancelButtonRef = useRef(null)

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
              <Dialog.Panel className="relative w-full transform overflow-hidden rounded-lg bg-white pb-5 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl">
                <div className="flex items-start justify-between border-b-2 px-7 pb-4">
                  <Dialog.Title
                    as="h3"
                    className="subheadingSemiBold text-black"
                  >
                    {title}
                  </Dialog.Title>
                  <XMarkIcon
                    className="h-6 w-6 cursor-pointer"
                    onClick={closeDialog}
                  />
                </div>
                <div className="mt-3 px-0 text-left sm:mt-5">
                  <div className="mt-2">{children}</div>
                </div>
                <div className="mt-5 flex justify-end space-x-2 border-t-2 px-6 pt-1 sm:mt-6">
                  <OutlineButton
                    className="mt-4 w-auto items-center"
                    onClick={closeDialog}
                  >
                    {cancelButtonText}
                  </OutlineButton>
                  <SolidButton
                    className="mt-4 w-auto items-center px-6"
                    onClick={closeDialog}
                  >
                    {confirmButtonText}
                  </SolidButton>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default EmptyFormDialog

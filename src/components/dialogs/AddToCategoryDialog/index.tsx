import React, { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon, PhotoIcon } from '@heroicons/react/24/outline'
import { SolidButton, OutlineButton } from '../../base'
import { DialogProps } from '@/types/models'

const AddToCategoryDialog: React.FC<DialogProps> = ({
  isOpen,
  closeDialog,
}) => {
  const cancelButtonRef = useRef(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

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
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white pb-5 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl">
                <div className="flex items-start justify-between border-b-2 px-7 pb-4">
                  <Dialog.Title
                    as="h3"
                    className="subheadingSemiBold text-secondary-base"
                  >
                    Add to category
                  </Dialog.Title>
                  <XMarkIcon
                    className="h-6 w-6 cursor-pointer"
                    onClick={closeDialog}
                  />
                </div>
                <div className="mt-3 px-7 text-left sm:mt-5">
                  <div className="mt-2">
                    {/* <Dropzone
                      acceptedTypes={{ 'image/png': ['.png'], 'image/jpeg': ['.jpg', '.jpeg'] }}
                      message="Drag and drop your background photo here, or click to select file"
                      fileInputRef={fileInputRef}
                      hideUploadButton={true}
                    ></Dropzone> */}
                    {/* <div className="col-span-full mb-2">
                      <label
                        htmlFor="street-address"
                        className="body2Regular block text-gray-900"
                      >
                        This cannot be undone.
                      </label>
                    </div> */}
                    <div className="sm:col-span-3">
                      <div className="mt-2">
                        <select
                          id="country"
                          name="country"
                          autoComplete="country-name"
                          className="body2Regular block w-full cursor-pointer rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-lg"
                        >
                          <option>Motivation</option>
                          <option>Inspiration</option>
                          <option>Web Development</option>
                          <option>Memes</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-5 flex justify-end space-x-2 border-t-2 px-6 pt-1 sm:mt-6">
                  <OutlineButton
                    className="mt-4 w-auto items-center"
                    onClick={closeDialog}
                  >
                    Cancel
                  </OutlineButton>
                  <SolidButton
                    className="mt-4 w-auto px-6"
                    onClick={closeDialog}
                  >
                    Save to Category
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

export default AddToCategoryDialog

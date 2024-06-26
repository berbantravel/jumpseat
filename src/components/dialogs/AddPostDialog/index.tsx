import React, { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {
  XMarkIcon,
  DocumentPlusIcon,
} from '@heroicons/react/24/outline'
import { Dropzone, SolidButton, OutlineButton } from '../../base'
import { DialogProps } from '@/types/models'
import EmptyFormDialog from '../EmptyFormDialog'

const AddPostDialog: React.FC<DialogProps> = ({ isOpen, closeDialog }) => {
  const cancelButtonRef = useRef(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  return (
    <EmptyFormDialog
      isOpen={isOpen}
      closeDialog={closeDialog}
      title="Add Post"
      cancelButtonText="Cancel"
      confirmButtonText="Save"
    >
      <div className="mt-3 px-7 text-left sm:mt-5">
        <div className="mt-2">
          <div className="col-span-full">
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 p-10">
              <div className="text-center">
                <DocumentPlusIcon
                  className="mx-auto h-16 w-16 text-gray-300"
                  aria-hidden="true"
                />
                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md bg-white font-semibold text-primary-base focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-base focus-within:ring-offset-2 hover:text-primary-base"
                  >
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                    />
                  </label>
                  <p className="body2Medium sm:text-base text-sm">
                    Drag and drop posts here or paste a link below
                  </p>
                </div>
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
      </div>

    </EmptyFormDialog>
  )
}

export default AddPostDialog
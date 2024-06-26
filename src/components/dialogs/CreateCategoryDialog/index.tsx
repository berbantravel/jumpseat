import React, { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon, PhotoIcon } from '@heroicons/react/24/outline'
import { SolidButton, OutlineButton } from '../../base'
import { CreateCategoryDialogProps } from '@/types/models'
import EmptyFormDialog from '../EmptyFormDialog'

const CreateCategoryDialog: React.FC<CreateCategoryDialogProps> = ({
  isCreateCategoryOpen,
  closeCreateCategoryDialog,
}) => {
  const cancelButtonRef = useRef(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  return (
    <EmptyFormDialog
      isOpen={isCreateCategoryOpen}
      closeDialog={closeCreateCategoryDialog}
      title="Create Category"
      cancelButtonText="No thanks"
      confirmButtonText="Delete"
    >
      <div className="mt-3 px-7 text-left sm:mt-5">
        <div className="mt-2">
          <div className="col-span-full mb-2">
            <label
              htmlFor="street-address"
              className="body2Regular block text-gray-900"
            >
              Title*
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
          <div className="col-span-full mb-2">
            <label
              htmlFor="street-address"
              className="body2Regular block text-gray-900"
            >
              Description*
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
          <div className="col-span-full">
            <label
              htmlFor="cover-photo"
              className="body2Regular block text-gray-900"
            >
              Thumbnail
            </label>
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
              <div className="text-center">
                <PhotoIcon
                  className="mx-auto h-12 w-12 text-gray-300"
                  aria-hidden="true"
                />
                <div className="mt-4 block text-sm leading-6 text-gray-600 sm:flex">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md bg-white font-semibold text-primary-base focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-base focus-within:ring-offset-2 hover:text-primary-base"
                  >
                    <span>Upload a file</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs leading-5 text-gray-600">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </EmptyFormDialog>
  )
}

export default CreateCategoryDialog

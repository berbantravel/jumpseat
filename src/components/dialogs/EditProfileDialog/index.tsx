import React, { Fragment, useRef } from 'react'
import { EditProfileDialogProps } from '@/types/models'
import EmptyFormDialog from '../EmptyFormDialog'

const EditProfileDialog: React.FC<EditProfileDialogProps> = ({
  isEditProfileOpen,
  closeEditProfilePhotoDialog,
}) => {
  const cancelButtonRef = useRef(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  return (
    <EmptyFormDialog
      isOpen={isEditProfileOpen}
      closeDialog={closeEditProfilePhotoDialog}
      title="Edit Profile"
      cancelButtonText="Cancel"
      confirmButtonText="Save"
    >
      <div className="mt-3 px-7 text-left sm:mt-5">
        <div className="mt-2">
          <div className="heading2SemiBold mb-2">Basic Info</div>
          <div className="col-span-full mb-2">
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
          <div className="col-span-full mb-2">
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
          <div className="col-span-full mb-2">
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
    </EmptyFormDialog>
  )
}

export default EditProfileDialog
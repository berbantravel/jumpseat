import React, { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { DialogProps } from '@/types/models'

import EmptyDialog from '../EmptyFormDialog'

const DeleteConfirmationDialog: React.FC<DialogProps> = ({
  isOpen,
  closeDialog,
}) => {
  const cancelButtonRef = useRef(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  return (
    <EmptyDialog
      isOpen={isOpen}
      closeDialog={closeDialog}
      title="Do you want to delete this post?"
      cancelButtonText="No thanks"
      confirmButtonText="Delete"
    >
      <div className="col-span-full mx-8 mb-2">
        <label
          htmlFor="street-address"
          className="body2Regular block text-gray-900"
        >
          This cannot be undone.
        </label>
      </div>
    </EmptyDialog>
  )
}

export default DeleteConfirmationDialog

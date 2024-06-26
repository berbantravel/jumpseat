import React, { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { SolidButton, OutlineButton } from '../../base'
import { DialogProps } from '@/types/models'
import EmptyFormDialog from '../EmptyFormDialog'

const BackgroundPhotoDialog: React.FC<DialogProps> = ({
  isOpen,
  closeDialog,
}) => {
  const cancelButtonRef = useRef(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  return (
    <EmptyFormDialog
      isOpen={isOpen}
      closeDialog={closeDialog}
      title="Edit Background Photo"
      cancelButtonText="Change Photo"
      confirmButtonText="Apply"
    >
      <div className="my-4 h-auto w-auto bg-black py-10">
        <div className="z-30mx-auto h-56 max-w-full bg-secondary-base sm:px-6 lg:px-8"></div>
      </div>
    </EmptyFormDialog>
  )
}

export default BackgroundPhotoDialog
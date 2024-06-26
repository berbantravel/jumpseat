import React from 'react'

import { DeleteAccountDialogProps } from '@/types/models'
import EmptyDialogContainer from '../EmptyDialogContainer'
import { SolidButton, OutlineButton } from '../../base'

const DeleteAccountDialog: React.FC<DeleteAccountDialogProps> = ({
  isDeleteAccountDialogOpen,
  closeDeleteAccountDialog,
}) => {

  return (
    <EmptyDialogContainer
      isOpen={isDeleteAccountDialogOpen}
      closeDialog={closeDeleteAccountDialog}
      title="Delete Account"
    >
      <div className="mt-3 px-7 text-left sm:mt-5">
        <div className="mt-2">
          <div>
            <div className="col-span-full mb-2">
              <div
                id="question-title-"
                className="body2Regular mx-4 mb-2 text-text-black-primary"
              >
                This will remove your account and all associated data. You will not be able to log in with your account or access any data you have saved.
              </div>
            </div>
            <div className="relative flex items-start mx-4 mt-6">
              <div className="flex h-6 items-center">
                <input
                  id="comments"
                  aria-describedby="comments-description"
                  name="comments"
                  type="checkbox"
                  className="h-4 w-4 rounded border-danger-800 text-danger-800 focus:ring-danger-800"
                />
              </div>
              <div className="ml-3 text-sm leading-6">
                <label htmlFor="comments" className="body2Regular text-danger-800 italic">
                  I understand this will remove my Pocket account
                </label>{' '}
                <span id="comments-description" className="text-danger-800 body2SemiBold italic">
                  Permanently!
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5 flex justify-end space-x-2 border-t-2 px-6 pt-1 sm:mt-6">
        <OutlineButton
          className="mt-4 w-auto items-center outline outline-2 outline-secondary-base text-secondary-base text-center text-sm sm:text-base leading-tight hover:bg-white active:bg-white focus:outline-none focus:ring-2 focus:ring-secondary-base"
          onClick={closeDeleteAccountDialog}
        >
          Go Back!
        </OutlineButton>
        <SolidButton
          className="mt-4 w-auto px-6 ring-2 ring-danger-800 bg-danger-800 text-text-white-primary leading-tight body2Medium sm:text-base hover:bg-danger-900 active:bg-danger-950 focus:outline-none focus:ring-4 focus:ring-danger-200"
          onClick={closeDeleteAccountDialog}
        >
          Delete Account
        </SolidButton>
      </div>
    </EmptyDialogContainer>
  )
}

export default DeleteAccountDialog
import React from 'react'

import { ClearDataDialogProps } from '@/types/models'
import EmptyDialogContainer from '../EmptyDialogContainer'
import { SolidButton, OutlineButton } from '../../base'

const ClearDataDialog: React.FC<ClearDataDialogProps> = ({
  isClearDataDialogOpen,
  closeClearDataDialog,
}) => {

  return (
    <EmptyDialogContainer
      isOpen={isClearDataDialogOpen}
      closeDialog={closeClearDataDialog}
      title="Clear Data"
    >
      <div className="mt-3 px-7 text-left sm:mt-5">
        <div className="mt-2">
          <div>
            <div className="col-span-full mb-2">
              <div
                id="question-title-"
                className="body2Regular mx-4 mb-2 text-text-black-primary"
              >
                It’s your data and you have control over it. If you wish, you can remove any data that has been saved for your account.
              </div>
              <div
                id="question-title-"
                className="body2Regular mx-4 mb-2 text-text-black-primary mt-6"
              >
                This will only remove the content in your account, not the account itself. You will still be able to log in with your account.
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
                  I understand this will remove the data in my Pocket account
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
          onClick={closeClearDataDialog}
        >
          Go Back!
        </OutlineButton>
        <SolidButton
          className="mt-4 w-auto px-6 ring-2 ring-danger-800 bg-danger-800 text-text-white-primary leading-tight body2Medium sm:text-base hover:bg-danger-900 active:bg-danger-950 focus:outline-none focus:ring-4 focus:ring-danger-200"
          onClick={closeClearDataDialog}
        >
          Clear Data
        </SolidButton>
      </div>
    </EmptyDialogContainer>
  )
}

export default ClearDataDialog
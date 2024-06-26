'use client'

import Image from 'next/image'
import React from 'react'

import { myProfile } from '@/constants/dummyData'
import { ReplyFormProps } from '@/types/models'
import { SolidButton } from './base'
import { OutlineButton } from './base'


const ReplyForm: React.FC<ReplyFormProps> = ({ onClose }) => {

  return (
    <>
      {myProfile.map((profile) => (
        <div key={profile.id} className="mx-12 my-3 flex items-start space-x-4">
          <div className="flex-shrink-0">
            <Image
              src={profile.imageUrl}
              alt="saved"
              width={40}
              height={40}
              style={{
                objectFit: 'cover',
                objectPosition: 'center',
                borderRadius: '50%',
                flexShrink: 0,
                width: '33px',
                height: '33px',
              }}
            />
          </div>
          <div className="min-w-0 flex-1">
            <form action="#">
              <div className="border-b border-gray-200">
                <label htmlFor="comment" className="sr-only">
                  Add your comment
                </label>
                <textarea
                  id="comment"
                  className="body2Regular h-6 w-full resize-none border-0 px-0 text-sm text-text-black-secondary focus:outline-none focus:ring-0"
                  placeholder="Write a comment..."
                  required
                  style={{ overflowY: 'hidden' }}
                  onInput={(e) => {
                    const target = e.target as HTMLTextAreaElement
                    target.style.height = '1.5rem'
                    if (target.scrollHeight > 32) {
                      target.style.height = `${target.scrollHeight}px`
                    }
                  }}
                ></textarea>
              </div>
              <div className="flex justify-between pt-2">
                <div className="flex-shrink-0 mt-4">
                  {/* <button
                    type="submit"
                    className="body2Medium mr-2 rounded-full border-2 border-primary-base px-5 py-1 text-primary-base hover:bg-primary-background active:bg-primary-50"
                    onClick={onClose}
                  >
                    Cancel
                  </button> */}
                  <OutlineButton className="w-auto px-3">
                    Cancel
                  </OutlineButton>
                
                  {/* <button
                    type="submit"
                    className="body2Regular rounded-full border-2 border-primary-base bg-primary-base px-5 py-1 text-text-white-primary hover:bg-primary-hover active:bg-primary-pressed"
                  >
                    Reply
                  </button> */}
                  <SolidButton className="w-auto px-6">
                    Reply
                  </SolidButton>
                </div>
              </div>
            </form>
          </div>
        </div>
      ))}
    </>
  )
}

export default ReplyForm

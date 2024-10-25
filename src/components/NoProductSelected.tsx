import { ChevronRightIcon } from '@heroicons/react/20/solid'
import {
  BookmarkSquareIcon,
  BookOpenIcon,
  QueueListIcon,
  RssIcon,
} from '@heroicons/react/24/solid'
import jumpseatIcon from '@/images/logos/jumpseat-icon.png'
import Image from 'next/image'

export default function NoProductSeletcted() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="bg-white">
          <main className="mx-auto w-full max-w-7xl px-6 pb-8 pt-10 sm:pb-20 lg:px-8">
            <Image
              className="mx-auto h-20 w-auto"
              src={jumpseatIcon}
              alt="Your Company Icon"
            />
            <div className="mx-auto mt-10 max-w-2xl text-center sm:mt-14">
              <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                No Product Selected
              </h1>
              <p className="mt-4 text-base leading-7 text-gray-600 sm:mt-6 sm:text-lg sm:leading-8">
                Please select a destination in the experiences page.
              </p>
            </div>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="/experiences"
                className="mt-4 w-full rounded-md bg-[#ff9e39] py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-[#ff9e39] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
              >
                Go to Experiences Page
              </a>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

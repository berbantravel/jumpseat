import Image from 'next/image'

import { recentlySaved, topics } from '@/constants/dummyData'
import postfolioLogo from '@/images/logos/postfolio-logo-blue.png'

const RightSideNav = () => {
  return (
    <>
      <aside className="hidden xl:col-span-4 xl:block">
        <div className="space-y-4">
          <section aria-labelledby="who-to-follow-heading">
            <div className="rounded-lg bg-white shadow">
              <div className="px-8 py-7">
                <h2 className="bodyMedium text-text-black-primary">
                  Recently saved posts
                </h2>
                <div className="mt-6 flow-root">
                  <ul role="list" className="-my-4 divide-y divide-gray-200">
                    {recentlySaved.map((savedPost) => (
                      <li
                        key={savedPost.id}
                        className="my-1 flex cursor-pointer items-center space-x-3 py-3"
                      >
                        <div
                          key={savedPost.id}
                          className="group relative flex cursor-pointer"
                        >
                          <div className=" h-auto max-h-12 w-20 flex-shrink-0 cursor-pointer overflow-hidden rounded-lg group-hover:opacity-75">
                            <Image
                              src={savedPost.imageUrl}
                              alt="saved"
                              width={500}
                              height={500}
                              style={{
                                objectFit: 'cover',
                                objectPosition: 'center',
                              }}
                            />
                          </div>
                          <div className="ml-2 flex flex-col justify-center overflow-hidden">
                            <h3 className="captionMedium max-h-12 overflow-hidden text-text-black-primary">
                              <a href="#">{savedPost.description}</a>
                            </h3>
                            <p className="captionRegular text-text-black-secondary">
                              {savedPost.platform}
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-2">
                  <a
                    href="#"
                    className="captionRegular block w-full rounded-md px-3 pt-1 text-right text-sm text-primary-base ring-inset hover:text-primary-hover focus-visible:outline-offset-0"
                  >
                    Go to my library
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>
        <div className="sticky top-20 mt-5 space-y-4">
          <section aria-labelledby="trending-heading">
            <div>
              <div className="p-6">
                <h2
                  id="trending-heading"
                  className="body2SemiBold mb-4 text-center text-neutral-600"
                >
                  Discover more topics
                </h2>
                <div className="flex flex-wrap justify-center gap-2 px-14">
                  {topics.map((topic) => (
                    <p
                      key={topic.id}
                      className="cursor-pointer px-2 py-1 text-neutral-400 hover:text-neutral-500"
                    >
                      <a href={topic.href}>{topic.name}</a>
                    </p>
                  ))}
                </div>
                <div className="mt-8 px-7 text-left">
                  <div className="flex items-center">
                    <Image
                      className="h-7 w-auto cursor-pointer"
                      src={postfolioLogo}
                      alt="Your Company Icon"
                    />
                    <p className="caption2Light p-2 text-text-black-secondary hover:text-text-black-primary">
                      © 2024
                    </p>
                  </div>
                  <p className="caption2Light p-2 text-text-black-secondary hover:text-text-black-primary">
                    All your favorite posts in one place
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </aside>
    </>
  )
}

export default RightSideNav

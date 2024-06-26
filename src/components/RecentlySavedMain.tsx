import Image from 'next/image'

import { recentlySaved } from '@/constants/dummyData'

const RecentlySavedMain = () => {
  return (
    <>
      <div className="px-4 sm:px-0">
        <div className="mb-4 xl:hidden">
          <nav
            className="isolate flex divide-x divide-gray-200 rounded-lg"
            aria-label="Tabs"
          >
            <div className="w-full space-y-4">
              <section aria-labelledby="who-to-follow-heading">
                <div className="rounded-lg bg-white shadow">
                  <div className="px-8 py-5">
                    <div className="xs:block w-full sm:flex md:flex lg:flex">
                      <h2 className="xs:text-left bodyMedium block w-full text-text-black-primary sm:text-left md:text-left lg:text-left">
                        Recently saved posts
                      </h2>
                      <a
                        href="#"
                        className="captionRegular xs:text-left block w-full rounded-md text-sm text-primary-base ring-inset hover:text-primary-hover focus-visible:outline-offset-0 sm:text-right md:text-right lg:text-right"
                      >
                        Go to my library
                      </a>
                    </div>
                    <div className="xs:mt-4 mt-6 sm:mt-4 md:mt-4 lg:mt-6">
                      <div className="align-center hidden lg:flex">
                        {recentlySaved.map((saved) => (
                          <div
                            key={saved.id}
                            className="group relative flex cursor-pointer"
                          >
                            <div className="h-auto max-h-12 w-20 flex-shrink-0 cursor-pointer overflow-hidden rounded-lg group-hover:opacity-75">
                              <Image
                                src={saved.imageUrl}
                                alt="saved"
                                width={500}
                                height={500}
                                style={{
                                  objectFit: 'cover',
                                  objectPosition: 'center',
                                }}
                              />
                            </div>
                            <div className="ml-2 flex max-w-48 flex-col justify-center overflow-hidden pr-4">
                              <h3 className="captionMedium max-h-12 overflow-hidden text-text-black-primary">
                                <a href="#">{saved.description}</a>
                              </h3>
                              <p className="captionRegular text-text-black-secondary">
                                {saved.platform}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="hidden md:flex lg:hidden">
                        {recentlySaved.map((saved) => (
                          <div
                            key={saved.id}
                            className="group relative flex cursor-pointer"
                          >
                            <div className="h-auto max-h-12 w-20 flex-shrink-0 cursor-pointer overflow-hidden rounded-lg group-hover:opacity-75">
                              <Image
                                src={saved.imageUrl}
                                alt="saved"
                                width={500}
                                height={500}
                                style={{
                                  objectFit: 'cover',
                                  objectPosition: 'center',
                                }}
                              />
                            </div>
                            <div className="ml-2 flex max-w-48 flex-col justify-center overflow-hidden pr-4">
                              <h3 className="captionMedium max-h-12 overflow-hidden text-text-black-primary">
                                <a href="#">{saved.description}</a>
                              </h3>
                              <p className="captionRegular text-text-black-secondary">
                                {saved.platform}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="hidden sm:flex md:hidden lg:hidden">
                        {recentlySaved.length > 1 && (
                          <div className="relative flex ">
                            <div
                              key={recentlySaved[0].id}
                              className="group relative flex cursor-pointer"
                            >
                              <div className="h-auto max-h-12 w-20 flex-shrink-0 cursor-pointer overflow-hidden rounded-lg group-hover:opacity-75">
                                <Image
                                  src={recentlySaved[0].imageUrl}
                                  alt="saved"
                                  width={500}
                                  height={500}
                                  style={{
                                    objectFit: 'cover',
                                    objectPosition: 'center',
                                  }}
                                />
                              </div>
                              <div className="ml-2 flex max-w-48 flex-col justify-center overflow-hidden pr-4">
                                <h3 className="captionMedium max-h-12 overflow-hidden text-text-black-primary">
                                  <a href="#">{recentlySaved[0].description}</a>
                                </h3>
                                <p className="captionRegular text-text-black-secondary">
                                  {recentlySaved[0].platform}
                                </p>
                              </div>
                            </div>

                            <div
                              key={recentlySaved[1].id}
                              className="group relative flex cursor-pointer"
                            >
                              <div className="h-auto max-h-12 w-20 flex-shrink-0 cursor-pointer overflow-hidden rounded-lg group-hover:opacity-75">
                                <Image
                                  src={recentlySaved[1].imageUrl}
                                  alt="saved"
                                  width={500}
                                  height={500}
                                  style={{
                                    objectFit: 'cover',
                                    objectPosition: 'center',
                                  }}
                                />
                              </div>
                              <div className="ml-2 flex max-w-48 flex-col justify-center overflow-hidden pr-4">
                                <h3 className="captionMedium max-h-12 overflow-hidden text-text-black-primary">
                                  <a href="#">{recentlySaved[1].description}</a>
                                </h3>
                                <p className="captionRegular text-text-black-secondary">
                                  {recentlySaved[1].platform}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex sm:hidden">
                        {recentlySaved.length > 0 && (
                          <div
                            key={recentlySaved[0].id}
                            className="group relative flex cursor-pointer"
                          >
                            <div className="h-auto max-h-12 w-20 flex-shrink-0 cursor-pointer overflow-hidden rounded-lg group-hover:opacity-75">
                              <Image
                                src={recentlySaved[0].imageUrl}
                                alt="saved"
                                width={500}
                                height={500}
                                style={{
                                  objectFit: 'cover',
                                  objectPosition: 'center',
                                }}
                              />
                            </div>
                            <div className="ml-2 flex w-auto flex-col justify-center overflow-hidden">
                              <h3 className="captionMedium max-h-12 overflow-hidden text-text-black-primary">
                                <a href="#">{recentlySaved[0].description}</a>
                              </h3>
                              <p className="captionRegular text-text-black-secondary">
                                {recentlySaved[0].platform}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </nav>
        </div>
      </div>
    </>
  )
}

export default RecentlySavedMain
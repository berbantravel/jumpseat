'use client'

import Image from 'next/image'
import { usePathname } from 'next/navigation'

import {
  myProfile,
  settings,
  navigation as navData,
  categories,
  filters,
} from '@/constants/dummyData'
import { Squares2X2Icon, PlusIcon } from '@heroicons/react/24/outline'

function classNames(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

const LeftSideNav = () => {
  const pathname = usePathname()
  const isLibraryPage = pathname === '/my-library'

  const navigation = navData.map((item) => {
    if (isLibraryPage) {
      return {
        ...item,
        current: item.name === 'My Library',
      }
    } else {
      return {
        ...item,
        current: item.name === 'Home',
      }
    }
  })

  return (
    <>
      <div className="hidden lg:col-span-2 lg:block xl:col-span-2">
        <nav
          aria-label="Sidebar"
          className={classNames(
            isLibraryPage ? 'pt-4' : 'pt-0',
            'divide-y divide-gray-300',
          )}
        >
          <div className="pb-4">
            {/* HIDE PROFILE WHEN IN MY LIBRARY PAGE */}
            {!isLibraryPage &&
              myProfile.map((profile: any) => (
                <div
                  key={profile.id}
                  className="flex flex-col items-center justify-center space-y-3 px-6 py-6"
                >
                  <div className="flex-shrink-0">
                    <Image
                      src={profile.imageUrl}
                      alt="saved"
                      width={500}
                      height={500}
                      style={{
                        objectFit: 'cover',
                        objectPosition: 'center',
                        borderRadius: '50%',
                        flexShrink: 0,
                        width: '96px',
                        height: '96px',
                      }}
                    />
                  </div>
                  <div className="text-center">
                    <p className="body2Medium cursor-pointer text-text-black-primary">
                      {profile.name}
                    </p>
                    <p className="captionRegular cursor-pointer text-secondary-base">
                      {profile.handle}
                    </p>
                  </div>
                </div>
              ))}
            <div>
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    item.current
                      ? 'bg-primary-background text-primary-base'
                      : 'text-text-black-primary hover:bg-neutral-50',
                    'body2Regular group flex items-center rounded-full px-5 py-2 text-sm',
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  <item.icon
                    className={classNames(
                      item.current
                        ? 'text-primary-base'
                        : 'text-secondary-base group-hover:text-neutral-900',
                      '-ml-1 mr-3 h-6 w-6 flex-shrink-0',
                    )}
                    aria-hidden="true"
                  />
                  <span className="truncate">{item.name}</span>
                </a>
              ))}
            </div>
          </div>

          {/* HIDE CATEGORIES NAV WHEN NOT IN MY LIBRARY PAGE*/}
          {isLibraryPage && (
            <div className="pb-4">
              <div className="pt-4">
                <div
                  key="1"
                  className="body2Medium group flex items-center rounded-full px-5 py-2 text-text-black-primary hover:bg-neutral-50"
                >
                  <span className="truncate text-sm">All Categories</span>
                  <PlusIcon className="ml-3 h-5 w-5 flex-shrink-0 text-neutral-800" />
                </div>
                <div
                  key="1"
                  className="body2Regular group flex cursor-pointer items-center rounded-full px-5 py-2 text-text-black-primary hover:bg-neutral-50"
                >
                  <Squares2X2Icon className="-ml-1 mr-3 h-6 w-6 flex-shrink-0 text-secondary-base group-hover:text-neutral-900" />
                  <span className="truncate text-sm">All Categories</span>
                </div>
                {categories.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      item.current
                        ? 'bg-primary-background text-primary-base'
                        : 'text-text-black-primary hover:bg-neutral-50',
                      'captionRegular group flex items-center rounded-full px-5 py-2',
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    <span className="truncate">{item.name}</span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* HIDE FILTERS NAV WHEN NOT IN MY LIBRARY PAGE*/}
          {isLibraryPage && (
            <div className="pb-4">
              <div className="pt-4">
                <div
                  key="1"
                  className="body2Medium group flex items-center rounded-full px-5 py-2 text-text-black-primary hover:bg-neutral-50"
                >
                  <span className="truncate text-sm">Filters</span>
                </div>
                <div className="pb-0">
                  <div className="pt-0">
                    {filters.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? 'text-primary-base'
                            : 'text-text-black-primary hover:bg-neutral-50',
                          'body2Regular group flex items-center rounded-full px-5 py-2 text-sm',
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        <item.icon
                          className={classNames(
                            item.current
                              ? 'text-primary-base'
                              : 'text-secondary-base group-hover:text-neutral-900',
                            '-ml-1 mr-3 h-5 w-5 flex-shrink-0',
                          )}
                          aria-hidden="true"
                        />
                        <span className="truncate">{item.name}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="pt-0">
            <div className="mt-4" aria-labelledby="communities-headline">
              {settings.map((setting) => (
                <a
                  key={setting.name}
                  href={setting.href}
                  className="body2Regular group flex items-center rounded-md px-3 py-1 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                >
                  <span className="truncate">{setting.name}</span>
                </a>
              ))}
            </div>
          </div>
        </nav>
      </div>
    </>
  )
}

export default LeftSideNav
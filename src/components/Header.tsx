'use client'

import { Fragment, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'
import { usePathname } from 'next/navigation'
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
  Popover,
} from '@headlessui/react'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { Bars3Icon, ChevronLeftIcon } from '@heroicons/react/24/outline'
import jumpseatLogo from '@/images/logos/jumpseat-logo.png'
import jumpseatIcon from '@/images/logos/jumpseat-icon.png'

const navigation = [
  { name: "Let's Plan Your Trip!", href: '/lets-plan-your-trip' },
  { name: 'Experiences', href: '/experiences' },
  { name: 'Who We Are', href: '/who-we-are' },
  { name: 'Inspirations', href: '/inspirations' },
  { name: 'Get In Touch', href: '/get-in-touch' },
]

function classNames(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}

function DesktopNavigation(props: React.ComponentPropsWithoutRef<'nav'>) {
  const currentPath = usePathname()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false)
    }
  }

  useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isDropdownOpen])

  const isCurrent = (href: string) => href === currentPath

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      <Popover
        as="nav"
        aria-label="Global"
        className={classNames(
          'fixed z-50 w-full transition-colors duration-300',
          scrolled ? 'bg-white' : 'bg-transparent',
        )}
      >
        {({ open: popoverOpen }) => (
          <>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="relative flex justify-between lg:gap-8 xl:grid xl:grid-cols-12">
                <div className="flex md:absolute md:inset-y-0 md:left-0 lg:static xl:col-span-2">
                  <div className="flex flex-shrink-0 items-center">
                    <div className="mr-5 flex">
                      <Popover.Button
                        className="hover relative -mx-2 inline-flex items-center justify-center rounded-md p-2 text-[#555555]"
                        onClick={() => setOpen(true)}
                      >
                        <span className="absolute -inset-0.5" />
                        <span className="sr-only">Open menu</span>
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      </Popover.Button>
                    </div>
                    <a href="/">
                      <div className="lg:hidden">
                        <Image
                          className="h-8 w-auto"
                          src={jumpseatIcon}
                          alt="Your Company"
                        />
                      </div>
                      <div className="hidden lg:block">
                        <Image
                          className="h-8 w-auto"
                          src={jumpseatLogo}
                          alt="Your Company Icon"
                        />
                      </div>
                    </a>
                  </div>
                </div>
                <div className="min-w-0 flex-1 md:px-8 lg:col-span-8 lg:px-0">
                  <div className="flex items-center px-6 py-4 md:mx-10 lg:mx-10 lg:max-w-none xl:px-10">
                    <div className="w-full">
                      <label htmlFor="search" className="sr-only">
                        Search
                      </label>
                      <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <MagnifyingGlassIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </div>
                        <input
                          id="search"
                          name="search"
                          className="block w-full rounded-md border-0 bg-white py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                          placeholder="Meet Asia..."
                          type="search"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="my-2.5 flex lg:flex lg:items-center lg:justify-end xl:col-span-2">
                  <button
                    type="button"
                    className="rounded-md bg-[#565555] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-slate-800"
                  >
                    Let&apos;s Plan Your Trip!
                  </button>
                </div>
              </div>
            </div>
            <Transition show={open} as={Fragment}>
              <Dialog
                as="div"
                className="relative z-50"
                onClose={() => setOpen(false)}
              >
                <TransitionChild
                  enter="ease-in-out duration-500"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-500"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </TransitionChild>
                <div className="fixed inset-0 overflow-hidden">
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="pointer-events-none fixed inset-y-0 left-0 flex max-w-full">
                      <TransitionChild
                        enter="transform transition ease-in-out duration-500 sm:duration-700"
                        enterFrom="-translate-x-full"
                        enterTo="translate-x-0"
                        leave="transform transition ease-in-out duration-500 sm:duration-700"
                        leaveFrom="translate-x-0"
                        leaveTo="-translate-x-full"
                      >
                        <DialogPanel className="pointer-events-auto relative w-screen max-w-xs">
                          <TransitionChild
                            enter="ease-in-out duration-500"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in-out duration-500"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <div className="absolute right-0 top-0 -mr-8 flex pr-2 pt-4 sm:-mr-10 sm:pr-4">
                              <button
                                type="button"
                                className="hover relative rounded-full bg-white p-3.5 text-black"
                                onClick={() => setOpen(false)}
                              >
                                <span className="absolute -inset-2.5" />
                                <span className="sr-only">Close panel</span>
                                <ChevronLeftIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </button>
                            </div>
                          </TransitionChild>
                          <div className="flex h-full flex-col items-center justify-center overflow-y-auto bg-white py-6 shadow-xl">
                            <nav className="space-y-4 text-center">
                              {navigation.map((item) => (
                                <ul
                                  role="list"
                                  className="-mx-2 space-y-1"
                                  key={item.name}
                                >
                                  <li key={item.name}>
                                    <a
                                      href={item.href}
                                      className={classNames(
                                        isCurrent(item.href)
                                          ? 'bg-gray-50'
                                          : 'hover',
                                        'block rounded-md py-2 pl-10 pr-10 text-sm font-semibold leading-6 text-gray-700',
                                      )}
                                    >
                                      {item.name}
                                    </a>
                                  </li>
                                </ul>
                              ))}
                            </nav>
                          </div>
                        </DialogPanel>
                      </TransitionChild>
                    </div>
                  </div>
                </div>
              </Dialog>
            </Transition>
          </>
        )}
      </Popover>
    </>
  )
}

export function Header() {
  return (
    <>
      <header
        className="fixed z-50 flex w-full flex-none flex-col"
        style={{
          height: 'var(--header-height)',
          marginBottom: 'var(--header-mb)',
        }}
      >
        <div className="w-full">
          <DesktopNavigation className="md:block" />
        </div>
      </header>
    </>
  )
}

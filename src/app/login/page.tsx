'use client'

import Image from 'next/image'
import React, { useState } from 'react'

import Link from 'next/link'

import postfolioIcon from '@/images/logos/postfolio-logo-icon.png'

export default function Login() {
  return (
    <>
      {/* CONTAINER */}
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="mx-auto flex h-screen w-full max-w-xl items-center justify-center rounded-lg bg-white shadow-sm sm:max-h-[600px]">
          <div className="mx-auto grid max-w-3xl grid-cols-1 rounded-lg lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-1">
            <div className="space-y-6 lg:col-span-2 lg:col-start-1">
              <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                  <Image
                    className="mx-auto h-14 w-auto"
                    src={postfolioIcon}
                    alt="Your Company"
                  />
                  <h2 className="heading2SemiBold mt-5 text-center text-3xl text-gray-900">
                    Log In
                  </h2>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-4 sm:mx-auto sm:w-full sm:max-w-sm">
                  <a
                    href="#"
                    className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent"
                  >
                    <svg
                      className="h-5 w-5"
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z"
                        fill="#EA4335"
                      />
                      <path
                        d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z"
                        fill="#4285F4"
                      />
                      <path
                        d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z"
                        fill="#34A853"
                      />
                    </svg>
                    <span className="body2Light text-sm">
                      Continue with Google
                    </span>
                  </a>

                  <div className="relative">
                    <div
                      className="absolute inset-0 flex items-center"
                      aria-hidden="true"
                    >
                      <div className="w-full border-t border-gray-200" />
                    </div>
                    <div className="body2Light relative flex justify-center">
                      <span className="bg-white px-6 text-gray-900">or</span>
                    </div>
                  </div>
                </div>

                <div className="mt-1 sm:mx-auto sm:w-full sm:max-w-sm">
                  <form className="space-y-2" action="#" method="POST">
                    <div>
                      {/* <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Email address
                    </label> */}
                      <div className="mt-2">
                        <input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          placeholder="Email"
                          required
                          className="body2Light block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between">
                        {/* <label
                        htmlFor="password"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Password
                      </label> */}
                      </div>
                      <div className="mt-2">
                        <input
                          id="password"
                          name="password"
                          type="password"
                          placeholder="Password"
                          autoComplete="current-password"
                          required
                          className="body2Light block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>

                      <div className="flex items-end justify-end">
                        <div className="mt-2 text-sm">
                          <a
                            href="#"
                            className="body2Medium text-sm text-primary-base hover:text-primary-hover"
                          >
                            Forgot password?
                          </a>
                        </div>
                      </div>
                    </div>

                    <div>
                      <button
                        type="submit"
                        className="body2Medium mt-4 flex w-full justify-center rounded-full bg-primary-base px-3 py-2 text-white shadow-sm hover:bg-primary-hover"
                      >
                        <Link href={'/'}>Continue</Link>
                      </button>
                    </div>
                  </form>

                  <p className="body2Light mt-4 text-left text-text-black-primary">
                    Don&apos;t have an account yet?{' '}
                    <Link
                      href={'sign-up'}
                      className="body2SemiBold ml-1 text-primary-base hover:text-primary-hover"
                    >
                      Sign Up
                    </Link>
                  </p>

                  <div className="flex items-center justify-center text-center">
                    <div className="mt-5 text-sm">
                      <a
                        href="#"
                        className="body2Light text-sm text-neutral-500 hover:text-primary-hover"
                      >
                        By proceeding, you agree to: Postfolio&apos;s Terms of
                        Service and Privacy Notice.
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

'use client'
import React from 'react'

export default function Map() {
  return (
    <div className="pt-16 sm:pt-20 lg:pt-28">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2">
            <div>
              {/* White Container */}
              <div className="rounded-lg bg-white p-8">
                {/* Map Column with Shadow Effect */}
                <div className="group relative w-full transition-transform duration-300">
                  {/* Background gray shape */}
                  <div className="absolute inset-0 -translate-y-3 translate-x-3 rounded-lg bg-gray-200"></div>

                  {/* Map container */}
                  <div className="relative z-10 h-[400px] overflow-hidden rounded-lg shadow-xl">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9125.511421364448!2d120.32557199374683!3d15.919287765649198!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33915b2783ad2877%3A0x98fffb16d9bcb356!2sSan%20Juan%2C%20San%20Carlos%20City%2C%20Pangasinan!5e0!3m2!1sen!2sph!4v1737731031989!5m2!1sen!2sph"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="absolute inset-0"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information Column */}

            <div className="lg:pl-8">
              <div className="mx-0 max-w-xl">
                <p className="text-left text-base font-normal tracking-tight text-gray-400">
                  Questions?
                </p>
                <h2 className="mb-6 text-left text-3xl font-medium tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
                  Get in touch
                </h2>
                <div className="mb-6 h-[2px] w-56 justify-self-start bg-gray-300"></div>
                <div className="mt-0 flex flex-col gap-4 text-start">
                  <div>
                    <p className="text-lg text-gray-600">
                      We are based in Pangasinan, Philippines.
                    </p>
                  </div>

                  <div>
                    <h4 className=" text-black">Drop by and visit us at:</h4>
                    <p className="mt-2 font-semibold text-black">
                      Don Sergio, Barangay San Juan, San Carlos City, Pangasinan 2420
                    </p>
                  </div>

                  <div>
                    <h4 className=" text-gray-900">or email us at:</h4>
                    <a
                      href="mailto:mabuhay@jumpseattours.com"
                      className="font-semibold text-[#ff9e39] hover:text-[#ff9e39]/90"
                    >
                     mabuhay@jumpseattours.com
                    </a>
                  </div>

                  <div>
                    <h4 className=" text-gray-900">Write to us:</h4>
                    <p className="mt-0 text-gray-600">
                      Jumpseat, San Carlos City 2422 Philippines
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

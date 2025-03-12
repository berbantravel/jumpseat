import Link from 'next/link'
import Image, { type ImageProps } from 'next/image'

import postfolioLogo from '@/images/logos/postfolio-logo-blue.png'
import jumpseatLogo from '@/images/logos/jumpseat-logo.png'
import jumpseatLogoWhite from '@/images/logos/jumpseat-logo-white.png'
import MainBerbanLogo from '@/images/logos/berbanSuitcase.png'
import { FaPhoneAlt } from "react-icons/fa";
import { CiGlobe } from "react-icons/ci";
import {
  BellIcon,
  XMarkIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline'
import { CiMail } from "react-icons/ci";

import whatsapp from '@/images/logos/whatsapp.png'
import viber from '@/images/logos/viber.png'
import kakaotalk from '@/images/logos/kakaotalk.png'

function classNames(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

function NavLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className="transition hover:text-teal-500 dark:hover:text-teal-400"
    >
      {children}
    </Link>
  )
}

const navigation = {
  ourPracticalGuide: [
    { name: 'Meet Asia', href: '#' },
    { name: 'What To Pack', href: '#' },
    { name: 'Terms & Conditions', href: '#' },
    { name: 'Privacy Policy', href: '#' },
  ],
  ourDestinations: [
    { name: 'South Korea', href: '#' },
    { name: 'Taiwan', href: '#' },
    { name: 'Japan', href: '#' },
    { name: 'Thailand', href: '#' },
    { name: 'Singapore', href: '#' },
    { name: 'The Philippines', href: '#' },
    { name: 'Hong Kong', href: '#' },
    { name: 'Malaysia', href: '#' },
    { name: 'Indonesia', href: '#' },
  ],
  connectWithUs: [
    {
      name: 'Facebook',
      href: '#',
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: 'Instagram',
      href: '#',
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: 'X',
      href: '#',
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z" />
        </svg>
      ),
    },
    {
      name: 'YouTube',
      href: '#',
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ],
}

export function Footer() {
  return (
    <footer className="mt-0 shadow-sm" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mt-0">
        <div className="relative flex h-40 w-full bg-white">
          <div className="flex h-full w-1/2 bg-transparent"></div>
          <div className="flex h-full w-1/2 bg-[#c57c30]"></div>
        </div>
        <div
          className="relative isolate -mt-40 overflow-hidden py-28"
          style={{
            clipPath: 'polygon(50% 0%, 100% 2%, 100% 100%, 0 100%, 0 2%)',
            backgroundColor: '#ff9e39',
          }}
        >
          <div className="mx-auto max-w-7xl px-6 pb-8 pt-14 lg:px-8">
            <div className="xl:grid xl:grid-cols-3 xl:gap-8">
              <div className="space-y-4 xl:col-span-1">
                <div className="flex items-center">
                  <Image
                    className="h-12 w-auto cursor-pointer"
                    src={jumpseatLogoWhite}
                    alt="Your Company Icon"
                  />
                  <p className="caption2Light p-2 text-white hover:text-text-white-primary">
                    © 2024
                  </p>
                </div>
                <div className="flex items-center sm:items-start flex-row">
                  <Image
                    className="h-8 w-auto cursor-pointer"
                    src={MainBerbanLogo}
                    alt="Your Company Icon"
                  />
                  <p className="caption2Light px-2 text-white hover:text-text-white-primary text-xs">
                  © Operated and Powered by BerBan Travel Corporation
                  </p>
                </div>
              </div>
              <div className="mt-16 grid grid-cols-1 gap-8 sm:gap-2 lg:gap-8 sm:grid-cols-2 md:grid-cols-4 xl:col-span-2 xl:mt-0">
                <div className="md:grid md:grid-cols-1 md:gap-6">
                  <div className='w-fit'>
                    <h3 className="body2Medium text-white hover:text-text-white-primary">
                      Our Practical Guide
                    </h3>
                    <ul role="list" className="mt-4 space-y-3">
                      {navigation.ourPracticalGuide.map((item) => (
                        <li key={item.name}>
                          <a
                            href={item.href}
                            className="body2Regular text-sm text-white hover:text-text-white-primary"
                          >
                            {item.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="md:grid md:grid-cols-1 md:gap-8">
                  <div>
                    <h3 className="body2Medium text-white hover:text-text-white-primary">
                      Our Destinations
                    </h3>
                    <ul role="list" className="mt-4 space-y-3">
                      {navigation.ourDestinations.map((item) => (
                        <li key={item.name}>
                          <a
                            href={item.href}
                            className="body2Regular text-sm text-white hover:text-text-white-primary"
                          >
                            {item.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="md:grid md:grid-cols-1 md:gap-8">
                  <div>
                    <h3 className="body2Medium text-white hover:text-text-white-primary">
                      Connect With Us
                    </h3>
                    <div className="mt-4 flex space-x-3">
                      {navigation.connectWithUs.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className="text-white hover:text-text-white-primary"
                        >
                          <span className="sr-only">{item.name}</span>
                          <item.icon className="h-6 w-6" aria-hidden="true" />
                        </a>
                      ))}
                    </div>
                    <ul role="list" className="mt-4 space-y-3">
                      <li>
                        <a
                          href="#"
                          className="body2Regular text-sm text-white hover:text-text-white-primary"
                        >
                          Partner With Us
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="body2Regular text-sm text-white hover:text-text-white-primary"
                        >
                          Let&apos;s Plan Your Trip
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="md:grid md:grid-cols-1 md:gap-8">
                  <div>
                    <h3 className="body2Medium text-white hover:text-text-white-primary">
                      Get In Touch
                    </h3>
                    <ul role="list" className="mt-4 space-y-3">
                      <ul role="list" className="mt-4 space-y-3">
                        <li>
                          <a
                            href="#"
                            className="captionRegular text-white hover:text-text-white-primary"
                          >
                            Address: Don Sergio, Barangay San Juan, San Carlos
                            City, Pangasinan 2420
                          </a>
                        </li>
                        <li className="flex items-center justify-start">
                          <FaPhoneAlt
                            className="mr-2 h-6 w-6 rounded-full border-[1.5px] p-[2px] border-black  bg-white"
                          />
                          <a
                            href="#"
                            className="captionRegular text-white hover:text-text-white-primary"
                          >
                            +63-946-513-8472
                          </a>
                        </li>
                        <li className="flex items-center justify-start">
                          <Image
                            className="mr-2 h-7 w-auto cursor-pointer"
                            src={whatsapp}
                            alt="Your Company Icon"
                          />
                          <a
                            href="#"
                            className="captionRegular text-white hover:text-text-white-primary"
                          >
                           +63-995-015-8869
                          </a>
                        </li>
                        <li className="flex items-center justify-start">
                          <Image
                            className="mr-2 h-7 w-auto cursor-pointer"
                            src={viber}
                            alt="Your Company Icon"
                          />
                          <a
                            href="#"
                            className="captionRegular text-white hover:text-text-white-primary"
                          >
                           +63-918-746-6894
                          </a>
                        </li>
                        {/* <li className="flex items-center justify-start">
                          <Image
                            className="mr-2 h-6 w-auto cursor-pointer"
                            src={kakaotalk}
                            alt="Your Company Icon"
                          />
                          <a
                            href="#"
                            className="captionRegular text-white hover:text-text-white-primary"
                          >
                            +63-912-746-6894
                          </a>  
                        </li> */}
                         <li className="flex items-center justify-start">
                          
                         <a
                            href="mailto:mabuhay@jumpseattours.com"
                            className="captionRegular text-white hover:text-text-white-primary flex items-center gap-1"
                          >
                            <CiMail className="mr-1 h-6 w-6 text-wrap flex flex-wrap" />
                            mabuhay@jumpseattours.com
                          </a>
                        </li>
                       
                        <li className="flex items-center justify-start">
                          <CiGlobe
                            className="mr-1 h-6 w-6 text-white"
                          />
                          <a
                            href="/"
                            className="captionRegular text-white hover:text-text-white-primary"
                          >
                          www.jumpseattours.com
                          </a>
                        </li>
                        
                      </ul>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-14 border-t border-gray-900/10 pt-8">
              <p className="captionLight cursor-pointer text-white hover:text-text-white-primary">
                &copy; Operated and Powered by BerBan Travel Corporation
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

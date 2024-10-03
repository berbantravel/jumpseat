'use client'

import { Fragment, useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import {
  Dialog,
  DialogPanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  Radio,
  RadioGroup,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from '@headlessui/react'
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  QuestionMarkCircleIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import {
  CheckCircleIcon,
  ChevronDownIcon,
  TrashIcon,
} from '@heroicons/react/20/solid'

const currencies = ['CAD', 'USD', 'AUD', 'EUR', 'GBP']
const navigation = {
  categories: [
    {
      name: 'Women',
      featured: [
        {
          name: 'New Arrivals',
          href: '#',
          imageSrc:
            'https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg',
          imageAlt:
            'Models sitting back to back, wearing Basic Tee in black and bone.',
        },
        {
          name: 'Basic Tees',
          href: '#',
          imageSrc:
            'https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg',
          imageAlt:
            'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
        },
        {
          name: 'Accessories',
          href: '#',
          imageSrc:
            'https://tailwindui.com/img/ecommerce-images/mega-menu-category-03.jpg',
          imageAlt:
            'Model wearing minimalist watch with black wristband and white watch face.',
        },
        {
          name: 'Carry',
          href: '#',
          imageSrc:
            'https://tailwindui.com/img/ecommerce-images/mega-menu-category-04.jpg',
          imageAlt:
            'Model opening tan leather long wallet with credit card pockets and cash pouch.',
        },
      ],
    },
    {
      name: 'Men',
      featured: [
        {
          name: 'New Arrivals',
          href: '#',
          imageSrc:
            'https://tailwindui.com/img/ecommerce-images/mega-menu-01-men-category-01.jpg',
          imageAlt:
            'Hats and sweaters on wood shelves next to various colors of t-shirts on hangers.',
        },
        {
          name: 'Basic Tees',
          href: '#',
          imageSrc:
            'https://tailwindui.com/img/ecommerce-images/mega-menu-01-men-category-02.jpg',
          imageAlt: 'Model wearing light heather gray t-shirt.',
        },
        {
          name: 'Accessories',
          href: '#',
          imageSrc:
            'https://tailwindui.com/img/ecommerce-images/mega-menu-01-men-category-03.jpg',
          imageAlt:
            'Grey 6-panel baseball hat with black brim, black mountain graphic on front, and light heather gray body.',
        },
        {
          name: 'Carry',
          href: '#',
          imageSrc:
            'https://tailwindui.com/img/ecommerce-images/mega-menu-01-men-category-04.jpg',
          imageAlt:
            'Model putting folded cash into slim card holder olive leather wallet with hand stitching.',
        },
      ],
    },
  ],
  pages: [
    { name: 'Company', href: '#' },
    { name: 'Stores', href: '#' },
  ],
}
const products = [
  {
    id: 1,
    title: 'Basic Tee',
    href: '#',
    price: '$32.00',
    color: 'Black',
    size: 'Large',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/checkout-page-02-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
  },
  // More products...
]
const deliveryMethods = [
  {
    id: 1,
    title: 'Standard',
    turnaround: '4–10 business days',
    price: '$5.00',
  },
  { id: 2, title: 'Express', turnaround: '2–5 business days', price: '$16.00' },
]
const paymentMethods = [{ id: 'credit-card', title: 'Credit card' }]
const footerNavigation = {
  products: [
    { name: 'Bags', href: '#' },
    { name: 'Tees', href: '#' },
    { name: 'Objects', href: '#' },
    { name: 'Home Goods', href: '#' },
    { name: 'Accessories', href: '#' },
  ],
  company: [
    { name: 'Who we are', href: '#' },
    { name: 'Sustainability', href: '#' },
    { name: 'Press', href: '#' },
    { name: 'Careers', href: '#' },
    { name: 'Terms & Conditions', href: '#' },
    { name: 'Privacy', href: '#' },
  ],
  customerService: [
    { name: 'Contact', href: '#' },
    { name: 'Shipping', href: '#' },
    { name: 'Returns', href: '#' },
    { name: 'Warranty', href: '#' },
    { name: 'Secure Payments', href: '#' },
    { name: 'FAQ', href: '#' },
    { name: 'Find a store', href: '#' },
  ],
}

function CheckoutContent() {
  const searchParams = useSearchParams()
  const [productDetails, setProductDetails] = useState({
    id: '',
    name: '',
    price: 0,
    imageSrc: '',
  })
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    const productId = searchParams.get('productId')
    const productName = searchParams.get('productName')
    const productPrice = searchParams.get('productPrice')
    const imageSrc = searchParams.get('imageSrc')

    setProductDetails({
      id: productId || '',
      name: productName || '',
      price: productPrice ? parseFloat(productPrice) : 0,
      imageSrc: imageSrc ? decodeURIComponent(imageSrc) : '',
    })
    console.log('Image source in checkout:', imageSrc)
  }, [searchParams])

  const subtotal = productDetails.price * quantity
  const total = subtotal

  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQuantity(parseInt(e.target.value, 10))
  }

  function formatPrice(price: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price)
  }

  // Move the entire JSX from the original Checkout component here
  return (
    <div className="bg-[#f8f8f8]">
      {/* Mobile menu */}
      <main className="mx-auto max-w-7xl px-4 pb-24 pt-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <h1 className="sr-only">Checkout</h1>

          <form className="lg:grid lg:grid-cols-1 lg:gap-x-12 xl:gap-x-16">
            {/* Order summary */}
            <div className="mt-10 lg:mt-0">
              <h2 className="text-lg font-medium text-gray-900">
                Order summary
              </h2>

              <div className="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">
                <h3 className="sr-only">Items in your cart</h3>
                <ul role="list" className="divide-y divide-gray-200">
                  <li
                    key={productDetails.id}
                    className="flex px-4 py-6 sm:px-6"
                  >
                    <div className="flex-shrink-0">
                      <Image
                        alt=""
                        src={productDetails.imageSrc}
                        className="w-20 rounded-md"
                        width={800}
                        height={600}
                      />
                    </div>

                    <div className="ml-6 flex flex-1 flex-col">
                      <div className="flex">
                        <div className="min-w-0 flex-1">
                          <h4 className="text-sm">
                            <div className="font-bold text-gray-700 hover:text-gray-800">
                              {productDetails.name}
                            </div>
                          </h4>
                        </div>

                        {/* <div className="ml-4 flow-root flex-shrink-0">
                  <button
                    type="button"
                    className="-m-2.5 flex items-center justify-center bg-white p-2.5 text-gray-400 hover:text-gray-500"
                  >
                    <span className="sr-only">Remove</span>
                    <TrashIcon aria-hidden="true" className="h-5 w-5" />
                  </button>
                </div> */}
                      </div>

                      <div className="flex flex-1 items-start justify-between">
                        <p className="mt-1 text-sm font-medium text-gray-900">
                          Php {formatPrice(productDetails.price)}/ pax
                        </p>

                        <div className="ml-4">
                          <label htmlFor="quantity" className="sr-only">
                            Quantity
                          </label>
                          <select
                            id="quantity"
                            name="quantity"
                            value={quantity}
                            onChange={handleQuantityChange}
                            className="rounded-md border border-gray-300 text-left text-base font-medium text-gray-700 shadow-sm focus:border-[#ff9e39] focus:outline-none focus:ring-1 focus:ring-[#ff9e39] sm:text-sm"
                          >
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                              <option key={num} value={num}>
                                {num}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
                <dl className="space-y-6 border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div className="flex items-center justify-between">
                    <dt className="text-sm">Subtotal</dt>
                    <dd className="text-sm font-medium text-gray-900">
                      Php {formatPrice(subtotal)}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                    <dt className="text-base font-medium">Total</dt>
                    <dd className="text-base font-medium text-gray-900">
                      Php {formatPrice(total)}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>

            <div>
              <div>
                <h2 className="mt-10 text-lg font-medium text-gray-900">
                  Contact information
                </h2>

                <div className="mt-4">
                  <label
                    htmlFor="email-address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      id="email-address"
                      name="email-address"
                      type="email"
                      autoComplete="email"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#ff9e39] focus:ring-[#ff9e39] sm:text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-10 border-t border-gray-200 pt-10">
                <h2 className="text-lg font-medium text-gray-900">
                  Shipping information
                </h2>

                <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                  <div>
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      First name
                    </label>
                    <div className="mt-1">
                      <input
                        id="first-name"
                        name="first-name"
                        type="text"
                        autoComplete="given-name"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#ff9e39] focus:ring-[#ff9e39] sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="last-name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Last name
                    </label>
                    <div className="mt-1">
                      <input
                        id="last-name"
                        name="last-name"
                        type="text"
                        autoComplete="family-name"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#ff9e39] focus:ring-[#ff9e39] sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="company"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Company
                    </label>
                    <div className="mt-1">
                      <input
                        id="company"
                        name="company"
                        type="text"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#ff9e39] focus:ring-[#ff9e39] sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Address
                    </label>
                    <div className="mt-1">
                      <input
                        id="address"
                        name="address"
                        type="text"
                        autoComplete="street-address"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#ff9e39] focus:ring-[#ff9e39] sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="apartment"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Apartment, suite, etc.
                    </label>
                    <div className="mt-1">
                      <input
                        id="apartment"
                        name="apartment"
                        type="text"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#ff9e39] focus:ring-[#ff9e39] sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium text-gray-700"
                    >
                      City
                    </label>
                    <div className="mt-1">
                      <input
                        id="city"
                        name="city"
                        type="text"
                        autoComplete="address-level2"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#ff9e39] focus:ring-[#ff9e39] sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="country"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Country
                    </label>
                    <div className="mt-1">
                      <select
                        id="country"
                        name="country"
                        autoComplete="country-name"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#ff9e39] focus:ring-[#ff9e39] sm:text-sm"
                      >
                        <option>United States</option>
                        <option>Canada</option>
                        <option>Mexico</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="region"
                      className="block text-sm font-medium text-gray-700"
                    >
                      State / Province
                    </label>
                    <div className="mt-1">
                      <input
                        id="region"
                        name="region"
                        type="text"
                        autoComplete="address-level1"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#ff9e39] focus:ring-[#ff9e39] sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="postal-code"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Postal code
                    </label>
                    <div className="mt-1">
                      <input
                        id="postal-code"
                        name="postal-code"
                        type="text"
                        autoComplete="postal-code"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#ff9e39] focus:ring-[#ff9e39] sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Phone
                    </label>
                    <div className="mt-1">
                      <input
                        id="phone"
                        name="phone"
                        type="text"
                        autoComplete="tel"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#ff9e39] focus:ring-[#ff9e39] sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
                <div className="relative mt-10 flex items-start">
                  <div className="flex h-6 items-center">
                    <input
                      id="offers"
                      name="offers"
                      type="checkbox"
                      aria-describedby="offers-description"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div className="ml-3 text-sm leading-6">
                    <label
                      htmlFor="offers"
                      className="font-medium text-gray-900"
                    >
                      Terms and Conditions
                    </label>
                    <p id="offers-description" className="text-gray-500">
                      I certify that I have read and accept the Terms of Use and
                      Privacy Statement and I have read and understand the Rate
                      Description and Rate Rules for my reservation. I am at
                      least 18 years of age and at least one guest in my party
                      will meet the minimum check-in age requirement for the
                      hotel upon arrival. Minimum Check-ln Age: 18
                    </p>
                  </div>
                </div>
                <div className="mt-10 border-t border-gray-200 py-6">
                  <button
                    type="submit"
                    className="w-full rounded-md border border-transparent bg-[#ff9e39] px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-[#ff9e39] focus:outline-none focus:ring-2 focus:ring-[#ff9e39] focus:ring-offset-2 focus:ring-offset-gray-50"
                  >
                    Confirm order
                  </button>
                </div>
              </div>

              {/* Payment */}
              {/* <div className="mt-10 border-t border-gray-200 pt-10">
                <h2 className="text-lg font-medium text-gray-900">Payment</h2>

                <fieldset className="mt-4">
                  <legend className="sr-only">Payment type</legend>
                  <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
                    {paymentMethods.map((paymentMethod, paymentMethodIdx) => (
                      <div key={paymentMethod.id} className="flex items-center">
                        {paymentMethodIdx === 0 ? (
                          <input
                            defaultChecked
                            id={paymentMethod.id}
                            name="payment-type"
                            type="radio"
                            className="h-4 w-4 border-gray-300 text-[#ff9e39] focus:ring-[#ff9e39]"
                          />
                        ) : (
                          <input
                            id={paymentMethod.id}
                            name="payment-type"
                            type="radio"
                            className="h-4 w-4 border-gray-300 text-[#ff9e39] focus:ring-[#ff9e39]"
                          />
                        )}

                        <label htmlFor={paymentMethod.id} className="ml-3 block text-sm font-medium text-gray-700">
                          {paymentMethod.title}
                        </label>
                      </div>
                    ))}
                  </div>
                </fieldset>

                <div className="mt-6 grid grid-cols-4 gap-x-4 gap-y-6">
                  <div className="col-span-4">
                    <label htmlFor="card-number" className="block text-sm font-medium text-gray-700">
                      Card number
                    </label>
                    <div className="mt-1">
                      <input
                        id="card-number"
                        name="card-number"
                        type="text"
                        autoComplete="cc-number"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#ff9e39] focus:ring-[#ff9e39] sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="col-span-4">
                    <label htmlFor="name-on-card" className="block text-sm font-medium text-gray-700">
                      Name on card
                    </label>
                    <div className="mt-1">
                      <input
                        id="name-on-card"
                        name="name-on-card"
                        type="text"
                        autoComplete="cc-name"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#ff9e39] focus:ring-[#ff9e39] sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="col-span-3">
                    <label htmlFor="expiration-date" className="block text-sm font-medium text-gray-700">
                      Expiration date (MM/YY)
                    </label>
                    <div className="mt-1">
                      <input
                        id="expiration-date"
                        name="expiration-date"
                        type="text"
                        autoComplete="cc-exp"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#ff9e39] focus:ring-[#ff9e39] sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="cvc" className="block text-sm font-medium text-gray-700">
                      CVC
                    </label>
                    <div className="mt-1">
                      <input
                        id="cvc"
                        name="cvc"
                        type="text"
                        autoComplete="csc"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#ff9e39] focus:ring-[#ff9e39] sm:text-sm"
                      />
                    </div>
                  </div>
                  
                </div>
                <div className="border-t border-gray-200 py-6">
                  <button
                    type="submit"
                    className="w-full rounded-md border border-transparent bg-[#ff9e39] px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-[#ff9e39] focus:outline-none focus:ring-2 focus:ring-[#ff9e39] focus:ring-offset-2 focus:ring-offset-gray-50"
                  >
                    Confirm order
                  </button>
                </div>
                
              </div> */}
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}

export default function Checkout() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CheckoutContent />
    </Suspense>
  )
}

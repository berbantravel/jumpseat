import Image from 'next/image'
import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { CalendarIcon, HomeIcon, TagIcon } from '@heroicons/react/24/outline'
import { travelPackages } from '@/constants/travelPackages'
import CircleLoader from '@/components/CircleLoader'

const ProductDetails = dynamic(
  () => import('../../../components/ProductDetails'),
  { ssr: false },
)

export async function generateStaticParams() {
  return Object.keys(travelPackages).map((name) => ({
    name: name,
  }))
}

export default function DestinationPage({
  params,
}: {
  params: { name: string }
}) {
  const destinationData =
    travelPackages[params.name as keyof typeof travelPackages]

  if (!destinationData) {
    return <div>Destination not found</div>
  }

  function formatPrice(price: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price)
  }

  return (
    <>
      <div className="relative isolate -mt-16 overflow-hidden py-28">
        <Image
          src={destinationData.heroImage}
          alt={`Hero image of ${destinationData.name}`}
          objectFit="cover"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
          width={800}
          height={600}
        />
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        ></div>
        <div className="mx-auto max-w-5xl py-32 sm:py-48 lg:py-56">
          <div className="pb-36 text-center">
            <h1 className="mb-4 font-poppinsSemiBold text-4xl tracking-tight text-white sm:text-7xl">
              {destinationData.name}
            </h1>
            <p className="bodyRegular mt-0 text-lg text-white">
              {destinationData.description}
            </p>
          </div>
        </div>
      </div>
      <div className="-mt-14">
        <div className="relative flex h-40 w-full bg-transparent">
          <div className="flex h-full w-1/2 bg-transparent"></div>
          <div className="flex h-full w-1/2 bg-[#565555]"></div>
        </div>
        <div
          className="relative isolate -mt-40 overflow-hidden bg-white pb-14 pt-28"
          style={{
            clipPath: 'polygon(50% 0%, 100% 10%, 100% 100%, 0 100%, 0 10%)',
            backgroundColor: '#ffffff',
          }}
        >
          <div className="mx-auto max-w-full py-32 text-center sm:py-48 lg:py-10">
            <div className="mx-auto -mt-12 max-w-7xl px-6 sm:mt-0 lg:px-8 xl:-mt-8">
              <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
                <div className="mt-6 flex flex-col items-center gap-y-20 lg:flex-row">
                  <div className="lg:w-full lg:max-w-4xl lg:flex-auto">
                    <div
                      className="text-left"
                      dangerouslySetInnerHTML={{
                        __html: destinationData.longDescription,
                      }}
                    />
                  </div>
                  <div className="lg:flex lg:flex-auto lg:justify-center">
                    <dl className="w-64 space-y-8 xl:w-80">
                      <div className="flex items-center justify-center gap-y-4">
                        <div className="flex min-w-60 items-center justify-center rounded-md px-6 py-3 ring-1 ring-gray-300">
                          <div className="mr-2">
                            <CalendarIcon className="mr-2 h-8 w-auto cursor-pointer text-gray-500" />
                          </div>
                          <div className="w-full min-w-11 text-left">
                            <dt className="text-lg font-semibold leading-7 text-[#ff9e39]">
                              Best Time to Visit
                            </dt>
                            <dd className="text-md font-normal tracking-tight text-gray-500">
                              {destinationData.bestTimeToVisit}
                            </dd>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-center gap-y-4">
                        <div className="flex min-w-60 items-center justify-center rounded-md px-6 py-3 ring-1 ring-gray-300">
                          <div className="mr-2">
                            <HomeIcon className="mr-2 h-8 w-auto cursor-pointer text-gray-500" />
                          </div>
                          <div className="w-full min-w-11 text-left">
                            <dt className="text-lg font-semibold leading-7 text-[#ff9e39]">
                              Days of Stay
                            </dt>
                            <dd className="text-md font-normal tracking-tight text-gray-500">
                              {destinationData.daysOfStay}
                            </dd>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-center gap-y-4">
                        <div className="flex min-w-60 items-center justify-center rounded-md px-6 py-3 ring-1 ring-gray-300">
                          <div className="mr-2">
                            <TagIcon className="mr-2 h-8 w-auto cursor-pointer text-gray-500" />
                          </div>
                          <div className="w-full min-w-11 text-left">
                            <dt className="text-lg font-semibold leading-7 text-[#ff9e39]">
                              Price per Person
                            </dt>
                            <dd className="text-md font-bold tracking-tight text-gray-950">
                              Php {formatPrice(destinationData.price)}
                            </dd>
                            <dd className="text-sm font-normal tracking-tight text-gray-500">
                              {destinationData.minimumGuests}
                            </dd>
                          </div>
                        </div>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-0">
        <Suspense fallback={<CircleLoader></CircleLoader>}>
          <ProductDetails
            product={{
              ...destinationData,
              imageSrc: destinationData.heroImage,
            }}
          />{' '}
        </Suspense>
      </div>
    </>
  )
}

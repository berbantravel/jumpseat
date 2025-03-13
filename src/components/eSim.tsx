// components/DataPlans.js
import Link from 'next/link'
import Image from 'next/image'
import UsaFlag from '../images/usa-flag.jpg' // Adjust the path as needed

const DataPlans = () => {
  const plans = [
    {
      data: '1 GB',
      validity: '7 Days',
      coverage: 'Philippines',
      price: '$4.50',
    },
    {
      data: '2 GB',
      validity: '15 Days',
      coverage: 'Philippines',
      price: '$7.00',
    },
    {
      data: '3 GB',
      validity: '30 Days',
      coverage: 'Philippines',
      price: '$9.50',
    },
    {
      data: '5 GB',
      validity: '30 Days',
      coverage: 'Philippines',
      price: '$13.00',
    },
    {
      data: '10 GB',
      validity: '30 Days',
      coverage: 'Philippines',
      price: '$21.00',
    },
    {
      data: '20 GB',
      validity: '30 Days',
      coverage: 'Philippines',
      price: '$32.00',
    },
  ]

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
      {' '}
      {/* Section background */}
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-wrap justify-between gap-4">
          {plans.map((plan, index) => (
            <div
              key={index}
              className="w-full rounded-lg p-6 shadow-lg sm:w-[calc(33.33%-1rem)]"
              style={{
                background: 'linear-gradient(to right, #00359F, #2364E4)',
              }}
            >
              <div className="flex items-center justify-between pb-4">
                <h3 className="text-lg font-semibold text-white">
                  {plan.data}-{plan.validity}
                </h3>
                <div className="h-full w-fit ">
                  <Image
                    src={UsaFlag}
                    alt="USA Flag"
                    width={80}
                    height={80}
                    className="rounded-lg"
                  />
                </div>
              </div>

              {/* Plan Details */}
              <div className="flex flex-col space-y-2">
                <p className="flex justify-between text-white">
                  <span className="font-semibold">Coverage:</span>{' '}
                  {plan.coverage}
                </p>
                <div className="h-[2px] w-full bg-white "></div>
                <p className="flex justify-between text-white">
                  <span className="font-semibold">Data:</span> {plan.data}
                </p>
                <div className="h-[2px] w-full bg-white "></div>
                <p className="flex justify-between text-white">
                  <span className="font-semibold">Time:</span> {plan.validity}
                </p>
                <div className="h-[2px] w-full bg-white "></div>
                <p className="flex justify-between text-white">
                  <span className="font-semibold">Price:</span> {plan.price}
                </p>
              </div>

              {/* Buy Now Button */}
              <Link href="/e-sim">
                <button className="mt-6 w-full rounded-lg bg-white px-4 py-2 font-semibold text-blue-600 transition-colors hover:bg-opacity-90">
                  Buy Now
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DataPlans

import Image from 'next/image'
import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import southKorea from '@/images/south-korea.jpg' // Make sure this import path is correct
import { CalendarIcon, HomeIcon, TagIcon } from '@heroicons/react/24/outline'

// Dynamically import the ProductDetails component with no SSR
const ProductDetails = dynamic(
  () => import('../../../components/ProductDetails'),
  { ssr: false },
)

// Dummy data (you can move this to a separate file later)
const dummyData = {
  'prosperous-hongkong': {
    name: 'Prosperous Hongkong',
    price: 20000,
    rating: 4,
    description: 'A fusion of dazzling innovation and rich tradition',
    longDescription:
      '<div class="font-bold mb-3 text-2xl">Prosperous Hongkong- Macau Guangdong 4 in 1 5D4N Tour (Sept)</div> <div class="font-semibold mb-4 text-lg">  Traveler: Family, Friends, Cultural Explorers, Tourists and Travelers</div> <div class="text-lg font-bold mb-2">Destination:</div> <div class="text-normal mb-3"> <span class="text-lg"><span class="font-medium">Guangdong</span> - is also famous for its Cantonese culture, including the Cantonese language, cuisine and traditional festivals. The Province attracts business professionals, investors, tourists, and cultural enthusiasts alike, making it a dynamic and diverse area with a global influence.</span> </div> <div class="text-normal"> <span class="text-lg"><span class="font-medium">Macau</span> - the city\'s historic center, a UNESCO World Heritage site, features beautifully preserved colonial architecture, including churches, temples, and fortresses. Macau is also known for its diverse culinary scene, combining Portuguese and Cantonese flavors, making it a haven for food lovers.</span></div>',
    bestTimeToVisit: 'September',
    listingDescription:
      ' <div class="text-xl font-bold">Tour Dates Available:</div> <div class="text-normal font-semibold"> Sept. 12-16</div> <div class="text-normal font-semibold"> Sept. 19-23</div> <div class="text-normal font-bold">Child with bed(6-17 yrs.old):same rate as adults</div> <div class="text-normal font-bold">Child without bed(2-5 yrs. old):From USD 229/pax</div>',
    daysOfStay: '5 Days & 4 Nights',
    minimumGuests: 'No Minimum Guests',
    heroImage:
      'https://images.pexels.com/photos/2410300/pexels-photo-2410300.jpeg',
    images: [
      {
        id: 1,
        name: 'Seoul Skyline',
        src: 'https://images.pexels.com/photos/237211/pexels-photo-237211.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        alt: 'Seoul city skyline',
      },
      {
        id: 2,
        name: 'Traditional Palace',
        src: 'https://images.pexels.com/photos/373290/pexels-photo-373290.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        alt: 'Traditional Korean palace',
      },
      {
        id: 3,
        name: 'Street Food',
        src: 'https://images.pexels.com/photos/2105237/pexels-photo-2105237.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        alt: 'Korean street food',
      },
      {
        id: 4,
        name: 'Cherry Blossoms',
        src: 'https://images.pexels.com/photos/2070033/pexels-photo-2070033.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        alt: 'Cherry blossoms in South Korea',
      },
    ],
    details: [
      {
        name: 'Inclusions',
        items: [
          '4 Nights room accommodation based on twin sharing at a choice hotel.',
          'Daily hotel breakfast.',
          'Private coach with an English speaking tour guide.',
          'Sightseeing tours as specified above include the first way entrance fee needed.',
          'Meal as listed.',
          'Roundtrip airfare via Cebu Pacific (7kg. Hand Carry only).',
          '144 Group visa.',
        ],
      },
      {
        name: 'Exclusions',
        items: [
          'Expenses of a personal nature like telephone calls, mini bar, etc.',
          'Extra baggage allowance.',
          'PH Travel Tax.',
          'Optional Tour.',
          'Tips for driver and guide: USD25/pax',
          'Single supplement: USD99/pax',
          'Covid-19 test if needed.',
        ],
      },
      {
        name: 'Optional package: USD 100/pax',
        items: [
          'HZM Bridge Luxury Cruise Tour + Jingshan Park + Cable Car + BBQ Dinner.',
        ],
      },
    ],
    itinerary: [
      {
        day: '1 ETA',
        title: 'Arrive in Macau',
        activities: [
          'Meet the Macau guide at the airport.',
          'Transfer to Macau-Zhuhai Port (queued yourself to pass the border).',
          'Entry to Zhuhai and meet the Guangdong guide.',
          'Transfer to hotel and check in.',
        ],
        image:
          'https://images.pexels.com/photos/730778/pexels-photo-730778.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        day: '2',
        title: '',
        activities: [
          'Check out and transfer to Guangzhou.',
          'Explore Bukchon Hanok Village',
          'Take Zuiguanguang Tram',
          'Visit Haixinsha Asian Games Park (tram tour).',
          'Visit Canton Tower (outside view).',
          'Visit Haixin Bridge.',
          'Visit Huacheng Square.',
          'Transfer to Hotel and Check in.',
          'Special Complementary Romantic Show of Guangdong: ‘Eternal Show’',
        ],
        image:
          'https://images.pexels.com/photos/1677358/pexels-photo-1677358.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        day: '3',
        title: '',
        activities: [
          'Hotel Breakfast.',
          'Check out and Transfer to Zhongshan.',
          'Visit Sun Yat-sen’s Former Residence.',
          'Visit Latex Shop.',
          'Visit Zhuhai Fisher Girl, Lovers Road.',
          'Visit Haitian Posthouse Landscape Trestle Road.',
          'Transfer to hotel and check in.',
        ],
        image:
          'https://images.pexels.com/photos/18137607/pexels-photo-18137607/free-photo-of-zhongshan-studio-city-in-china.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        day: '4',
        title: '',
        activities: [
          'Hotel Breakfast.',
          'Visit Zhuhai Grand Theater.',
          'Look far Hong Kong-Zhuhai-Macau Bridge.',
          'Visit a Chinese Medicine Shop.',
          'Visit New Yuan Ming Palace.',
          'Visit the Silk Store.',
          'Visit Huangyucheng Shopping Mall.',
          'Back to the hotel.',
        ],
        image:
          'https://images.pexels.com/photos/20599712/pexels-photo-20599712/free-photo-of-zhuhai-opera-on-sea-coast.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        day: '5 ETD',
        title: '',
        activities: [
          'Hotel Breakfast.',
          'Check out',
          'Visit the Jewelry Store.',
          'Transfer to the border and entry to Macau.',
          'Visit the Venetian Macau.',
          'Lunch: Lisboeta Macau Meal Voucher.',
          'Enjoy the Diamond Light Show.',
          'Visit Macau Parisian Tower (outside view).',
          'Visit Ruin of St.Paul’s Macau Souvenir Shop.',
          'Visit Wynn Palace, Performance Lake+ Water Dance Show.',
          'Transfer to the airport and fly back home.',
        ],
        image:
          'https://images.pexels.com/photos/4369493/pexels-photo-4369493.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
    ],
  },
  japan: {
    name: 'Japan',
    price: 20000,
    rating: 5,
    description:
      'Discover the perfect blend of tradition and modernity in Japan. From ancient temples to futuristic cities, immerse yourself in a unique cultural experience.',
    longDescription:
      '<p class="text-lg leading-relaxed mb-4">Discover the perfect blend of <span class="font-semibold text-red-600">tradition and modernity</span> in Japan. From ancient temples to futuristic cities, immerse yourself in a <span class="italic">unique cultural experience</span>.</p><p class="text-lg leading-relaxed">Explore <span class="underline">iconic landmarks</span> and savor <span class="text-green-600">exquisite Japanese cuisine</span>.</p>',
    bestTimeToVisit: 'March - May and September - November',
    listingDescription:
      ' <div class="text-lg font-bold">Tour Dates Available:</div> <div class="text-normal"> Sept. 12-16</div> <div class="text-normal"> Sept. 19-23</div>',
    daysOfStay: '7 Days',
    minimumGuests: 'No Minimum Guests',
    heroImage:
      'https://images.pexels.com/photos/2676642/pexels-photo-2676642.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    images: [
      {
        id: 1,
        name: 'Mount Fuji',
        src: 'https://images.pexels.com/photos/3408354/pexels-photo-3408354.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        alt: 'Mount Fuji with cherry blossoms',
      },
      {
        id: 2,
        name: 'Tokyo Tower',
        src: 'https://images.pexels.com/photos/2614818/pexels-photo-2614818.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        alt: 'Tokyo Tower at night',
      },
      {
        id: 3,
        name: 'Fushimi Inari Shrine',
        src: 'https://images.pexels.com/photos/1440476/pexels-photo-1440476.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        alt: 'Fushimi Inari Shrine in Kyoto',
      },
      {
        id: 4,
        name: 'Japanese Garden',
        src: 'https://images.pexels.com/photos/1198817/pexels-photo-1198817.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        alt: 'Traditional Japanese garden',
      },
    ],
    details: [
      {
        name: 'Inclusions',
        items: [
          'Hotel accommodation (3-star or 4-star options)',
          'Daily breakfast and 2 traditional dinners',
          'Japan Rail Pass (7-day ordinary)',
          'Guided tours in Tokyo and Kyoto',
          'Airport transfers',
        ],
      },
      {
        name: 'Exclusions',
        items: [
          'International flights',
          'Travel insurance',
          'Personal expenses',
          'Optional activities not mentioned in the itinerary',
        ],
      },
      {
        name: 'Itinerary Highlights',
        items: [
          'Day 1-3: Tokyo (Sensoji Temple, Meiji Shrine, Shibuya Crossing)',
          'Day 4-5: Kyoto (Golden Pavilion, Arashiyama Bamboo Grove)',
          'Day 6: Day trip to Nara',
          'Day 7: Departure from Osaka',
        ],
      },
    ],
    itinerary: [
      {
        day: '1',
        title: 'Arrival in Seoul',
        activities: [
          'Arrive at Incheon International Airport',
          'Transfer to hotel in Seoul',
          'Welcome dinner at a local Korean BBQ restaurant',
          'Evening walk in Myeongdong shopping district',
        ],
        image:
          'https://images.pexels.com/photos/237211/pexels-photo-237211.jpeg',
      },
      {
        day: '2',
        title: 'Seoul City Tour',
        activities: [
          'Visit Gyeongbokgung Palace',
          'Explore Bukchon Hanok Village',
          'Lunch at a traditional Korean restaurant',
          'Afternoon at N Seoul Tower',
          'Evening cruise on Han River',
        ],
        image:
          'https://images.pexels.com/photos/373290/pexels-photo-373290.jpeg',
      },
      {
        day: '3',
        title: 'K-pop and Modern Culture',
        activities: [
          'Visit to K-pop entertainment company',
          'K-pop dance class',
          'Lunch at a trendy cafe in Gangnam',
          'Shopping in Apgujeong Rodeo Street',
          'Evening K-pop concert (subject to availability)',
        ],
        image:
          'https://images.pexels.com/photos/2105237/pexels-photo-2105237.jpeg',
      },
    ],
  },
  // Add more destinations here
}

export async function generateStaticParams() {
  return Object.keys(dummyData).map((name) => ({
    name: name,
  }))
}

export default function DestinationPage({
  params,
}: {
  params: { name: string }
}) {
  const destinationData = dummyData[params.name as keyof typeof dummyData]

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
        {/* <Image
          src={destinationData.heroImage}
          alt={`Hero image of ${destinationData.name}`}
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        /> */}
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
        <Suspense fallback={<div>Loading...</div>}>
          <ProductDetails
            product={{
              ...destinationData,
              imageSrc: destinationData.heroImage, // Add this line
            }}
          />{' '}
        </Suspense>
      </div>
    </>
  )
}
